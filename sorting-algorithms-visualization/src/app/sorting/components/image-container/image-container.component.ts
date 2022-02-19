import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageContainerComponent implements OnInit {
  @Input() public imageSlicesUrls: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
