import { ReplaySubject } from 'rxjs';
import { ArrayHelper } from './../../../core/helpers/array.helper';
import { SortService } from './../../services/sort.service';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { SortingStatusService } from 'src/app/core/services/sorting-status.service';
import { ImageSortingStatus } from 'src/app/core/enums/image-sorting-status';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sorting-page',
  templateUrl: './sorting-page.component.html',
  styleUrls: ['./sorting-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortingPageComponent implements OnInit, OnDestroy {
  public patternImageSlicesUrls: string[];
  public mixedUpImageSlicesUrls: string[];

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private sortService: SortService,
              private sortingStatusService: SortingStatusService) { }

  public ngOnInit(): void {
    this.setPatternImageSlicesUrls();
    this.mixedUpImageSlicesUrls = [...this.patternImageSlicesUrls];

    this.sortingStatusService.sortingStatus()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((status) => {
      if (status === ImageSortingStatus.SHUFFLING) {
        this.mixedUpImageSlicesUrls = ArrayHelper.shuffle(ArrayHelper.clone(this.patternImageSlicesUrls));
        this.sortingStatusService.shuffled();
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private setPatternImageSlicesUrls(): void {
    this.patternImageSlicesUrls = [];
    for (let row = 1; row <= SortService.ROW_COUNT; row++) {
      for (let column = 1; column <= SortService.COLUMN_COUNT; column++) {
        this.patternImageSlicesUrls.push(`../../../../assets/images/row-${row}-column-${column}.webp`);
      }
    }
  }
}
