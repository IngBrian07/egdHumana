const mysql = require('mysql');
const{promisify}=require('util');
const{database}=require('./configdb');
const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if(err){
        console.error('Error de conexión a la BD');
    }
    if(connection) connection.release();

    console.log('Conexión exitosa');
    return;
});

pool.query=promisify(pool.query);
module.exports=pool;