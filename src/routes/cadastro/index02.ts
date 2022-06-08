import * as express from 'express'
import cadastroRouter from './cadastro';

export default (() => {

    const router = express.Router();
    router.use("/cadastro", cadastroRouter);
})()