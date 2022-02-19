import { ImageSortingStatus } from './../enums/image-sorting-status';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortingStatusService {
  private sortingStatus$: BehaviorSubject<ImageSortingStatus> = new BehaviorSubject<ImageSortingStatus>(ImageSortingStatus.SORTED);

  public sortingStatus(): Observable<ImageSortingStatus> {
    return this.sortingStatus$.asObservable();
  }

  public shuffle(): void {
    this.sortingStatus$.next(ImageSortingStatus.SHUFFLING);
  }

  public shuffled(): void {
    this.sortingStatus$.next(ImageSortingStatus.SHUFFLED);
  }

  public sort(): void {
    this.sortingStatus$.next(ImageSortingStatus.SORTING_IN_PROGRESS);
  }

  public sorted(): void {
    this.sortingStatus$.next(ImageSortingStatus.SORTED);
  }

  public cancelled(): void {
    this.sortingStatus$.next(ImageSortingStatus.CANCELLED);
  }
}
