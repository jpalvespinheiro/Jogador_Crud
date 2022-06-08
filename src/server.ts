import express from "express"; 
import { Router } from "express";

const app = express();
app.use(Router)
app.listen(3001, () => console.log("Servidor conectado em http://localhost:3001"))