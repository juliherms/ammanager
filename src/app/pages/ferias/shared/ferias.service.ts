import { TimeService } from './../../times/shared/time.service';
import { Ferias } from './ferias.model';
import { Injectable,Injector } from '@angular/core';
import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { Observable } from "rxjs";
import { flatMap } from "rxjs/operators";


//Representa a classe de servicos de ferias
@Injectable({
  providedIn: 'root'
})
export class FeriasService extends BaseResourceService<Ferias> {

  constructor(protected injector: Injector,
              private timeService: TimeService)
  {
    //passa a url basica e o injetor
    super("api/ferias",injector);
  }

  //cria as ferias
  create(ferias: Ferias): Observable<Ferias>{

    return this.timeService.getById(ferias.timeId).pipe(
      flatMap(time => {
        ferias.time = time;
        //chama o metodo na heranca
        return super.create(ferias)
      })
    )
  }

  //Atualiza as ferias
  update(ferias: Ferias): Observable<Ferias>{

    return this.timeService.getById(ferias.timeId).pipe(
      flatMap(time =>{
        ferias.time = time;
        //chama o metodo na heranca
        return super.update(ferias)
      })
    )
  }


  //METODOS PROTEGIDOS =========================================================================

  //Converte um json em lista de objetos de ferias(faz override)
  protected jsonDataToResources(jsonData: any[]): Ferias[]{

    const listaFerias: Ferias[] = [];
    //percorre o array e criar a lista de objetos
    jsonData.forEach(element => {
      const ferias = Object.assign(new Ferias(),element);
      listaFerias.push(ferias);
    });

    return listaFerias;
  }

  //Converte um objeto json para time(faz override)
  protected jsonDataToResource(jsonData: any): Ferias{
    return Object.assign(new Ferias(),jsonData);
  }

  // =========================================================================================
}
