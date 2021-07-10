module.exports={
    PORT: process.env.PORT || 8080, //El servidor asigna a un puerto y si no lo reconoce se cambia a una local
    BD: process.env.BD || 'mongodb://localhost:27017/appirest9a' //Exportar la informacion que esta en la ruta al local
}