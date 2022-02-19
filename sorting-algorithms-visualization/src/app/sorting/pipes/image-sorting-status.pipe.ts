import { Pipe, PipeTransform } from '@angular/core';
import { ImageSortingStatus } from 'src/app/core/enums/image-sorting-status';

@Pipe({
  name: 'imageSortingStatus'
})
export class ImageSortingStatusPipe implements PipeTransform {

  public transform(value: ImageSortingStatus): string {
    switch (value) {
      case ImageSortingStatus.SORTED: {
        return `sorted`;
      }
      case ImageSortingStatus.SHUFFLING: {
        return `shuffling`;
      }
      case ImageSortingStatus.SHUFFLED: {
        return `shuffled`;
      }
      case ImageSortingStatus.SORTING_IN_PROGRESS: {
        return `sorting`;
      }
      case ImageSortingStatus.CANCELLED: {
        return `cancelled`;
      }
    }
  }

}
