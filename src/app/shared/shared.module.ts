import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';


@NgModule({
  declarations: [
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule// necessario para funcionar o componente breadCrumb
  ],
  exports:[
    //shared modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,//exportacao
    BreadCrumbComponent,//exportacao do componente bread crumb para ser utlizado nas paginas
  ]
})
export class SharedModule { }
