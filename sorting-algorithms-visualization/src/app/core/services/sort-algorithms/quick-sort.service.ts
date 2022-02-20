import { Observable, Subscriber } from 'rxjs';
import { SortIterationResult } from '../../interfaces/sort-iteration-result';
import { SortStrategy } from '../../interfaces/sort-strategy';
import { Sortable } from '../../interfaces/sortable';

export class QuickSortService implements SortStrategy {
  public sort<T extends Sortable<T>>(collection: T[]): Observable<SortIterationResult<T>> {
    return new Observable<SortIterationResult<T>>((subscriber) => {
      this.quicksort(collection, 0, collection.length - 1, subscriber);
      subscriber.next({ collection, sorted: true});
    });
  }

  private quicksort<T extends Sortable<T>>(collection: T[], low: number, high: number,
                                           subscriber: Subscriber<SortIterationResult<T>>): void {
    if (low < high) {
      const divideIndex = this.divideCollection(collection, low, high, subscriber);
      this.quicksort(collection, low, divideIndex - 1, subscriber);
      this.quicksort(collection, divideIndex + 1, high, subscriber);
    }
  }

  private divideCollection<T extends Sortable<T>>(collection: T[], low: number, high: number,
                                                  subscriber: Subscriber<SortIterationResult<T>>): number {
    const divideIndex = this.getDivideIndex(low, high);
    const divideValue = collection[divideIndex];
    this.change(collection, divideIndex, high);

    let currentIndex = low;

    for (let i = low; i < high; i++) {
      if (collection[i].isLesserThan(divideValue)) {
        this.change(collection, i, currentIndex);
        currentIndex++;
      }
    }
    this.change(collection, currentIndex, high);
    subscriber.next({
      collection: [...collection],
      sorted: false
    });
    return currentIndex;
  }

  private getDivideIndex(low: number, high: number): number {
    return low + (high - low) % 2;
  }

  private change<T>(collection: T[], index1: number, index2: number): void {
    const temp = collection[index1];
    collection[index1] = collection[index2];
    collection[index2] = temp;
  }
}
