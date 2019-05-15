import { FeriasFormComponent } from './ferias-form/ferias-form.component';
import { FeriasListComponent } from './ferias-list/ferias-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',component:FeriasListComponent},
  { path: 'novo', component:FeriasFormComponent},
  { path: ':id/editar', component:FeriasFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeriasRoutingModule { }
