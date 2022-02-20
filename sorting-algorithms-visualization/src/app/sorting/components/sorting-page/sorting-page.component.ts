import { SortResult } from './../../interfaces/sort-result';
import { ImageSlice } from './../../models/image-slice';
import { ReplaySubject } from 'rxjs';
import { ArrayHelper } from './../../../core/helpers/array.helper';
import { SortService } from './../../services/sort.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SortingStatusService } from 'src/app/core/services/sorting-status.service';
import { ImageSortingStatus } from 'src/app/core/enums/image-sorting-status';
import { takeUntil } from 'rxjs/operators';
import { SortType } from 'src/app/core/enums/sort-type';

@Component({
  selector: 'app-sorting-page',
  templateUrl: './sorting-page.component.html',
  styleUrls: ['./sorting-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortingPageComponent implements OnInit, OnDestroy {
  public patternImageSlicesUrls: ImageSlice[];
  public mixedUpImageSlicesUrls: ImageSlice[];

  public SortType = SortType;

  private algorithmsSortStatus: { [strategy: string]: boolean } = {
    [SortType.InsertSort]: false,
    [SortType.QuickSort]: false
  };

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private sortingStatusService: SortingStatusService,
              private changeDetectionRef: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.setPatternImageSlicesUrls();
    this.mixedUpImageSlicesUrls = [...this.patternImageSlicesUrls];
    this.changeDetectionRef.detectChanges();

    this.sortingStatusService.sortingStatus()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((status) => {
      if (status === ImageSortingStatus.SHUFFLING) {
        Object.keys(this.algorithmsSortStatus).forEach((algorithm) => {
          this.algorithmsSortStatus[algorithm] = false;
        });
        this.mixedUpImageSlicesUrls = ArrayHelper.shuffle(ArrayHelper.clone(this.patternImageSlicesUrls));
        this.sortingStatusService.shuffled();
        this.changeDetectionRef.detectChanges();
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public sorted($event: SortResult): void {
    this.algorithmsSortStatus[$event.strategy] = $event.sorted;

    if (Object.values(this.algorithmsSortStatus).every(status => status)) {
      this.sortingStatusService.sorted();
    }
  }

  private setPatternImageSlicesUrls(): void {
    this.patternImageSlicesUrls = [];
    for (let row = 1; row <= SortService.ROW_COUNT; row++) {
      for (let column = 1; column <= SortService.COLUMN_COUNT; column++) {
        this.patternImageSlicesUrls.push(new ImageSlice(`../../../../assets/images/row-${row}-column-${column}.webp`,
          (row - 1) * SortService.COLUMN_COUNT + column));
      }
    }
  }
}
