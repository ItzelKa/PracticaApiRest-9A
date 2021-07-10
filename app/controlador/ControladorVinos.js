const { Model } = require('mongoose');
const ModeloVinos = require('../modelos/ModeloVinos');

//Funcion de index para solicitar informacion requerida
function index(req,res) {
    console.log('ok');
    ModeloVinos.find({})
    .then(vinos => {
        if(vinos.length) return res.status(200).send({vinos});//si tiene informacion regresamos un status 200
        return res.status(204).send({message: 'No hay datos que mostrar'});
    }).catch(error => res.status(500).send({error})); //En caso de no tener ninguna de las otras opciones mandamos un error 500 con un catch
}

function crear(req,res){
    console.log(req.body);
    new ModeloVinos(req.body).save()
    .then(vinos => res.status(200).send({vinos}))
    .catch(error => res.status(500).send({error}));
}

function buscar(req,res,next){
     let consulta = {};
     consulta[req.params.key]=req.params.value;
     ModeloVinos.find(consulta).then(vinos =>{ //
         if(!vinos.length) return next();
         req.body.vinos = vinos; //se ira guardando todo a la variable vinos
         return next();//Esto es en caso de que no tenga 
     }).catch(error => {
         res.body.error=error;
        next();
     })
    }

function mostrar(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.vinos) return res.status(404).send({message: 'No se encontro el producto'});
    let vinos = req.body.vinos;
    return res.status(200).send({vinos});
}

function actualizar(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.vinos) return res.status(404).send({message: 'No se puede actualizar el registro'});
  let vinoObj = req.body.vinos[0]; //validad que el objeto que encuentre este en la posicion 0
  vinoObj= Object.assign(vinoObj,req.body);//comparar lo que venga diferente---la variable se convertira en la asignacion que traera lo del objeto
  vinoObj.save().then(vinosAlta =>{
      res.status(200).send({menssage: 'El registro se actualizo correctamente',vinosAlta});
  }).catch(error => res.status(500).send({error}));
}

function eliminar(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.vinos) return res.status(404).send({message:'No se puede eliminar el registro'});
    req.body.vinos[0].remove().then(vinosEliminar => {
        res.status(200).send({message:'El registro se elimino correctamente',vinosEliminar});
    }).catch(error => res.status(500).send({error})); //preveenir eliminar todos los registros

}


//200 - todo bien
//204 - no hay contenido
//404 - error
//500 - error de servidor

module.exports={
    index,
    crear,
    buscar,
    mostrar,
    actualizar,
    eliminar
}
