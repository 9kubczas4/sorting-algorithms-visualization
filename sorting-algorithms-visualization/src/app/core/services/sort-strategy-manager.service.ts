import { QuickSortService } from './sort-algorithms/quick-sort.service';
import { InsertSortService } from './sort-algorithms/insert-sort.service';
import { SortType } from './../enums/sort-type';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SortIterationResult } from '../interfaces/sort-iteration-result';
import { Sortable } from '../interfaces/sortable';
import { SortStrategy } from './../interfaces/sort-strategy';

@Injectable({
  providedIn: 'root'
})
export class SortStrategyManagerService {
  private sortingAlgorithmsDictionary: { [sortStrategy: string]: SortStrategy} = {
    [SortType.InsertSort]: new InsertSortService(),
    [SortType.QuickSort]: new QuickSortService()
  };

  public sort<T extends Sortable<T>>(collection: T[], sortStrategy: SortType): Observable<SortIterationResult<T>> {
    return this.sortingAlgorithmsDictionary[sortStrategy].sort(collection);
  }
}
