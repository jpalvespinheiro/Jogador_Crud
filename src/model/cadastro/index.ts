import { TCadastro } from "../../types/cadastro";
import db from "../../database";

export class CadastroModel {
  public async createCadastro(
    time: string,
    posicao: string,
    nome: string,
    apelido: string,
    cpf: string,
    numcamisa: number,
    idade: number,
    salario: number
  ): Promise<TCadastro | undefined> {
    try {
      const retorno = await db.query<TCadastro>(
        "INSERT INTO cadastro (time , posicao , nome , apelido , cpf , numcamisa , idade , salario) VALUES (1$ , 2$ , 3$ , 4$ , $5, $6 , 7$, $8) RETURNING *",
        [time, posicao, nome, apelido, cpf, numcamisa, idade, salario]
      );
      return retorno.rows[0];
    } catch (er) {
      console.log((er as Error).message);
      return undefined;
    }
  }

  public async updateCadastro(
    time: string,
    posicao: string,
    nome: string,
    apelido: string,
    cpf: string,
    numcamisa: number,
    idade: number,
    salario: number
  ): Promise<TCadastro | undefined> {
    try {
      const retorno = await db.query<TCadastro>(
        "UPDATE cadastro SET time = $1 , posicao = $2 , nome = $3 , apelido = $4 , cpf = $5 , numcamisa = $6 , idade = $7 , salario = $8 WHERE RETURNING * ",
        [time, posicao, nome, apelido, cpf, numcamisa, idade, salario]
      );
      return retorno.rows[0];
    } catch (er) {
      console.log((er as Error).message);
      return undefined;
    }
  }

  public async deleteCadastro(id: number): Promise<boolean> {
    try {
      const retorno = await db.query<TCadastro>(
        "DELETE FROM cadastro WHERE id = 1$ RETURNING *",
        [id]
      );
      return retorno.rows[0] !== undefined;
    } catch (er) {
      console.log((er as Error).message);
      return false;
    }
  }

  public async existePosicao(time: string, posicao: string): Promise<boolean> {
    try {
      const retorno = await db.query<TCadastro>(
        "SELECT FROM cadastro where upper(time) = upper($1) and posicao = $2",
        [time, posicao]
      );
      return retorno.rows[0] !== undefined;
    } catch (er) {
      console.log((er as Error).message);
      return false;
    }
  }

  public async existeNumCamisa(
    time: string,
    numcamisa: number
  ): Promise<boolean> {
    try {
      const retorno = await db.query<TCadastro>(
        "SELECT FROM cadastro where upper(time) = upper(1$) and numcamisa = 2$",
        [time, numcamisa]
      );
      return retorno.rows[0] !== undefined;
    } catch (er) {
      console.log((er as Error).message);
      return false;
    }
  }

}
