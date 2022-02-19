import { Sortable } from './sortable';
import { SortIterationResult } from './sort-iteration-result';
import { Observable } from 'rxjs';

export interface SortStrategy {
  /**
   * Method will execute one iteration of the sort algorithm. Emit SortIterationResult when iteration will be completed
   * @param collection to sort
   */
  sort<T extends Sortable<T>>(collection: T[]): Observable<SortIterationResult<T>>;
}
