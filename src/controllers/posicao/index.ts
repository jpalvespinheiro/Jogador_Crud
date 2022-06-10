import { Tposicao } from "../../types/posicao";
import { RetornoDefault } from "../../types/retorno";
import { PosicaoModel } from "../../model/posicao";

export class PosicaoController {
  public async create(nome: string): Promise<Tposicao | RetornoDefault> {
    const posicaoModel = new PosicaoModel();
    if (nome === "" || nome === undefined) {
      return { success: false, message: "o nome deve ser informado" };
    }

    if (!(await posicaoModel.ExistePosicao(nome))) {
      return { success: false, message: "posição já existe" };
    }

    return posicaoModel.create(nome);
  }

  public async update(id: number, nome: string) {
    const posicaoModel = new PosicaoModel();

    if (!id) {
      return {
        success: false,
        message: "para fazer update, o id é obrigatório.",
      };
    }

    if (nome === "" || nome === undefined) {
      return { success: false, message: "o nome deve  ser informado" };
    }

    return await posicaoModel.update(id, nome);
  }
}
