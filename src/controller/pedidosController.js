import * as db from '../repository/pedidos.js';
import { Router } from "express";
import { autenticar } from '../utils/jwt.js';
const endpoints = Router();

endpoints.post('/pedidos/', autenticar, async (req, resp) => {
    try {
        let pedido= req.body;
        let id = await db.InserirPedidos(pedido ,req.user.id);

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})




endpoints.get('/pedido/', autenticar, async (req, resp) => {
    try {

        let idUsuario = req.user.id;
        let registros = await db.ConsultarPedidos(idUsuario);
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }


})




endpoints.put('/pedido/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let pedido = req.body;
        let linhasAfetadas = await db.Alterarpedido(id, pedido);
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

endpoints.delete('/pedido/:id', autenticar, async (req, resp) => {

    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerPedido(id)

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






export default endpoints