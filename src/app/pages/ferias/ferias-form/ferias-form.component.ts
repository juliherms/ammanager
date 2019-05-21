import { TimeService } from './../../times/shared/time.service';
import { Time } from './../../times/shared/time.model';
import { Ferias } from './../shared/ferias.model';
import { FeriasService } from './../shared/ferias.service';
import { Component,Injector,OnInit } from '@angular/core';
import { Validators } from "@angular/forms";
import { BaseResourceFormComponent } from "../../../shared/components/base-resource-form/base-resource-form.component";

//Representa um formulario de ferias
@Component({
  selector: 'app-ferias-form',
  templateUrl: './ferias-form.component.html',
  styleUrls: ['./ferias-form.component.css']
})
export class FeriasFormComponent extends BaseResourceFormComponent<Ferias> implements OnInit {

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
    protected feriasService: FeriasService,
    protected timeService: TimeService,
    protected injector: Injector
  ) {
    super(injector,new Ferias(),feriasService,Ferias.fromJson);
   }

  //metodo invocado na abertura da tela
  ngOnInit() {
    //carrega os times disponiveis
    this.loadTimes();
    super.ngOnInit();
  }

  private loadTimes(){
    this.timeService.getAll().subscribe(
      times => this.times = times
    );
  }

  protected buildResourceForm(){

    this.resourceForm = this.formBuilder.group({
      id:[null],
      colaborador: [null, [Validators.required, Validators.minLength(3)]],
      comentario: [null],
      dataInicio: [null,[Validators.required]],
      dataFim: [null,[Validators.required]],
      concluida: [false,[Validators.required]],
      timeId: [null,[Validators.required]]
    })
  }

  protected creationPageTitle(): string{
    return "Cadastro de Novas Férias";
  }

  protected editionPageTitle(): string {
    const nomeFerias = this.resource.colaborador || "";
    return "Editando Férias: " + nomeFerias;
  }
}
