import con from "./connection.js"

export async function InserirUsuario(pessoa){

    const comando = `
    insert into tb_usuario (nm_usuario, ds_senha)
                values(?,?)
    `;

    let resposta = await con.query(comando, [pessoa.nm_usuario , pessoa.ds_senha])
    let  info = resposta[0]
    return info.insertId 

}

export async function validarUsuario(pessoa){

    const comando = `
        select 
        id_usuario  id,
        nm_usuario  nome
        from tb_usuario
        where 
        nm_usuario =?
        and ds_senha=?

    `;

    let registros = await con.query(comando, [pessoa.nm_usuario , pessoa.ds_senha])
  
    return registros[0][0]

}