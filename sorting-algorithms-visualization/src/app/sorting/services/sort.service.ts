import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  public static ROW_COUNT = 25;
  public static COLUMN_COUNT = 25;

  constructor() { }
}
