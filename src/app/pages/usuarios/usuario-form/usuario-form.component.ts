import { UsuarioService } from './../shared/usuario.service';
import { Usuario } from './../shared/usuario.model';
import { TimeService } from './../../times/shared/time.service';
import { Time } from './../../times/shared/time.model';
import { Component,Injector,OnInit } from '@angular/core';
import { Validators } from "@angular/forms";
import { BaseResourceFormComponent } from "../../../shared/components/base-resource-form/base-resource-form.component";


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent extends BaseResourceFormComponent<Usuario> implements OnInit {

  times: Array<Time>;//necessario para fazer o select

  ptBR = {
    firsDayOfWeek: 0,
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
    dayNamesMin: ['Do','Se','Te','Qu','Qu','Se','Sa'],
    monthNames: [
      'Janeiro','Feveiro','Março','Abril','Maio','Junho','Julho',
      'Agosto','Setembro','Outubro','Novembro','Dezembro'
    ],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(
    protected usuarioService: UsuarioService,
    protected timeService: TimeService,
    protected injector: Injector
  ) {
    super(injector,new Usuario(),usuarioService,Usuario.fromJson);
   }

  //metodo invocado na abertura da tela
  ngOnInit() {
    //carrega os times disponiveis
    this.loadTimes();
    super.ngOnInit();
  }

  protected buildResourceForm(){

    this.resourceForm = this.formBuilder.group({
      id:[null],
      login: [null, [Validators.required, Validators.minLength(3)]],
      nome: [null, [Validators.required, Validators.minLength(10)]],
      dataCadastro: [null,[Validators.required]],
      administrador: [null],
      papel: [null],
      timeId: [null,[Validators.required]]
    })
  }

  private loadTimes(){
    this.timeService.getAll().subscribe(
      times => this.times = times
    );
  }

  protected creationPageTitle(): string{
    return "Cadastro de Novo Usuário";
  }

  protected editionPageTitle(): string {
    const nome = this.resource.nome || "";
    return "Editando Usuário: " + nome;
  }


}
