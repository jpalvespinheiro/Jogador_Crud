import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { JogadorDTO, TJogador } from "../../types/jogador";
import { JogadorModel } from "../../model/jogador";
import { RetornoDefault } from "../../types/retorno";

export class JogadorController {
  public async create(jogador: JogadorDTO) {
    const jogadorModel = new JogadorModel();

    if (await jogadorModel.existByCpf(jogador.cpf)) {
      return { success: false, message: "o jogador já existe" };
    }

    const valid = await this.isValid(jogador, jogadorModel);

    if (valid.success) {
      return await jogadorModel.create(jogador);
    } else {
      return valid;
    }
  }

  public async update(jogador: TJogador) {
    const jogadorModel = new JogadorModel();

    if (!jogador.id) {
      return {
        success: false,
        message: "para fazer update, o id é obrigatório.",
      };
    }

    const valid = await this.isValid(jogador, jogadorModel);

    if (valid.success) {
      return await jogadorModel.update(jogador);
    } else {
      return valid;
    }
  }

  private async isValid(jogador: JogadorDTO, jogadorModel: JogadorModel) {
    if (!cpfValidator.isValid(jogador.cpf)) {
      return { success: false, message: "cpf inválido" };
    }

    if (jogador.nome === "" || jogador.nome === undefined) {
      return { success: false, message: "o nome deve ser informado" };
    }

    if (jogador.idade < 16) {
      return {
        success: false,
        message: "o jogador não pode ser menor de 16 anos",
      };
    }

    if (jogador.salario < 1000) {
      return {
        success: false,
        message: "Salário incompatível para o cadastro",
      };
    }

    if (!(await jogadorModel.existByPosicao(jogador.posicao))) {
      return {
        success: false,
        message: "posição informada não existe em nosso casdastro",
      };
    }

    return { success: true, message: "" };
  }
}
