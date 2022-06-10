import db from "../../database";
import { RetornoDefault } from "../../types/retorno";
import { Tposicao } from "../../types/posicao";

export class PosicaoModel {
  public async create(nome: string): Promise<Tposicao | RetornoDefault> {
    try {
      const retorno = await db.query<Tposicao>(
        "INSERT INTO posicao (nome) VALUES ($1) RETURNING *",
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
      const retorno = await db.query<Tposicao>(
        "UPDATE posicao SET nome = $1 WHERE id = $2 RETURNING *",
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
      const retorno = await db.query<Tposicao>(
        "DELETE FROM posicao WHERE id = $1 RETURNING *",
        [ id ]
      );
      return retorno.rows[0];
    } catch (er) {
      console.log((er as Error).message);
      return { success: false, message: (er as Error).message };
    }
    
  }


  public async ExistePosicao(nome: string) {
    try {
      const retorno = await db.query<Tposicao>(
        "select * from posicao e where lower(nome) = lower($1)",
        [nome]
      );
      return retorno?.rows[0] ? true : false; // se existe retorno do sql, retorna true (existe time), senão retorna false (não existe)
    } catch (er) {
      console.log((er as Error).message);
      return undefined;
    }
  }
}
