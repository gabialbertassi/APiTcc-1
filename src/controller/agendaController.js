import * as db from '../repository/agendaRepository.js';

import { Router } from "express";
import { autenticar } from '../utils/jwt.js';
const endpoints = Router();

endpoints.get('/agenda/', autenticar, async (req, resp) => {
    try {
        let id = req.user.id;
        let registros = await db.Consultarhorario(id);
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }


})

endpoints.get('/agenda/:id', autenticar , async (req, resp) => {
    try {

        let id = req.params.id;
        let registros = await db.ConsultarhorarioPorId(id);
        resp.send(registros[0]);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }


})

endpoints.post('/agenda/', autenticar, async (req, resp) => {
    try {
        let horario = req.body;
        let id = await db.Inserirhorario(horario);

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put('/agenda/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let horario = req.body;
        let linhasAfetadas = await db.Alterarhorario(id, horario);
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


endpoints.delete('/agenda/:id', autenticar, async (req, resp) => {

    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerhorario(id)

        if (linhasAfetadas >= 1) {
            resp.send();
        }
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })


    }


})

export default endpoints