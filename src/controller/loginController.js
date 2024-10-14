import * as db from '../repository/loginRepository.js';


import  {Router} from "express";
import { autenticar, gerarToken } from '../utils/jwt.js';

const endpoints = Router ();


endpoints.post('/usuario/',async (req, resp) => {
    try {
        let usuario= req.body;
        let id= await db.InserirUsuario(usuario);

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/entrar/',  async (req,resp) =>{

    try {
        let pessoa= req.body;
        let usuario= await db.validarUsuario(pessoa);

        if(usuario==null){
            resp.send({erro: "Usuário e/ou senha incorreto(s)"})

        }else{
            let token = gerarToken(usuario);
            resp.send({
                "token": token
            })
        }

       
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }




})

export default endpoints