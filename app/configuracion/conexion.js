//SOLO CONEXION
const mongoose = require('mongoose'); //importar mongoose para la conexion a la bdd
const CONFIG = require('../configuracion/config');//Importar el archivo de nuestra configuracion 

module.exports={ //dentro de un objeto crear la conexion 
     connection : null, //Conexion nula
     connect: function(){//Validar
        if(this.connection) return this.connection
        return mongoose.connect(CONFIG.BD).then(conexion =>{        //.then permite trabajar como promesa|| Funcion flecha sirve para ejecutar de manera imediata
            this.connection = conexion;                            //Asignar una nueva coleccion y cuando se crea se trae nula. || this.connection = conexion;
            console.log('La conexion se realizo correctamente');
        }).catch(error => console.log(error));                     //Si existe algun error el catch lo cachara y mandara un error si es que sucede 
      } 
}