import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map,catchError,flatMap } from "rxjs/operators";
import { Time } from "./time.model";

//Representa a classe de servicos de times
@Injectable({
  providedIn: 'root'
})
export class TimeService {

  //mock de requisicao em memoria
  private apiPath: string = "api/times";

  constructor(private http: HttpClient) { }

  //Retorna todos os times
  getAll(): Observable<Time[]>{
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToTimes)
    )
  }

  //Recupera uma categoria por id informado
  getById(id: number): Observable<Time>{
    //monta a url com o id
    const url = `${this.apiPath}/${id}`;
    
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToTime)
    )
  }

  //cria um time
  create(time: Time): Observable<Time>{
    return this.http.post(this.apiPath,time).pipe(
      catchError(this.handleError),
      map(this.jsonDataToTime)
    )
  }

  //Atualiza um time
  update(time: Time): Observable<Time>{
    const url = `${this.apiPath}/${time.id}`;

    return this.http.put(url,time).pipe(
      catchError(this.handleError),
      map(() => time)
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
  private jsonDataToTimes(jsonData: any[]): Time[]{
    const times: Time[] = [];
    jsonData.forEach(element => times.push(element as Time));
    return times;
  }

  //Converte um objeto json para time
  private jsonDataToTime(jsonData: any): Time{
    return jsonData as Time;
  }

  //Levanta e loga uma mensagem de erro 
  private handleError(error: any): Observable<any>{
    console.log("ERRO NA REQUISIÇÃO => ", error );
    return throwError(error);
  }
}
