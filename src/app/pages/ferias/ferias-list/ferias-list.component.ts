import { Ferias } from './../shared/ferias.model';
import { FeriasService } from './../shared/ferias.service';
import { Component } from '@angular/core';
import { BaseResourceListComponent } from "../../../shared/components/base-resource-list/base-resource-list.component";


@Component({
  selector: 'app-ferias-list',
  templateUrl: './ferias-list.component.html',
  styleUrls: ['./ferias-list.component.css']
})
export class FeriasListComponent extends BaseResourceListComponent<Ferias> {
  //passa como parametro o servico de ferias para a listagem
  constructor(private feriasService: FeriasService) {
    super(feriasService);
  }
}
