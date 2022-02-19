import { SortingStatusService } from 'src/app/core/services/sorting-status.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ImageSortingStatus } from 'src/app/core/enums/image-sorting-status';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public ImageSortingStatus = ImageSortingStatus;

  constructor(public sortingStatusService: SortingStatusService) { }

  ngOnInit(): void {
  }

}
