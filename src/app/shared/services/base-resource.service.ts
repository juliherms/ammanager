import { BaseResourceModel } from '../models/base-resource.model';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map,catchError } from "rxjs/operators";
import { Injector, inject } from "@angular/core"; //criei um injetor para passar o http

//Representa uma classe de servicos generica
export abstract class BaseResourceService<T extends BaseResourceModel>{
  
  protected http: HttpClient;

  constructor(protected apiPath: string,
              protected injector: Injector,
              protected jsonDataToResourceFn:(jsonData:any) => T
  ){
    // injetor me dê uma instancia httpClient  
    this.http = injector.get(HttpClient);                 
  }

  
  //Retorna uma lista de todos os recursos
  getAll(): Observable<T[]>{
    return this.http.get(this.apiPath).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
      
    )
  }

  //Recupera um recurso por id informado
  getById(id: number): Observable<T>{
    //monta a url com o id
    const url = `${this.apiPath}/${id}`;
    
    return this.http.get(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
      
    )
  }

  //cria um resource
  create(resource: T): Observable<T>{
    return this.http.post(this.apiPath,resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    )
  }

  //Atualiza um resource
  update(resource: T): Observable<T>{
    const url = `${this.apiPath}/${resource.id}`;

    return this.http.put(url,resource).pipe(
      catchError(this.handleError),
      map(() => resource)//deixar igual ao create
    )
  }

  //Deleta um resource
  delete(id: number): Observable<any>{
    //monta a url com o id
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  //METODOS PROTEGIDOS =========================================================================

  //Converte um json em lista de objetos de resources
  protected jsonDataToResources(jsonData: any[]): T[]{
    const resources: T[] = [];
    //passo a minha function como parametro
    jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));
    return resources;
  }

  //Converte um objeto json para resource
  protected jsonDataToResource(jsonData: any): T{
    //passo a minha function como parametro
    return this.jsonDataToResourceFn(jsonData);
  }

  //Levanta e loga uma mensagem de erro 
  protected handleError(error: any): Observable<any>{
    console.log("ERRO NA REQUISIÇÃO => ", error );
    return throwError(error);
  }
  // ========================================================================================
}