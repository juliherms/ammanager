import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeListComponent } from './time-list/time-list.component';
import { TimeFormComponent } from './time-form/time-form.component';

//j.a.vasconcelos - 12/05/2019 - rotas de manutenção de time

//rotas de time
const routes: Routes = [
  { path: '', component: TimeListComponent}, // lista os times
  { path: 'novo', component: TimeFormComponent }, // cadastra o time
  { path: ':id/editar', component: TimeFormComponent } // edita o time
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesRoutingModule { }
