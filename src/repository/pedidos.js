import con from "./connection.js";

export async function InserirPedidos(pedido) {
    const comando = `
insert into tb_pedido (id_cliente, id_produto,qtd_produto, Id_Usuario)
                        values(?, ?, ?, ? )
                   `      ;
    let resposta = await con.query(comando, [pedido.id_cliente, pedido.id_produto, pedido.qtd_produto, pedido.Id_Usuario])
    let info = resposta[0];

    return info.insertId;


}


export async function ConsultarPedidos(idUsuario) {
    const comando = `
select id_pedido       id,
          id_produto     id_produto,
        qtd_produto   quantidade
    from tb_pedido
    where id_usuario = ?
    
`;
    let resposta = await con.query(comando, [idUsuario]);
    let registros = resposta[0];
    return registros;




}


export async function ConsultarPedidosPorId(id) {
    const comando = `
    select id_pedido       id,
            id_produto    id_produto,
            qtd_produto   quantidade
        from tb_pedido
        where id_usuario = ?
    `;
    let resposta = await con.query(comando, [id]);
    let registros = resposta[0];
    return registros;




}


export async function removerPedido(id) {
    const comando = `
    DELETE FROM tb_pedido
WHERE id_pedido = ?;
    `
    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedrows;
}


/*

a funcao de alterar sera mesmo necessario , uma vez que essa tabela é composta por id


export async function Alterarpedido(id, cliente) {
    const comando = `
    update tb_cliente    
    set nome_cliente = ? ,
        data_nascimento =?,
        telefone = ?,
        cpf =?,
        medidas=?,
        observacoes =?,
        e_mail =?
        where id_cliente=?;`

    console.log(cliente)
    let resposta = await con.query(comando, [cliente.nome_cliente, new Date(cliente.data_Nascimento), cliente.telefone, cliente.cpf, cliente.medidas, cliente.observacoes, cliente.E_Mail, id])
    let info = resposta[0];
    return info.affectedRows;


}*/