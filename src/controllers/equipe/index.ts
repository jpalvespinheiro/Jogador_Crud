import { TEquipe } from "../../types/equipe";
import { EquipeModel } from "../../model/equipe";
import { RetornoDefault } from "../../types/retorno";

export class EquipeController {
  public async create(nome: string): Promise<TEquipe | RetornoDefault> {
    const equipeModel = new EquipeModel();

    if (nome === "" || nome === undefined) {
      return { success: false, message: "o nome deve  ser informado" };
    }

    if (await equipeModel.ExistByEquipe(nome)) {
      return { success: false, message: "esta equipe já existe" };
    }

    return equipeModel.create(nome);
  }

  public async update(id: number, nome: string) {
    const equipeModel = new EquipeModel();

    if (!id) {
      return {
        success: false,
        message: "para fazer update, o id é obrigatório.",
      };
    }

    if (nome === "" || nome === undefined) {
      return { success: false, message: "o nome deve  ser informado" };
    }

    return await equipeModel.update(id, nome);
  }

  public async delete(id: number) {
    const equipeModel = new EquipeModel();

    if (!id) {
      return {
        success: false,
        message: "para fazer update, o id é obrigatório.",
      };
    }

    return await equipeModel.delete(id);
  }
}
