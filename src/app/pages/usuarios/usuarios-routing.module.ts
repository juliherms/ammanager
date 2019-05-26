import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

//rotas de usuarios
const routes: Routes = [
  { path: '',component:UsuarioListComponent},
  { path: 'novo', component:UsuarioFormComponent},
  { path: ':id/editar', component:UsuarioFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
