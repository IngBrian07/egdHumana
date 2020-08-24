const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Hola Mundito");
});

module.exports = router;