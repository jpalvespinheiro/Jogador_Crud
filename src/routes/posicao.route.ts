import * as express from "express";
import { PosicaoController } from "../controllers/posicao";
import {isRetornoDefault, RetornoDefault} from '../types/retorno';

const PosicaoRouter = express.Router();

PosicaoRouter.post("/", async (request, response) => {
    
  const { nome } = request.body;

  const equipeCtrl = new PosicaoController();

  // as validções devem ficar aqui nesse createCadastro
  const retorno = await equipeCtrl.create(nome);

  if (isRetornoDefault(retorno)) {
    return response.status(400).json(retorno)
  }

  response.status(200).send(retorno);
  
});

PosicaoRouter.put("/", async (request, response) => {

  const { id , nome } = request.body;
  const posicaoCtrl = new PosicaoController();

  // as validções devem ficar aqui nesse createCadastro
  const retorno = await posicaoCtrl.update(id, nome);

  if (isRetornoDefault(retorno)) {
    return response.status(400).json(retorno)
  }

  return response.status(200).send(retorno);
});

PosicaoRouter.get("/", async (request, response) => {
  response.status(200).json({ message: "tudo funfando!" });
  return;
});

export default PosicaoRouter;
