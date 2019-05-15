import { Ferias } from './ferias.model';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map,catchError,flatMap } from "rxjs/operators";

//Representa a classe de servicos de times
@Injectable({
  providedIn: 'root'
})
export class TimeService {

  //mock de requisicao em memoria
  private apiPath: string = "api/ferias";

  constructor(private http: HttpClient) { }

  //Retorna todos os times
  getAll(): Observable<Ferias[]>{
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToTimes)
    )
  }

  //Recupera uma categoria por id informado
  getById(id: number): Observable<Ferias>{
    //monta a url com o id
    const url = `${this.apiPath}/${id}`;
    
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToTime)
    )
  }

  //cria um time
  create(ferias: Ferias): Observable<Ferias>{
    return this.http.post(this.apiPath,ferias).pipe(
      catchError(this.handleError),
      map(this.jsonDataToTime)
    )
  }

  //Atualiza um time
  update(ferias: Ferias): Observable<Ferias>{
    const url = `${this.apiPath}/${ferias.id}`;

    return this.http.put(url,ferias).pipe(
      catchError(this.handleError),
      map(() => ferias)
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

  //Converte um json em lista de objetos de time
  private jsonDataToTimes(jsonData: any[]): Ferias[]{
    const times: Ferias[] = [];
    jsonData.forEach(element => times.push(element as Ferias));
    return times;
  }

  //Converte um objeto json para time
  private jsonDataToTime(jsonData: any): Ferias{
    return jsonData as Ferias;
  }

  //Levanta e loga uma mensagem de erro 
  private handleError(error: any): Observable<any>{
    console.log("ERRO NA REQUISIÇÃO => ", error );
    return throwError(error);
  }
}
