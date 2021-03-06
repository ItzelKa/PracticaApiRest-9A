const { Model } = require('mongoose');
const ModeloRefrescos = require('../modelos/ModeloRefrescos');

//INDEX
function index(req,res) {
    console.log('ok');
    ModeloRefrescos.find({})
    .then(refrescos => {
        if(refrescos.length) return res.status(200).send({refrescos});//si tiene informacion regresamos un status 200
        return res.status(204).send({message: 'No hay datos que mostrar'});
    }).catch(error => res.status(500).send({error})); //En caso de no tener ninguna de las otras opciones mandamos un error 500 con un catch
}

function crear(req,res){
    console.log(req.body);
    new ModeloRefrescos(req.body).save()
    .then(refrescos => res.status(200).send({refrescos}))
    .catch(error => res.status(500).send({error}));
}

function buscar(req,res,next){
    let consulta = {};
    consulta[req.params.key]=req.params.value;
    ModeloRefrescos.find(consulta).then(refrescos =>{ //
        if(!refrescos.length) return next();
        req.body.refrescos = refrescos; //se ira guardando todo a la variable vinos
        return next();//Esto es en caso de que no tenga 
    }).catch(error => {
        res.body.error=error;
       next();
    })
   }

   function mostrar(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.refrescos) return res.status(404).send({message: 'No se encontro el producto'});
    let refrescos = req.body.refrescos;
    return res.status(200).send({refrescos});
}

function actualizar(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.refrescos) return res.status(404).send({message: 'No se puede actualizar el registro'});
    let refrescoObj = req.body.refrescos[0]; //validad que el objeto que encuentre este en la posicion 0
    refrescoObj= Object.assign(refrescoObj,req.body);//comparar lo que venga diferente---la variable se convertira en la asignacion que traera lo del objeto
    refrescoObj.save().then(refrescosAlta =>{
        res.status(200).send({menssage: 'El registro se actualizo correctamente',refrescosAlta});
    }).catch(error => res.status(500).send({error}));
  }

  function eliminar(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.refrescos) return res.status(404).send({message:'No se puede eliminar el registro'});
    req.body.refrescos[0].remove().then(refrescosEliminar => {
        res.status(200).send({message:'El registro se elimino correctamente',refrescosEliminar});
    }).catch(error => res.status(500).send({error})); //preveenir eliminar todos los registros

}
module.exports={
    index,
    crear,
    buscar,
    mostrar,
    actualizar,
    eliminar
}

