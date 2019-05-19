import { TimeService } from './../../times/shared/time.service';
import { Ferias } from './ferias.model';
import { Injectable,Injector } from '@angular/core';
import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { Observable } from "rxjs";
import { flatMap, catchError } from "rxjs/operators";


//Representa a classe de servicos de ferias
@Injectable({
  providedIn: 'root'
})
export class FeriasService extends BaseResourceService<Ferias> {

  constructor(protected injector: Injector,
              private timeService: TimeService)
  {
    //passa a url basica o injetor e a funcao responsavel por converter o objeto
    //no js é possível passar a funcao como parametro
    super("api/ferias",injector,Ferias.fromJson);
  }

  //cria as ferias
  create(ferias: Ferias): Observable<Ferias>{
    return this.setTimeAndSendtoServer(ferias,super.create.bind(this))
  }

  //Atualiza as ferias
  update(ferias: Ferias): Observable<Ferias>{
    return this.setTimeAndSendtoServer(ferias,super.update.bind(this));
  }

  private setTimeAndSendtoServer(ferias: Ferias,sendFn: any): Observable<Ferias>{
    return this.timeService.getById(ferias.timeId).pipe(
      flatMap(time => {
        ferias.time = time;
        //chama o metodo na heranca
        return sendFn(ferias)
      }),
      catchError(this.handleError)
    );
  }
}
