const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path')
const port = 3030;


//Motor de plantillas
app.set('views engine','ejs');
app.set('views',path.resolve(__dirname,'src/views'));

//ruta estatica
app.use(express.static('src/public'));

//requiero rutas
const rutasMain = require('./src/routes/mainRoutes');
const rutasAdm = require('./src/routes/adminRoutes/adminRoutes');
const rutasNoticias = require('./src/routes/noticiasRoutes');
app.use('/',rutasMain);
app.use('/noticia',rutasNoticias);
app.use('/admin',rutasAdm);

app.listen(port, () => console.log(`Sevidor en http://localhost:3030/`));

