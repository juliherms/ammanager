import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { CalendarModule } from "primeng/calendar"; // componente de calendario
import { SharedModule } from './../../shared/shared.module';
import { IMaskModule } from "angular-imask"; // componente de mascara

@NgModule({
  declarations: [UsuarioListComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    CalendarModule,
    UsuariosRoutingModule,
    IMaskModule
  ]
})
export class UsuariosModule { }
