import { TimeService } from './../../times/shared/time.service';
import { Time } from './../../times/shared/time.model';
import { Ferias } from './../shared/ferias.model';
import { FeriasService } from './../shared/ferias.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from "@angular/forms";
import { ActivatedRoute,Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import toastr from "toastr";


@Component({
  selector: 'app-ferias-form',
  templateUrl: './ferias-form.component.html',
  styleUrls: ['./ferias-form.component.css']
})
export class FeriasFormComponent implements OnInit,AfterContentChecked {

  currentAction: string;
  feriasForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  ferias: Ferias = new Ferias();
  times: Array<Time>;//necessairo para fazer o select

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
    private feriasService: FeriasService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private timeService: TimeService      
  ) { }

  //metodo invocado na abertura da tela
  ngOnInit() {
    //verifica a acao atual no form
    this.setCurrentAction();
    //cria o formulario
    this.buildFeriasForm();
    //carrega o time caso seja edição
    this.loadFerias();
    //carrega os times disponiveis
    this.loadTimes();
  }

  //metodo invocato apos a criacao dos componentes
  ngAfterContentChecked(){
    //atribui o titulo da pagina de forma dinamica
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;
    if(this.currentAction == "novo"){
      this.createFerias();
    }else{
      this.updateFerias();
    }
  }

  // METODOS PRIVADOS
  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == "novo"){
      this.currentAction = "novo";
    }else{
      this.currentAction = "editar";
    }
  }

  private loadTimes(){
    this.timeService.getAll().subscribe(
      times => this.times = times
    );
  }

  private buildFeriasForm(){
    this.feriasForm = this.formBuilder.group({
      id:[null],
      colaborador: [null, [Validators.required, Validators.minLength(3)]],
      comentario: [null],
      dataInicio: [null,[Validators.required]],
      dataFim: [null,[Validators.required]],
      concluida: [false,[Validators.required]],
      timeId: [null,[Validators.required]]
    })
  }

  private loadFerias(){
    if(this.currentAction == "editar"){
      this.route.paramMap.pipe(
        switchMap(params => this.feriasService.getById(+params.get("id")))
      ).subscribe(
        (ferias) => {
          this.ferias = ferias;
          this.feriasForm.patchValue(ferias); // faz o bind de time para o formulario.
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    }
  }

  private setPageTitle(){
    if(this.currentAction == "novo"){
      this.pageTitle = "Cadastro de Novas férias";
    }else{
      const nomeFerias = this.ferias.colaborador || ""
      this.pageTitle = "Editando as férias de: " + nomeFerias;
    }
  }

  private createFerias(){
    const ferias: Ferias =  Ferias.fromJson(this.feriasForm.value);
    this.feriasService.create(ferias)
    .subscribe(
      time => this.actionsForSuccess(time),
      error => this.actionsForError(error)
    )
  }

  private updateFerias(){
    const ferias: Ferias =  Ferias.fromJson(this.feriasForm.value);
    this.feriasService.update(ferias)
    .subscribe(
      ferias => this.actionsForSuccess(ferias),
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess(ferias: Ferias){
    //exibe uma mensagem na tela
    toastr.success("Solicitação processada com sucesso!");
    //redireciona para a pagina de edicao
    this.router.navigateByUrl("ferias",{skipLocationChange:true}).then(
      () => this.router.navigate(["ferias",ferias.id,"editar"])
    )
  }

  private actionsForError(error){
    toastr.erro("Ocorreu um erro ao processar a sua solicitação!");
    this.submittingForm = false;
    if(error.status === 422){
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde"]
    }
    
  }
}
