const mongoose = require('mongoose');

var fecha = new Date();
//var dat= new Date(); 
//var dat2 = Date.parse(dat);

const RefrescoSchema = new mongoose.Schema({
    codigo:{
        type: Number,
        required:true
    },
    nombre:{
        type: String,
        required:true
    },
    descripcion:{
        type: String,
        required:true
    },
    precio:{
        type: Number,
        required:true
    },
    fechaRegistro:{
        type: Date,
        require:Date.now
        
    }
})

const Refresco = mongoose.model('Refresco', RefrescoSchema); //Exportar el esquema como modelo

module.exports = Refresco; 