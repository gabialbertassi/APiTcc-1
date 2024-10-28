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


export async function verificarUsuarioExistente(email, telefone) {
    const comando = `
        SELECT * FROM tb_usuario 
        WHERE nm_usuario = ?
    `;
    let registros = await con.query(comando, [email, telefone]);
    return registros[0]; 
}

export async function verificarEmail(email) {
    const comando = `
        SELECT nm_usuario FROM tb_usuario 
        WHERE nm_usuario = ?
    `;
    let registros = await con.query(comando, [email]);
    return registros[0].length > 0;
}

export async function redefinirSenha(novaSenha, email, codigo) {
    const comando = `
        UPDATE tb_usuario 
        SET ds_senha = ? 
        WHERE nm_usuario = ? and codigo = ?
    `;
    
    const resultado = await con.query(comando, [novaSenha, email, codigo]);
    return resultado[0].affectedRows > 0;
}
 
export async function cadastrarCodigo(codigo, email){


    const comando = `
    UPDATE tb_usuario  
    SET codigo = ? 
    WHERE nm_usuario = ? 
    `;
    const resultado = await con.query(comando, [codigo , email]);
    return resultado[0].affectedRows > 0;

}
