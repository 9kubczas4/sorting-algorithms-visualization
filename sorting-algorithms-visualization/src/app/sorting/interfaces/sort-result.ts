import { SortType } from 'src/app/core/enums/sort-type';

export interface SortResult {
  strategy: SortType;
  sorted: boolean;
}
