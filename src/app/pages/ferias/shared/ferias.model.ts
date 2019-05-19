import { Time } from '../../times/shared/time.model';
import { BaseResourceModel } from "../../../shared/models/base-resource.model";

export class Ferias extends BaseResourceModel {

    constructor(
        public id?: number,
        public colaborador?: string,
        public comentario?: string,
        public dataInicio?: string,
        public dataFim?: string,
        public timeId?: number,
        public time?: Time,
        public concluida?: boolean
    ){
        super();        
    }

    get concluidaText(): string {
        return this.concluida ? "Já Realizada" : "Pendente";
    }

    //converte json em objeto
    static fromJson(jsonData: any): Ferias {
        return Object.assign(new Ferias(),jsonData);
    }
}