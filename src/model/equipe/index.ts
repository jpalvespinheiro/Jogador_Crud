import { TEquipe } from "../../types/equipe";
import db from "../../database";
import { RetornoDefault } from "../../types/retorno";

export class EquipeModel {
  public async create(nome: string): Promise<TEquipe | RetornoDefault> {
    try {
      const retorno = await db.query<TEquipe>(
        "INSERT INTO equipes (nome) VALUES ($1) RETURNING *",
        [nome]
      );
      return retorno.rows[0];
    } catch (er) {
      console.log((er as Error).message);
      return { success: false, message: (er as Error).message };
    }
  }

  public async update(id: number, nome: string) {
    try {
      const retorno = await db.query<TEquipe>(
        "UPDATE equipes SET nome = $1 WHERE id = $2 RETURNING *",
        [nome, id]
      );
      return retorno.rows[0];
    } catch (er) {
      console.log((er as Error).message);
      return { success: false, message: (er as Error).message };
    }

  }

  public async delete(id: number) {
    try {
      const retorno = await db.query<TEquipe>(
        "DELETE FROM equipes WHERE id = $1 RETURNING*",
        [id]
      );
      return retorno.rows[0];
    } catch (er) {
      console.log((er as Error).message);
      return { success: false, message: (er as Error).message };
      
    }
    }

  public async ExistByEquipe(nome: string) {
    try {
      const retorno = await db.query<TEquipe>(
        "select * from equipes e where lower(nome) = lower($1)",
        [nome]
      );
      return retorno?.rows[0] ? true : false; // se existe retorno do sql, retorna true (existe time), senão retorna false (não existe)
    } catch (er) {
      console.log((er as Error).message);
      return undefined;
    }
  }
}
