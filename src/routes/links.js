const express = require('express');
const router = express.Router();
const pool = require("../database");
const { query } = require('express');


router.get('/cumpli/:obc_id',async(req,res)=>{
    const {obc_id}=req.params
    const usu = await pool.query('SELECT obc.obc_nomObj, obc.obc_idCol FROM egd_objcumpl obc INNER JOIN cih_colaborador cola ON obc.obc_idCol = cola.col_id WHERE obc.obc_id = ?',[obc_id]);
    res.render('links/cumpli',{usu:usu[0]});
});


router.post('/cumpli',async (req,res)=>{
    const {cum_objetivo, cum_pondera, cum_nivel, cum_ind1, cum_ind2, cum_min1, cum_sat1, cum_sobre1,  cum_min2, cum_sat2, cum_sobre2, cum_evide, cum_idCol}=req.body;
    const nuevoCumpli={cum_objetivo, cum_pondera, cum_nivel, cum_ind1, cum_ind2, cum_min1, cum_sat1, cum_sobre1,  cum_min2, cum_sat2, cum_sobre2, cum_evide, cum_idCol}
    await pool.query('insert into egd_objcolaborador set ?',[nuevoCumpli]);
    res.redirect('links/cumpli');
});

router.get('/cumplimenu',async(req,res)=>{
    const query = await pool.query('SELECT col.col_id, col.col_nomPuesto,per.per_id, per.per_nombre, per.per_appat, per.per_apmat FROM cih_colaborador col INNER JOIN cih_persona per ON col.col_idPersona = per.per_id;');
    res.render('links/cumplimenu',{query});
});

router.get('/listaCumpli/:per_id',async (req,res)=>{
    const {per_id}=req.params
    const query = await pool.query('SELECT egd_objcumpl.obc_nomObj, egd_objcumpl.obc_idCol, egd_objcumpl.obc_id, cih_colaborador.col_id, cih_persona.per_id, cih_persona.per_nombre, cih_persona.per_appat, cih_persona.per_apmat FROM egd_objcumpl INNER JOIN cih_colaborador ON egd_objcumpl.obc_idCol = cih_colaborador.col_id INNER JOIN cih_persona ON cih_colaborador.col_idPersona = cih_persona.per_id WHERE obc_idCol = ?',[per_id]);
    res.render('links/listaCumpli',{query});
});


//MOSTRAR LOS USUARIOS REGISTRADOS
router.get('/fichaegd',async (req,res)=>{
    const query = await pool.query('SELECT col.col_id, col.col_nomPuesto,per.per_id, per.per_nombre, per.per_appat, per.per_apmat FROM cih_colaborador col INNER JOIN cih_persona per ON col.col_idPersona = per.per_id;');
    res.render('links/fichaegd',{query});
});


//DETALLES DE LOS USUARIOS
router.get('/ficha2/:per_id',async (req,res)=>{
    const {per_id}=req.params
    const usu = await pool.query('SELECT col.col_id, per.per_id, col.col_antiguedad, col.col_idEmpresa, col.col_direccion, col.col_subdi, col.col_gerencia, col.col_nomPuesto, col.col_antiPuesto, col.col_antiEmpre, col.col_perido,	per.per_nombre,	per.per_appat, per.per_apmat FROM cih_colaborador col INNER JOIN cih_persona per ON col.col_idPersona = per.per_id WHERE col_id = ?',[per_id]);
    res.render('links/ficha2',{usu:usu[0]});
});

router.post('/ficha2',async (req,res)=>{
    const {obc_nomObj, obc_pondera, obc_cumpli, obc_evaluador, obc_evaPuesto, obc_ind1, obc_ind2, obc_min1, obc_satis1, obc_sobre1, obc_min2, obc_satis2, obc_sobre2, obc_idCol}=req.body;
    const nuevoObje={obc_nomObj, obc_pondera, obc_cumpli, obc_evaluador, obc_evaPuesto, obc_ind1, obc_ind2, obc_min1, obc_satis1, obc_sobre1, obc_min2, obc_satis2, obc_sobre2, obc_idCol};
    // const cumpli = {obc_cumpli};
    await pool.query('insert into egd_objcumpl set ?', [nuevoObje]);
    // await pool.query ('insert into egd_objetivo (obj_cumpli) values ?', [cumpli]);
    res.redirect('/links/fichaegd');
});

router.get('/index',(req,res)=>{
    res.render('links/index');
});

router.get('/login',(req,res)=>{
    res.render('links/login');
});

router.get('/objemenu',async (req,res)=>{
    const query = await pool.query('SELECT col.col_id, col.col_nomPuesto,per.per_id, per.per_nombre, per.per_appat, per.per_apmat FROM cih_colaborador col INNER JOIN cih_persona per ON col.col_idPersona = per.per_id;');
    res.render('links/objemenu',{query});
});

router.get('/listaObje/:per_id',async (req,res)=>{
    const {per_id}=req.params
    const query = await pool.query('SELECT egd_objcumpl.obc_nomObj, egd_objcumpl.obc_idCol, egd_objcumpl.obc_id, cih_colaborador.col_id, cih_persona.per_id, cih_persona.per_nombre, cih_persona.per_appat, cih_persona.per_apmat FROM egd_objcumpl INNER JOIN cih_colaborador ON egd_objcumpl.obc_idCol = cih_colaborador.col_id INNER JOIN cih_persona ON cih_colaborador.col_idPersona = cih_persona.per_id WHERE obc_idCol = ?',[per_id]);
    res.render('links/listaObje',{query});
});

router.get('/obje/:obc_id',async (req,res)=>{
    const {obc_id}=req.params
    const usu = await pool.query('SELECT obc.obc_nomObj, obc.obc_idCol FROM egd_objcumpl obc INNER JOIN cih_colaborador cola ON obc.obc_idCol = cola.col_id WHERE obc.obc_id = ?',[obc_id]);
    res.render('links/obje',{usu:usu[0]});
});

router.post('/obje',async (req,res)=>{
    const {obj_obje, obj_verbo, obj_unidad, obj_cumpli, obj_acci, obj_objeEstra, obj_macro, obj_proce,  obj_subpro, obj_min, obj_satis, obj_sobre, obj_idCol}=req.body;
    const nuevoObjeJ={obj_obje, obj_verbo, obj_unidad, obj_cumpli, obj_acci, obj_objeEstra, obj_macro, obj_proce, obj_subpro, obj_min, obj_satis, obj_sobre, obj_idCol}
    await pool.query('insert into egd_objetivo set ?', [nuevoObjeJ]);
    res.redirect('/links/objemenu');
});

router.get('/registro',(req,res)=>{
    res.render('links/registro');
});
//registro de usuarios
router.post('/registro',async (req,res)=>{
    const {nombre,appat,apmat,correo,celular,contrasena}=req.body;
    const nuevoUsu={nombre,appat,apmat,correo,celular,contrasena};
    await pool.query('insert into egd_usuarios set ?', [nuevoUsu]);
    res.redirect('/links/login');
    // JSAlert.alert("Usuario :", +nombre,+"\nIngresado correctamente");
});


router.get('/ficharegis', async (req,res)=>{
    const query = await pool.query('SELECT egd_objcumpl.obc_nomObj,egd_objcumpl.obc_id,egd_objcumpl.obc_idCol,cih_colaborador.col_id,cih_colaborador.col_idPersona,cih_persona.per_nombre,cih_persona.per_appat,cih_persona.per_apmat FROM egd_objcumpl INNER JOIN cih_colaborador ON egd_objcumpl.obc_idCol = cih_colaborador.col_id INNER JOIN cih_persona ON cih_colaborador.col_idPersona = cih_persona.per_id ORDER BY cih_persona.per_nombre DESC');
    res.render('links/ficharegis',{query});
});

router.get('/verficha/:obc_id',async (req,res)=>{
    const {obc_id}=req.params
    const usu = await pool.query('SELECT obc.obc_id,obc.obc_nomObj,obc.obc_pondera,obc.obc_cumpli,obc.obc_evaluador,obc.obc_evaPuesto,obc.obc_ind1,obc.obc_ind2,obc.obc_min1,obc.obc_satis1,obc.obc_sobre1,obc.obc_min2,obc.obc_satis2,obc.obc_sobre2,obc.obc_idCol,col.col_idPersona,per.per_nombre,per.per_appat,per.per_apmat,col.col_direccion,col.col_gerencia,col.col_antiguedad,col.col_nomPuesto,col.col_antiPuesto,col.col_antiEmpre,col.col_subdi,col.col_perido FROM egd_objcumpl obc INNER JOIN cih_colaborador col ON obc.obc_idCol = col.col_id INNER JOIN cih_persona per ON col.col_idPersona = per.per_id WHERE obc.obc_id = ?',[obc_id]);
    res.render('links/verficha',{usu:usu[0]});
});

router.get('/eliminar/:obc_id',async (req,res)=>{
    const {obc_id}=req.params
    await pool.query('delete from egd_objcumpl where obc_id = ?', [obc_id]);    
    res.redirect('/links/ficharegis');
});


router.get('/editficha/:obc_id',async (req,res)=>{
    const {obc_id}=req.params
    const usu = await pool.query('SELECT obc.obc_id,obc.obc_nomObj,obc.obc_pondera,obc.obc_cumpli,obc.obc_evaluador,obc.obc_evaPuesto,obc.obc_ind1,obc.obc_ind2,obc.obc_min1,obc.obc_satis1,obc.obc_sobre1,obc.obc_min2,obc.obc_satis2,obc.obc_sobre2,obc.obc_idCol,col.col_idPersona,per.per_nombre,per.per_appat,per.per_apmat,col.col_direccion,col.col_gerencia,col.col_antiguedad,col.col_nomPuesto,col.col_antiPuesto,col.col_antiEmpre,col.col_subdi,col.col_perido FROM egd_objcumpl obc INNER JOIN cih_colaborador col ON obc.obc_idCol = col.col_id INNER JOIN cih_persona per ON col.col_idPersona = per.per_id WHERE obc.obc_id = ?',[obc_id]);
    res.render('links/editficha',{usu:usu[0]});
    
});


router.post('/editficha/:obc_id',async (req,res)=>{
    const {obc_id}=req.params
    const {obc_nomObj, obc_pondera, obc_cumpli, obc_evaluador, obc_evaPuesto, obc_ind1, obc_ind2, obc_min1, obc_satis1, obc_sobre1, obc_min2, obc_satis2, obc_sobre2, obc_idCol}=req.body;
    const updateObje={obc_nomObj, obc_pondera, obc_cumpli, obc_evaluador, obc_evaPuesto, obc_ind1, obc_ind2, obc_min1, obc_satis1, obc_sobre1, obc_min2, obc_satis2, obc_sobre2, obc_idCol};
    await pool.query('update egd_objcumpl set ? where obc_id = ?', [updateObje,obc_id]);
    res.redirect('/links/ficharegis');
});

router.get('/objeregis', async (req,res)=>{
    const query = await pool.query('SELECT egd_objetivo.obj_obje,egd_objetivo.obj_id,egd_objetivo.obj_idCol,cih_colaborador.col_idPersona,egd_objcumpl.obc_nomObj,egd_objcumpl.obc_id,cih_persona.per_appat,cih_persona.per_apmat,cih_persona.per_nombre FROM egd_objetivo INNER JOIN cih_colaborador ON egd_objetivo.obj_idCol = cih_colaborador.col_id INNER JOIN egd_objcumpl ON egd_objcumpl.obc_idCol = cih_colaborador.col_id INNER JOIN cih_persona ON cih_colaborador.col_idPersona = cih_persona.per_id ORDER BY cih_persona.per_nombre DESC');
    res.render('links/objeregis',{query});
});

router.get('/eliminarobje/:obj_id',async (req,res)=>{
    const {obj_id}=req.params
    await pool.query('delete from egd_objetivo where obj_id = ?', [obj_id]);    
    res.redirect('/links/objeregis');
});

router.get('/verobje/:obj_id',async (req,res)=>{
    const {obj_id}=req.params
    const usu = await pool.query('SELECT * from egd_objetivo where obj_id = ?',[obj_id]);
    res.render('links/verobje',{usu:usu[0]});
});


router.post('/actObje/:obj_id', async (req,res)=>{
    const {obj_id}=req.params
    const {obj_obje, obj_verbo, obj_unidad, obj_cumpli, obj_acci, obj_objeEstra, obj_macro, obj_proce, obj_subpro, obj_min, obj_satis, obj_sobre, obj_idCol}=req.body;
    const update={obj_obje, obj_verbo, obj_unidad, obj_cumpli, obj_acci, obj_objeEstra, obj_macro, obj_proce, obj_subpro, obj_min, obj_satis, obj_sobre, obj_idCol};
    await pool.query('update egd_objetivo set ? where obj_id = ?', [update,obj_id]);
    res.redirect('/links/objeregis');
});

router.get('/cumpliregis', async (req,res)=>{
    const query = await pool.query('SELECT egd_objcolaborador.cum_id,egd_objcolaborador.cum_objetivo, egd_objcolaborador.cum_idCol, cih_colaborador.col_idPersona, cih_persona.per_appat, cih_persona.per_nombre, cih_persona.per_apmat FROM cih_colaborador INNER JOIN cih_persona ON cih_colaborador.col_idPersona = cih_persona.per_id INNER JOIN egd_objcolaborador ON egd_objcolaborador.cum_idCol = cih_colaborador.col_id;');
    res.render('links/cumpliregis',{query});
});

router.get('/eliminarcumpli/:cum_id',async (req,res)=>{
    const {cum_id}=req.params
    await pool.query('delete from egd_objcolaborador where cum_id = ?', [cum_id]);    
    res.redirect('/links/cumpliregis');
});

router.get('/vercumpli/:cum_id',async(req,res)=>{
    const {cum_id}=req.params;
    const usu = await pool.query('SELECT * from egd_objcolaborador where cum_id = ?',[cum_id]);
    res.render('links/vercumpli',{usu:usu[0]});
});
//////////////////////////////////////////////////
router.post('/actCumpli/:cum_id', async (req,res)=>{
    const {cum_id}=req.params
    const {cum_objetivo,cum_pondera,cum_nivel,cum_ind1,cum_ind2,cum_min1,cum_sat1,cum_sobre1,cum_min2,cum_sat2,cum_sobre2,cum_evide,cum_idCol}=req.body;
    const update={cum_objetivo,cum_pondera,cum_nivel,cum_ind1,cum_ind2,cum_min1,cum_sat1,cum_sobre1,cum_min2,cum_sat2,cum_sobre2,cum_evide,cum_idCol};
    await pool.query('update egd_objcolaborador set ? where cum_id = ?', [update,cum_id]);
    res.redirect('/links/cumpliregis');
});



module.exports=router;