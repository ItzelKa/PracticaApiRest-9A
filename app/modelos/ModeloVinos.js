const mongoose = require('mongoose');

const VinoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required:true
    },
    codigo:{
        type: Number,
        required:true
    },
    precio:{
        type: Number,
        required:true
    },
    existencia:{
        type: Number,
        default:5
    }
})

const Vino = mongoose.model('Vino', VinoSchema); //Exportar el esquema como modelo

module.exports = Vino; 
