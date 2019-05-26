import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//configuração de rotas do sistema
const routes: Routes = [
  //quando acessar /times quero que carregue o modulo de times
  { path: 'times',loadChildren: './pages/times/times.module#TimesModule'},
  { path: 'ferias',loadChildren: './pages/ferias/ferias.module#FeriasModule'},
  { path: 'usuarios', loadChildren: './pages/usuarios/usuarios.module#UsuariosModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
