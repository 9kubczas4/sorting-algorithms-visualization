import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { materialModules } from './material';
import { SortingRoutingModule } from './sorting-routing.module';
import { SortingPageComponent } from './components/sorting-page/sorting-page.component';


@NgModule({
  declarations: [
    ...components,
    SortingPageComponent,
  ],
  imports: [
    CommonModule,
    ...materialModules,
    SortingRoutingModule
  ]
})
export class SortingModule { }
