import { BaseResourceModel } from "../../../shared/models/base-resource.model";
//Representa uma classe de time
export class Time extends BaseResourceModel {
    constructor(
        public id? :number,
        public nome? :string,
        public descricao? :string
    ){
        super();//indica que esta chamando o construtor 
    }
}