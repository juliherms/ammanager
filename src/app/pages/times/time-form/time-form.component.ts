import { TimeService } from './../shared/time.service';
import { BaseResourceFormComponent } from "../../../shared/components/base-resource-form/base-resource-form.component";
import { Component, Injector } from '@angular/core';
import { Validators } from "@angular/forms";
import { Time } from "../shared/time.model";

//classe responsavel por representar um formulario de time
@Component({
  selector: 'app-time-form',
  templateUrl: './time-form.component.html',
  styleUrls: ['./time-form.component.css']
})
export class TimeFormComponent extends BaseResourceFormComponent<Time> {

  constructor(protected timeService: TimeService,protected injector: Injector) {
    super(injector,new Time(),timeService,Time.fromJson);
   }

   //cria o formulario de time customizado
  protected buildResourceForm(){

    this.resourceForm = this.formBuilder.group({
      id:[null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      descricao: [null]
    });
  }

  protected creationPageTitle(): string {
    return "Cadastro de Novo Time";
  }

  protected editionPageTitle(): string {
    const nomeTime = this.resource.nome || "";
    return "Editando Time: " + nomeTime;
  }
}
