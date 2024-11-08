import con from "./connection.js";

export async function InserirPedidos(pedido, idUsuario) {
    const comando = `
insert into tb_pedido (id_cliente, id_produto,qtd_produto, Id_Usuario)
                        values(?, ?, ?, ? )
                   `      ;
    let resposta = await con.query(comando, [pedido.id_cliente, pedido.id_produto, pedido.qtd_produto,idUsuario])
    let info = resposta[0];

    return info.insertId;


}


export async function ConsultarPedidos(idUsuario) {
    const comando = `
    SELECT 
    c.NOME_Cliente AS nome_cliente,
    p.nm_procedimento AS nome_procedimento,
    pe.id_pedido AS id_pedido,
    pe.qtd_produto AS quantidade_pedido

FROM 
    QueenBeauty.tb_cliente AS c
JOIN 
    QueenBeauty.tb_pedido AS pe ON c.ID_Cliente = pe.id_cliente
JOIN 
    QueenBeauty.tb_produtos AS p ON pe.id_produto = p.Id_procedimento

    where c.id_usuario=3;
    
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
export async function Alterarpedido(id, cliente) {
    const comando = `
    update tb_pedido  
    set no ,
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