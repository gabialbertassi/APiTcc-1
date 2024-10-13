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
    export async function ConsultarProdutos (){
    const comando =  `
    select id_procedimento   id,
    nm_procedimento    procedimento,
    nm_profissional    profissional,
    descricao          descrição,
    preco              preço,
    observacoes       obs
    from tb_produtos
    `;

    let resposta = await con.query (comando);
 let registros = resposta [0];
 return registros;
    
    

    }

    export async function ConsultarProdutoPorId(){
        const comando = `
        select id_procedimento     id,
        nm_procedimento           procedimento,
        nm_profissional          profissional,
        descricao               descrição,
        preco                 preço,
        observacoes         obs
        from tb_produtos 
        where id_procedimento = ?
        `
       let resposta = await con.query (comando,[id]);
       let registros = resposta [0];
       return registros;
        
    }



  
