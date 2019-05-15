import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesRoutingModule } from './times-routing.module';
import { TimeListComponent } from './time-list/time-list.component';
import { TimeFormComponent } from './time-form/time-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TimeListComponent, TimeFormComponent],
  imports: [
    CommonModule,
    TimesRoutingModule,
    ReactiveFormsModule
  ]
})
export class TimesModule { }
