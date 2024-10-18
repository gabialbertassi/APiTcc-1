import con from "./connection.js";

export async function InserirCliente(cliente){
const comando =  `
insert into tb_cliente (NOME_cliente , DATA_nascimento , telefone, cpf, medidas, observacoes , E_MAIL, Id_Usuario)
                        values(?, ?, ?, ?, ?, ?, ?, ? )
                   `      ;
let resposta = await con.query (comando,[cliente.NOME_cliente ,new Date(cliente.DATA_Nascimento) , cliente.telefone, cliente.cpf, cliente.medidas , cliente.observacoes, cliente.E_MAIL,cliente.Id_Usuario ])
let info = resposta[0];

return info.insertId;


}


export async function ConsultarCliente(idUsuario){
const comando = `
select ID_Cliente       id,
        nome_cliente    nome,
        data_nascimento data_Nascimento,
        telefone        telefone,
        cpf             cpf,
        medidas         medidas,
        observacoes     observacoes,
        e_mail          email
    from tb_cliente
    where id_usuario = ?
    
`;
let resposta = await con.query (comando,[idUsuario]);
let registros = resposta[0];
return registros;




}


export async function ConsultarClientePorId(id){
    const comando = `
    select id_Cliente       id,
            nome_cliente    nome,
            data_nascimento data_Nascimento,
            telefone        telefone,
            cpf             cpf,
            medidas         medidas,
            observacoes     observacoes,
            e_mail          email
        from tb_cliente
        where id_cliente = ?
    `;
    let resposta = await con.query (comando,[id]);
    let registros = resposta[0];
    return registros;
    
    
    
    
    }


export async function removercliente(id) {
    const comando =`
    DELETE FROM tb_cliente
WHERE ID_Cliente = ?;
    `
    let resposta = await con.query(comando , [id]);
    let info = resposta[0];

    return info.affectedrows;
}




export async function AlterarCliente(id,cliente){
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
    let resposta = await con.query (comando, [cliente.nome_cliente,new Date(cliente.data_Nascimento), cliente.telefone , cliente.cpf, cliente.medidas , cliente.observacoes, cliente.E_Mail, id])
    let info = resposta [0];
    return info.affectedRows;


}