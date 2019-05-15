import { Time } from '../../times/shared/time.model';

export class Ferias{

    constructor(
        public id?: number,
        public colaborador?: string,
        public comentario?: string,
        public dataInicio?: string,
        public dataFim?: string,
        public timeId?: number,
        public time?: Time,
        public concluida?: boolean
    ){}

    get concluidaText(): string {
        return this.concluida ? "Já Realizada" : "Pendente";
    }
}