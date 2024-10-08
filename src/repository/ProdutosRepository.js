import con from "./connection.js";


export async function InserirProduto(produto){
    const comando =  `
    insert into tb_produtos (nm_procedimento , nm_profissional , descricao, preco, observacoes )
                            values(?, ?, ?, ?, ? )
                       `      ;
    let resposta = await con.query (comando,[produto.nm_procedimento, produto.nm_profissional , produto.descricao,  produto.preco , produto.observacoes ])
    let info = resposta[0];
    
    return info.insertId;
    
    
    }