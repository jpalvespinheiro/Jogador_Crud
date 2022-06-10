import * as express from "express";
import { EquipeController } from "../controllers/equipe";
import {isRetornoDefault, RetornoDefault} from '../types/retorno';

const EquipeRouter = express.Router();

EquipeRouter.post("/", async (request, response) => {
    
  const { nome } = request.body;

  const equipeCtrl = new EquipeController();

  // as validções devem ficar aqui nesse createCadastro
  const retorno = await equipeCtrl.create(nome);

  if (isRetornoDefault(retorno)) {
    return response.status(400).json(retorno)
  }

  response.status(200).send(retorno);
});

EquipeRouter.put("/", async (request, response) => {

  const { id , nome } = request.body;
  const equipeCtrl = new EquipeController();

  // as validções devem ficar aqui nesse createCadastro
  const retorno = await equipeCtrl.update(id, nome);

  if (isRetornoDefault(retorno)) {
    return response.status(400).json(retorno)
  }

  return response.status(200).send(retorno);
});



EquipeRouter.get("/", async (request, response) => {
  response.status(200).json({ message: "tudo funfando!" });
  return;
});

export default EquipeRouter;
