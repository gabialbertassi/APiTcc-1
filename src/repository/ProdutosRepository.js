import con from "./connection.js";


export async function InserirProduto(produto){
    const comando =  `
    insert into tb_produtos (nm_procedimento , nm_profissional , descricao, preco, observacoes, id_usuario)
                            values(?, ?, ?, ?, ?,? )
                       `      ;
    let resposta = await con.query (comando,[produto.nm_procedimento, produto.nm_profissional , produto.descricao,  produto.preco , produto.observacoes , produto.id_usuario])
    let info = resposta[0];
    
    return info.insertId;
    
    
    }
    export async function ConsultarProdutos (id_usuario){
    const comando =  `
    select id_procedimento   id,
    nm_procedimento    procedimento,
    nm_profissional    profissional,
    descricao          descrição,
    preco              preço,
    observacoes       obs
    from tb_produtos
    where id_usuario= ?
    `;

    let resposta = await con.query (comando, [id_usuario]);
 let registros = resposta [0];
 return registros;
    
    

    }

    export async function ConsultarProdutoPorId(id){
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
  export async function removerProduto(id){

     const comando =`
     DELETE FROM tb_produtos 
     WHERE id_procedimento = ?
     
     
     `;
     let resposta= await con.query(comando,[id]);
     let info = resposta[0]
    
return info.affectedrows;

  }


  export async function AlterarProduto(id,produto){

const comando = `
update tb_produtos 
set nm_procedimento = ?,
nm_profissional =?,
descricao=?,
preco= ?,
observacoes= ?
where id_procedimento =?

`;
let resposta = await con.query(comando,[produto.nm_procedimento, produto.nm_profissional, produto.descricao, produto.preco, produto.observacoes, id])
let info = resposta [0];
return info.affectedRows

  }
