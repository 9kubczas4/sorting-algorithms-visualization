import { SortResult } from './../../interfaces/sort-result';
import { concatMap, delay, takeUntil } from 'rxjs/operators';
import { SortStrategyManagerService } from './../../../core/services/sort-strategy-manager.service';
import { SortType } from './../../../core/enums/sort-type';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ImageSlice } from '../../models/image-slice';
import { SortingStatusService } from 'src/app/core/services/sorting-status.service';
import { of, ReplaySubject, Subscription } from 'rxjs';
import { ImageSortingStatus } from 'src/app/core/enums/image-sorting-status';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageContainerComponent implements OnInit, OnDestroy {
  @Output() public sorted: EventEmitter<SortResult> = new EventEmitter<SortResult>(null);
  @Input() public imageSlices: ImageSlice[];
  @Input() public sortStrategy: SortType;

  private readonly DELAY_IN_MILLISECONDS = 10;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private sortingSubscription: Subscription;

  constructor(private sortStrategyManagerService: SortStrategyManagerService,
              private sortingStatusService: SortingStatusService,
              private changeDetectorRef: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.initSubscriptions();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private initSubscriptions(): void {
    if (this.sortStrategy) {
      this.sortingStatusService.sortingStatus()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((status) => {
          if (status === ImageSortingStatus.SORTING_IN_PROGRESS) {
            this.sortingSubscription = this.sortStrategyManagerService.sort([...this.imageSlices], this.sortStrategy)
              .pipe(concatMap(item => of(item).pipe(
                delay(this.DELAY_IN_MILLISECONDS)
              )))
              .subscribe((data) => {
                this.imageSlices = data.collection;
                if (data.sorted) {
                  this.sorted.emit({
                    strategy: this.sortStrategy,
                    sorted: true
                  });
                }
                this.changeDetectorRef.detectChanges();
              });
          } else if (status === ImageSortingStatus.CANCELLED || status === ImageSortingStatus.SORTED) {
            this.sortingSubscription?.unsubscribe();
          }
        });
    }
  }
}
