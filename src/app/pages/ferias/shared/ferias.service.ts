import { Time } from './../../times/shared/time.model';
import { TimeService } from './../../times/shared/time.service';
import { Ferias } from './ferias.model';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map,catchError,flatMap } from "rxjs/operators";

//Representa a classe de servicos de times
@Injectable({
  providedIn: 'root'
})
export class FeriasService {

  //mock de requisicao em memoria
  private apiPath: string = "api/ferias";

  constructor(private http: HttpClient,
              private timeService: TimeService) { }

  //Retorna todos os times
  getAll(): Observable<Ferias[]>{
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToFerias)
    )
  }

  //Recupera uma categoria por id informado
  getById(id: number): Observable<Ferias>{
    //monta a url com o id
    const url = `${this.apiPath}/${id}`;
    
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToFeria)
    )
  }

  //cria as ferias
  create(ferias: Ferias): Observable<Ferias>{

    return this.timeService.getById(ferias.timeId).pipe(
      flatMap(time => {
        ferias.time = time;

        return this.http.post(this.apiPath,ferias).pipe(
          catchError(this.handleError),
          map(this.jsonDataToFeria)
        )
      })
    )
  }

  //Atualiza as ferias
  update(ferias: Ferias): Observable<Ferias>{
    const url = `${this.apiPath}/${ferias.id}`;

    return this.timeService.getById(ferias.timeId).pipe(
      flatMap(time =>{
        ferias.time = time;

        return this.http.put(url,ferias).pipe(
          catchError(this.handleError),
          map(() => ferias)
        )
      })
    )
  }

  //Deleta um time
  delete(id: number): Observable<any>{
    //monta a url com o id
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  //METODOS PRIVADOS

  //Converte um json em lista de objetos de ferias
  private jsonDataToFerias(jsonData: any[]): Ferias[]{

    const listaFerias: Ferias[] = [];
    //percorre o array e criar a lista de objetos
    jsonData.forEach(element => {
      const ferias = Object.assign(new Ferias(),element);
      listaFerias.push(ferias);
    });

    return listaFerias;
  }

  //Converte um objeto json para time
  private jsonDataToFeria(jsonData: any): Ferias{
    return Object.assign(new Ferias(),jsonData);
  }

  //Levanta e loga uma mensagem de erro 
  private handleError(error: any): Observable<any>{
    console.log("ERRO NA REQUISIÇÃO => ", error );
    return throwError(error);
  }
}
