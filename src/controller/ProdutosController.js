import * as db from '../repository/ProdutosRepository.js';
import { Router } from "express";
import { autenticar } from '../utils/jwt.js';
const endpoints = Router();

endpoints.post('/produtos/', autenticar, async (req, resp) => {
    try {
        let produto = req.body;
        let id = await db.InserirProduto(produto);

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})




endpoints.get('/produto/', autenticar, async (req, resp) => {
    try {

        let idUsuario = req.user.id;
        let registros = await db.ConsultarProdutos(idUsuario);
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }


})




endpoints.put('/produtos/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let produto = req.body;
        let linhasAfetadas = await db.AlterarProduto(id, produto);
        if (linhasAfetadas >= 1) {
            resp.send();
        }
        else { resp.status(404).send({ erro: 'nenhum registro encontrado' }) }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.delete('/produtos/:id', autenticar, async (req, resp) => {

    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerProduto(id)

        if (linhasAfetadas >= 1) {
            resp.send(200);
        }
        else { resp.status(404).send({ erro: 'nenhum registro encontrado' }) }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })


    }


})






export default endpoints