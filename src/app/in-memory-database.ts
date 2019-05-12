import { InMemoryDbService } from "angular-in-memory-web-api";

//Classe responsável por representar uma simulacao de requisicoes api

export class InMemoryDatabase implements InMemoryDbService{

    createDb(){

        const times = [
            { id: 1, nome: "AMS Noreste", descricao: "Time responsavel pelo atendimento do CTF"},
            { id: 2, nome: "AMS WMB", descricao: "Time pelo atendimento de chamados de CD,Loja,Compprice,CDVP,Comissões"},
            { id: 3, nome: "AMS Sul", descricao: "Time responsavel pelo atendimento do SGA,BDN,Vendas online e etc"},
            { id: 4, nome: "1.5 Sudeste", descricao: "Time responsavel pelo atendimento de lojas,PDVs,instalações e verificação de usuários"},
            { id: 5, nome: "1.5 Sul", descricao: "Time responsavel pelo de lojas do ambiente Sul(Maxxi)"},
            { id: 6, nome: "Escalonamento", descricao: "Time responsavel pela priorização de atendimento e abertua de crises"},
            { id: 7, nome: "Produção Monitoramento", descricao: "Time responsavel pela execução de jobs monitoramento do ambiente"},
        ];

        return { times }
    }
}
