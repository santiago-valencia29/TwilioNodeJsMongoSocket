const { Router } = require('express');

 const router = Router();

 router.get('/',(req,res)=>{
     res.render('index') //llama el motor de plantilla
 })

 module.exports = router;