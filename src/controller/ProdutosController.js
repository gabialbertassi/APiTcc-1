import * as db from '../repository/ProdutosRepository.js';
import  {Router} from "express";
const endpoints = Router ();

endpoints.post('/produtos/',async (req, resp) => {
    try {
        let produto= req.body;
        let id= await db.InserirProduto(produto);

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})
export default endpoints