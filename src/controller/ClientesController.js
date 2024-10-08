import * as db from '../repository/ClientesRepository.js';

import  {Router} from "express";
const endpoints = Router ();

endpoints.get('/cliente/', async (req, resp) => {
    try {
        let registros =await db.ConsultarCliente();
        resp.send (registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }


})

endpoints.get('/cliente/:id', async (req, resp) => {
    try {
        
        let id= req.params.id;
        let registros =await db.ConsultarClientePorId(id);
        resp.send (registros[0]);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }


})

endpoints.post('/cliente/',async (req, resp) => {
    try {
        let cliente= req.body;
        let id= await db.InserirCliente(cliente);

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})
 
endpoints.put('/cliente/:id',async (req, resp) => {
    try {
   let id= req.params.id;
        let cliente= req.body;
let linhasAfetadas= await db.AlterarCliente(id,cliente);
if(linhasAfetadas>=1){
resp.send();
}
    else{resp.status(404).send({erro: 'nenhum registro encontrado'})}
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})
 

endpoints.delete('/cliente/:id', async (req,resp) => {

try{
let id = req.params.id;

let linhasAfetadas = await db.removercliente(id)

if(linhasAfetadas>=1){
resp.send();
}
    else{resp.status(404).send({erro: 'nenhum registro encontrado'})}
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })


}


})

export default endpoints