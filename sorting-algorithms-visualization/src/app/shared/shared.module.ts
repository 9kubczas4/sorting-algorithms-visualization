import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from './material';
import { components } from './components';



@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }
