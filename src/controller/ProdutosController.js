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




endpoints.get('/produtos/', async (req, resp) => {
        try {
                let registros =await db.ConsultarProdutos();
                        resp.send (registros);

                            } catch (err) {
                                    resp.status(400).send({
                                                erro: err.message
                                                        })
                                                            }


                                                            })




endpoints.put('/produtos/:id',async (req, resp) => {
        try {
           let id= req.params.id;
                   let produto= req.body;
                   let linhasAfetadas= await db.alterarProduto(id,produto);
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
                                                            
endpoints.delete('/produtos/:id', async (req,resp) => {

try{
let id = req.params.id;

let linhasAfetadas = await db.removerProduto(id)

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