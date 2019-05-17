import { InMemoryDatabase } from './../in-memory-database';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
//importacao da classe de mock do servico webapi
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

//Classe responsável por consolidar a importação de modulo obrigatorios para a aplicacao.
@NgModule({
  declarations: [],
  exports: [
    //shared modulos
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, //necessário para ativar o calendário
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)
  ]
})
export class CoreModule { }
