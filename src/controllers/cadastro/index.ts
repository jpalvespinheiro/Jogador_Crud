import { cpf } from "cpf-cnpj-validator";
import { TCadastro } from "../../types/cadastro";
import { CadastroModel } from "../../model/cadastro";

export class cadastroController {
  public async createCadastro(
    time: string,
    posicao: string,
    nome: string,
    apelido: string,
    cpfjogador: string,
    numcamisa: number,
    idade: number,
    salario: number
  ): Promise<TCadastro | undefined> {
    const cadastroModel = new CadastroModel();
    
    if (nome === "" || nome === undefined) {
      return undefined;
    }

   // erro de lógica
    //pensa comigo, se posicao está vazio pq vou buscar no banco? se está vazio já tenho que retornar ele como undefined não tem pq ir consultar
   // outro erro novamente verificando undefined === ""
    //entendeu? agora sim , deixa comentado essa explicação que depois eu anoto 
    if (posicao === "" || undefined === "") { 
      if (await cadastroModel.existePosicao(time, posicao)) return undefined;
    }

    if (apelido === "") {
      return undefined;
    }


    if (cpfjogador === "")
      if (!cpf.isValid(cpfjogador)) {
        return undefined;
      }

    if (await cadastroModel.existeNumCamisa(time, numcamisa)) {
      return undefined;
    }

    if (idade < 16) {
      return undefined;
    }

    if (salario < 1000) {
      return undefined;
    }
    return await cadastroModel.createCadastro(
      time,
      posicao,
      nome,
      apelido,
      cpfjogador,
      numcamisa,
      idade,
      salario
    );
  }
}
