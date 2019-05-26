import { Usuario } from './usuario.model';
import { TimeService } from './../../times/shared/time.service';
import { Injectable,Injector } from '@angular/core';
import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { Observable } from "rxjs";
import { flatMap, catchError } from "rxjs/operators";

//Representa a classe de servicos de ferias
@Injectable({
    providedIn: 'root'
  })
export class UsuarioService extends BaseResourceService<Usuario> {

  constructor(protected injector: Injector,
                private timeService: TimeService)
  {
      //passa a url basica o injetor e a funcao responsavel por converter o objeto
      //no js é possível passar a funcao como parametro
      super("api/usuarios",injector,Usuario.fromJson);
  }

  //cria usuario
  create(usuario: Usuario): Observable<Usuario>{
    return this.setTimeAndSendtoServer(usuario,super.create.bind(this))
  }

  //Atualiza usuario
  update(usuario: Usuario): Observable<Usuario>{
    return this.setTimeAndSendtoServer(usuario,super.update.bind(this));
  }

  private setTimeAndSendtoServer(usuario: Usuario,sendFn: any): Observable<Usuario>{
    return this.timeService.getById(usuario.timeId).pipe(
      flatMap(time => {
        usuario.time = time;
        //chama o metodo na heranca
        return sendFn(usuario)
      }),
      catchError(this.handleError)
    );
  }
}  