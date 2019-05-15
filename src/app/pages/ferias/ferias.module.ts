import { ReactiveFormsModule } from '@angular/forms';
import { FeriasFormComponent } from './ferias-form/ferias-form.component';
import { FeriasListComponent } from './ferias-list/ferias-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeriasRoutingModule } from './ferias-routing.module';

@NgModule({
  declarations: [FeriasListComponent,FeriasFormComponent], //componentes utilizados pelo modulo 
  imports: [
    CommonModule,
    FeriasRoutingModule,
    ReactiveFormsModule
  ]
})
export class FeriasModule { }
