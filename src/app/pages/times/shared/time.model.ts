import { BaseResourceModel } from "../../../shared/models/base-resource.model";
//Representa uma classe de time
export class Time extends BaseResourceModel {

    constructor(
        public id? :number,
        public nome? :string,
        public descricao? :string
    ){
        super();//indica que esta chamando o construtor da classe estendida
    }

    //converte json em objeto
    static fromJson(jsonData: any): Time {
        return Object.assign(new Time(),jsonData);
    }
}