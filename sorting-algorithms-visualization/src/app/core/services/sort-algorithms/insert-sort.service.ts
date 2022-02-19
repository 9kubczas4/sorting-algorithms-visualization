import { Observable } from 'rxjs';
import { SortIterationResult } from '../../interfaces/sort-iteration-result';
import { SortStrategy } from '../../interfaces/sort-strategy';
import { Sortable } from '../../interfaces/sortable';

export class InsertSortService implements SortStrategy {
  public sort<T extends Sortable<T>>(collection: T[]): Observable<SortIterationResult<T>> {
    return new Observable<SortIterationResult<T>>((subscriber) => {
      for (let i = 1; i < collection.length; i++) {
        const elementToInsert: T =  collection[i];
        let j = i - 1;
        while (j >= 0 && collection[j].isGreaterThan(elementToInsert)) {
          collection[j + 1] = collection[j];
          j--;
        }
        collection[j + 1] = elementToInsert;
        subscriber.next({ collection: [...collection], sorted: false });
      }
      subscriber.next({ collection, sorted: true});
      subscriber.complete();
    });
  }
}
