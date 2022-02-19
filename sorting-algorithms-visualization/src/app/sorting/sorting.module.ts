import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { materialModules } from './material';
import { SortingRoutingModule } from './sorting-routing.module';
import { SortingPageComponent } from './components/sorting-page/sorting-page.component';
import { ImageSortingStatusPipe } from './pipes/image-sorting-status.pipe';


@NgModule({
  declarations: [
    ...components,
    SortingPageComponent,
    ImageSortingStatusPipe,
  ],
  imports: [
    CommonModule,
    ...materialModules,
    SortingRoutingModule
  ]
})
export class SortingModule { }
