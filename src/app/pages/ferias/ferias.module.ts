import { SharedModule } from './../../shared/shared.module';
import { FeriasFormComponent } from './ferias-form/ferias-form.component';
import { FeriasListComponent } from './ferias-list/ferias-list.component';
import { NgModule } from '@angular/core';
import { FeriasRoutingModule } from './ferias-routing.module';
import { CalendarModule } from "primeng/calendar"; // componente de calendario
import { IMaskModule } from "angular-imask"; // componente de mascara

@NgModule({
  declarations: [FeriasListComponent,FeriasFormComponent], //componentes utilizados pelo modulo 
  imports: [
    SharedModule,
    FeriasRoutingModule,
    CalendarModule,
    IMaskModule
  ]
})
export class FeriasModule { }
