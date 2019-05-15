import { FeriasListComponent } from './ferias-list/ferias-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeriasRoutingModule } from './ferias-routing.module';

@NgModule({
  declarations: [FeriasListComponent],
  imports: [
    CommonModule,
    FeriasRoutingModule
  ]
})
export class FeriasModule { }
