import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { TimesRoutingModule } from './times-routing.module';
import { TimeListComponent } from './time-list/time-list.component';
import { TimeFormComponent } from './time-form/time-form.component';


@NgModule({
  declarations: [TimeListComponent, TimeFormComponent],
  imports: [
    SharedModule,
    TimesRoutingModule
  ]
})
export class TimesModule { }
