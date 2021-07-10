const app = require('./app/app');
const CONFIG = require('./app/configuracion/config');
const morgan = require('morgan');
const conexion = require('./app/configuracion/conexion');


conexion.connect(); 
app.use(morgan('dev'));

//Ejecutar el servidor DE EXPRESS 
app.listen(CONFIG.PORT,function(erro){
    if(erro) returnconsole.log(error);
    console.log(`Servidor en el puerto ${CONFIG.PORT}`);
});

