import { Time } from './../../times/shared/time.model';
import { BaseResourceModel } from "../../../shared/models/base-resource.model";

//Representa uma classe de usuario
export class Usuario extends BaseResourceModel {

    constructor(
        public id? :number,
        public login? :string,
        public nome? :string,
        public dataCadastro? :string,
        public administrador? :string,
        public colaborador? :string,
        public papel? :string,
        public time?: Time,
        public timeId?: number,
        public senha?: string,
        public confirmacaoSenha?: string
    ){
        super();//indica que esta chamando o construtor da classe estendida
    }

    //converte json em objeto
    static fromJson(jsonData: any): Usuario {
        return Object.assign(new Usuario(),jsonData);
    }
}