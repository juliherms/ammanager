import { Injectable, Injector } from '@angular/core';
import { Time } from "./time.model";
import { BaseResourceService } from "../../../shared/services/base-resource.service";

//Representa a classe de servicos de times
@Injectable({
  providedIn: 'root'
})
//Classe responsavel pelos servicos de time
export class TimeService extends BaseResourceService<Time> {

  constructor(protected injector: Injector) {
    //pass a url do resource e o injector que funciona como um contexto
    super("api/times",injector,Time.fromJson);
  }
}
