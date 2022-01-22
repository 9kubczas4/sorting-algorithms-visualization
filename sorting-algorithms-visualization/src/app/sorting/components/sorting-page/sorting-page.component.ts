import { ArrayHelper } from './../../../core/helpers/array.helper';
import { SortService } from './../../services/sort.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting-page',
  templateUrl: './sorting-page.component.html',
  styleUrls: ['./sorting-page.component.scss']
})
export class SortingPageComponent implements OnInit {
  public defaultImageSlicesUrls: string[];
  public mixedUpImageSlicesUrls: string[];

  constructor(private sortService: SortService) { }

  public ngOnInit(): void {
    // TODO: SOLID
    this.setUpDefaultImageSlicesUrls();
    this.mixedUpImageSlicesUrls = ArrayHelper.shuffle(ArrayHelper.clone(this.defaultImageSlicesUrls));
  }

  private setUpDefaultImageSlicesUrls(): void {
    this.defaultImageSlicesUrls = [];
    for (let row = 1; row <= SortService.ROW_COUNT; row++) {
      for (let column = 1; column <= SortService.COLUMN_COUNT; column++) {
        this.defaultImageSlicesUrls.push(`../../../../assets/images/row-${row}-column-${column}.webp`);
      }
    }
  }
}
