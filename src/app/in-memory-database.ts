import { Usuario } from './pages/usuarios/shared/usuario.model';
import { Ferias } from './pages/ferias/shared/ferias.model';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Time } from "./pages/times/shared/time.model";

//Classe responsável por representar uma simulacao de requisicoes api
export class InMemoryDatabase implements InMemoryDbService{

    createDb(){

        const times: Time[] = [
            { id: 1, nome: "AMS Noreste", descricao: "Time responsavel pelo atendimento do CTF"},
            { id: 2, nome: "AMS WMB", descricao: "Time pelo atendimento de chamados de CD,Loja,Compprice,CDVP,Comissões"},
            { id: 3, nome: "AMS Sul", descricao: "Time responsavel pelo atendimento do SGA,BDN,Vendas online e etc"},
            { id: 4, nome: "1.5 Sudeste", descricao: "Time responsavel pelo atendimento de lojas,PDVs,instalações e verificação de usuários"},
            { id: 5, nome: "1.5 Sul", descricao: "Time responsavel pelo de lojas do ambiente Sul(Maxxi)"},
            { id: 6, nome: "Escalonamento", descricao: "Time responsavel pela priorização de atendimento e abertua de crises"},
            { id: 7, nome: "Produção Monitoramento", descricao: "Time responsavel pela execução de jobs monitoramento do ambiente"},
        ];

        const ferias: Ferias[] = [
            {id: 1, colaborador: "Kelen Janner", comentario: "Alinhado com a liderança",dataInicio: "04/11/2019",dataFim: "18/11/2019", timeId: times[0].id,time: times[0],concluida: false}  as Ferias,
            {id: 2, colaborador: "Abner Rodrigues", comentario: "Alinhado com a liderança",dataInicio: "02/01/2019",dataFim: "04/01/2019", timeId: times[0].id,time: times[0],concluida: true}  as Ferias
        ];

        const usuarios: Usuario[] = [
            {id: 1, login: "jvasco4", nome: "Juliherms Vasconcelos", dataCadastro: "01/01/2019", administrador: "ADM", colaborador: null, papel: null,time: times[0], timeId: times[0].id , senha: "1234",confirmacaoSenha:"1234"} as Usuario,
            {id: 2, login: "msanta2", nome: "Manoel Santana", dataCadastro: "01/01/2019", administrador: "ADM", colaborador: null, papel: null,time: times[0], timeId: times[0].id, senha: "1234",confirmacaoSenha:"1234"  } as Usuario
        ];
   
        return {times,ferias,usuarios}
    }
}
