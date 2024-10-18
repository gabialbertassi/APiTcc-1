import con from "./connection.js";

export async function Inserirhorario(horario){
const comando =  `
insert into tb_agenda (data ,hr_inicio , hr_fim , id_pedidos, Id_Usuario)
                        values(?, ?, ?, ?, ?, ?, ?, ? )
                   `      ;
let resposta = await con.query (comando,[ new Date(horario.data) ,horario.hr_inicio, horario.hr_fim, horario.id_pedidos ,horario.Id_Usuario ])
let info = resposta[0];

return info.insertId;


}


export async function Consultarhorario(idUsuario){
const comando = `
select id_agenda       id,
        data            data,
        hr_inicio       inicio,
        hr_fim          fim,
        id_pedido       pedido
    from tb_agenda
    where id_usuario = ?
    
`;
let resposta = await con.query (comando,[idUsuario]);
let registros = resposta[0];
return registros;




}


export async function ConsultarhorarioPorId(id){
    const comando = `
    select id_agenda       id,
            data            data,
            hr_inicio       inicio,
            hr_fim          fim,
            id_pedido       pedido
        from tb_agenda
        where id_usuario = ?
        
    `;
    let resposta = await con.query (comando,[id]);
    let registros = resposta[0];
    return registros;
    
    
    
    
    }
    





export async function removerhorario(id) {
    const comando =`
    DELETE FROM tb_agenda
WHERE id_agenda = ?;
    `
    let resposta = await con.query(comando , [id]);
    let info = resposta[0];

    return info.affectedrows;
}

export async function Alterarhorario(id,horario){
const comando = `
update tb_agenda    
set data = ? ,
    hr_inicio  =?,
    hr_fim = ?,
    id_pedido =?
    where id_agenda=?;` 
 
    let resposta = await con.query (comando,[ new Date(horario.data) ,horario.hr_inicio, horario.hr_fim, horario.id_pedidos ,horario.Id_Usuario, id ])

    let info = resposta [0];
    return info.affectedRows;


}