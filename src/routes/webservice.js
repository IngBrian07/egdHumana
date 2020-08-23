const express = require('express');
const router = express.Router();
const pool = require("../database");

router.get('/',async (req,res)=>{
    const usuario = await pool.query('select * from egd_usuarios');
    res.json(usuario);
});

router.get('/:user',async (req,res)=>{
    const {user}=req.params;
    const usuario = await pool.query('select Id_usuario,nombre, SHA1(CONCAT("CIHEGD",nombre,contrasena)) AS HASH from egd_usuarios where nombre=?',[user]);
    res.json(usuario);
});

router.get('/:id',async (req,res)=>{
    const {id}=req.params;
    const productos = await pool.query('select * from egd_usuarios where Id_usuario=?',[id]);
    res.json(productos);
});

router.get('/objetivo/:id',async (req,res)=>{
    const {id}=req.params;
    const productos = await pool.query('select * from egd_objcumpl where obc_idCol=?',[id]);
    res.json(productos);
});
router.delete('/ficharegis/:obc_id',async (req,res)=>{
    const {obc_id}=req.params
    await pool.query('delete from egd_objcumpl where obc_id = ?', [obc_id]);    
    res.render('links/ficharegis');
});
// router.get('/',async (req,res)=>{
//     const productos = await pool.query('select * from egd_usuarios');
//     res.json(productos);
// });

// router.get('/:user',async (req,res)=>{
//     const {user}=req.params;
//     const productos = await pool.query('select id,user, SHA1(CONCAT("Lunes",user,Password)) AS HASH from usuarios where User=?',[user]);
//     res.json(productos);
// });
// router.get('/',async (req,res)=>{
//     const productos = await pool.query('select * from productos');
//     res.json(productos);
// });

// router.get('/:id',async (req,res)=>{
//     const {id}=req.params;
//     const productos = await pool.query('select * from productos where id=?',[id]);
//     res.json(productos);
// });

module.exports=router;