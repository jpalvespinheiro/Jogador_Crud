import * as express from "express";
import { JogadorController } from "../controllers/jogador";
import { isRetornoDefault } from "../types/retorno";

const JogadorRouter = express.Router();

JogadorRouter.post("/", async (request, response) => {
  const { nome, apelido, posicao, cpf, camisa, idade, salario } = request.body;
  const JogadorCtrl = new JogadorController();

  // as validções devem ficar aqui nesse createCadastro
  const retorno = await JogadorCtrl.create({nome, apelido, posicao, cpf, camisa, idade, salario});

  if (isRetornoDefault(retorno)) {
    return response.status(400).json(retorno)
  }

  response.status(200).send(retorno);
});

JogadorRouter.put("/", async (request, response) => {

  const { id , nome, apelido, posicao, cpf, camisa, idade, salario } = request.body;
  const JogadorCtrl = new JogadorController();

  // as validções devem ficar aqui nesse createCadastro
  const retorno = await JogadorCtrl.update({id, nome, apelido, posicao, cpf, camisa, idade, salario});

  if (isRetornoDefault(retorno)) {
    return response.status(400).json(retorno)
  }

  return response.status(200).send(retorno);
});

JogadorRouter.get("/", async (request, response) => {
  response.status(200).json({ message: "tudo funfando!" });
  return;
});

export default JogadorRouter;
