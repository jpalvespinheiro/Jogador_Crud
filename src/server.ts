import express from "express";
import EquipeRouter from "./routes/equipe.route";
import PosicaoRouter from "./routes/posicao.route";
import JogadorRouter from "./routes/jogador.route";

const app = express();
app.use(express.json());

app.use("/equipes", EquipeRouter);
app.use("/posicao", PosicaoRouter);
app.use("/jogador", JogadorRouter);

app.listen(3001, () =>
  console.log("Servidor conectado em http://localhost:3001")
);
