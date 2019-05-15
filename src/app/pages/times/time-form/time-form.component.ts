import { TimeService } from './../shared/time.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from "@angular/forms";
import { ActivatedRoute,Router } from "@angular/router";
import { Time } from "../shared/time.model";
import { switchMap } from "rxjs/operators";
import toastr from "toastr";

@Component({
  selector: 'app-time-form',
  templateUrl: './time-form.component.html',
  styleUrls: ['./time-form.component.css']
})
export class TimeFormComponent implements OnInit,AfterContentChecked {

  currentAction: string;
  TimeForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  time: Time = new Time();

  constructor(
    private timeService: TimeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder      
  ) { }

  //metodo invocado na abertura da tela
  ngOnInit() {
    //verifica a acao atual no form
    this.setCurrentAction();
    //cria o formulario
    this.buildTimeForm();
    //carrega o time caso seja edição
    this.loadTime();
  }

  //metodo invocato apos a criacao dos componentes
  ngAfterContentChecked(){
    //atribui o titulo da pagina de forma dinamica
    this.setPageTitle();
  }

  // METODOS PRIVADOS
  private setCurrentAction(){
    console.log(this.route.snapshot.url[0].path)
    if(this.route.snapshot.url[0].path == "novo"){
      this.currentAction = "novo";
    }else{
      this.currentAction = "editar";
    }
  }

  private buildTimeForm(){
    this.TimeForm = this.formBuilder.group({
      id:[null],
      nome: [null,Validators.required,Validators.minLength(3)],
      descricao: [null]
    })
  }

  private loadTime(){
    if(this.currentAction == "editar"){
      this.route.paramMap.pipe(
        switchMap(params => this.timeService.getById(+params.get("id")))
      ).subscribe(
        (time) => {
          this.time = time;
          this.TimeForm.patchValue(time); // faz o bind de time para o formulario.
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    }
  }

  private setPageTitle(){
    if(this.currentAction == "novo"){
      this.pageTitle = "Cadastro de Novo Time";
    }else{
      const nomeTime = this.time.nome || ""
      this.pageTitle = "Editando time:" + nomeTime;
    }
  }

}
