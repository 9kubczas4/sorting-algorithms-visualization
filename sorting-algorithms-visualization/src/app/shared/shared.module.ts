import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from './material';
import { components } from './components';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    ...materialModules,
    RouterModule
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }
