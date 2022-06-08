import * as express from "express";
import { CadastroModel } from "../../model/cadastro";

export default (() => {
  const router = express.Router();

  router.post("/", async (request, response) => {
    const { time, posicao, nome, apelido, cpf, numcamisa, idade, salario } =
      request.body;
    const cadastroController = new CadastroModel();
    const retorno = await cadastroController.createCadastro(
      time,
      posicao,
      nome,
      apelido,
      cpf,
      numcamisa,
      idade,
      salario
    );
    if (retorno !== undefined) response.status(200).send(retorno);
    else response.status(400).send("Não foi possível gravar o registro");
  });


})();
