import { JogadorDTO, TJogador } from "../../types/jogador";
import db from "../../database";
import { RetornoDefault } from "../../types/retorno";

export class JogadorModel {
  public async create(jogador: JogadorDTO): Promise<TJogador | RetornoDefault> {
    try {
      const retorno = await db.query<TJogador>(
        "INSERT INTO jogador (nome , apelido , posicao , cpf , camisa , idade) VALUES ($1 , $2 , $3, $4, $5 , $6) RETURNING *",
        [
          jogador.nome,
          jogador.apelido,
          jogador.posicao,
          jogador.cpf,
          jogador.camisa,
          jogador.idade,
        ]
      );
      return retorno.rows[0];
    } catch (er) {
      return { success: false, message: (er as Error).message };
    }
  }

  public async update(jogador: TJogador) {
    try {
      const retorno = await db.query<TJogador>(
        "UPDATE jogador SET nome = $2 , apelido = $3 , posicao = $4 , cpf = $5 , camisa = $6 , idade = $7 , salario = $8 WHERE id = $1 RETURNING *",
        [jogador.id, jogador.nome, jogador.apelido, jogador.posicao, jogador.cpf, jogador.camisa, jogador.idade, jogador.salario]
      );
      return retorno.rows[0];
    } catch (er) {
      return { success: false, message: (er as Error).message };
    }
  }

  public async delete(id: number) {
    try {
      const retorno = await db.query<TJogador>(
        "DELETE FROM jogador WHERE id = $1 RETURNING *",
        [id]
      );
      return retorno.rows[0];
    } catch (er) {
      console.log((er as Error).message);
      return { success: false, message: (er as Error).message };
    }
  }

  public async existByCpf(cpf: string) {
    try {
      const retorno = await db.query<TJogador>(
        "select * from jogador e where cpf = $1",
        [cpf]
      );
      return retorno?.rows[0] ? true : false; // se existe retorno do sql, retorna true (existe time), senão retorna false (não existe)
    } catch (er) {
      return undefined;
    }
  }

  public async existByPosicao(posicao: string) {
    try {
      const retorno = await db.query<TJogador>(
        "select * from jogador e where posicao = $1",
        [posicao]
      );
      return retorno?.rows[0] ? true : false; // se existe retorno do sql, retorna true (existe time), senão retorna false (não existe)
    } catch (er) {
      return undefined;
    }
  }
}
