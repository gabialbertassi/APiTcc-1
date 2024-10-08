import mysql from 'mysql2/promise'

const  con = await mysql.createConnection({
host: process.env.MYSQL_HOST,
user: process.env.MYSQL_USER,
password: process.env.MYSQL_PWD,
database: process.env.MYSQL_BD,
typeCast: function (field,next) {

    if (field.type === 'tiny' && field.length === 1) {
   return (field.string() === '1');

    }
    else if (field.type.includes('decimal') ) {
        return (field.string());

    }
    else if (field.type.includes('decimal')){
        return Number(field.string());
    }
    else {
        return next ()
    }
} 






})

console.log('--> db conectado <--');
export default con;