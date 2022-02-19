export interface Sortable<T> {
  isEqual(item: T): boolean;
  isGreaterThan(item: T): boolean;
  isLesserThan(item: T): boolean;
}
