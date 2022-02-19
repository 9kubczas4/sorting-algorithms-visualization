import { Sortable } from 'src/app/core/interfaces/sortable';

export class ImageSlice implements Sortable<ImageSlice> {
  constructor(public url: string, public index: number) {}

  public isEqual(item: ImageSlice): boolean {
    return this.index === item.index;
  }

  public isGreaterThan(item: ImageSlice): boolean {
    return this.index > item.index;
  }

  public isLesserThan(item: ImageSlice): boolean {
    return this.index < item.index;
  }
}
