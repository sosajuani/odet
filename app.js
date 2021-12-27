const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path');
const port = 3030;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const methodOverride = require("method-override");

//Motor de plantillas
app.set('views engine','ejs');
app.set('views',path.resolve(__dirname,'src/views'));

//Procesar formularios
app.use(express.urlencoded({extended:false}))

//ruta estatica
app.use(express.static('src/public'));

//Cookie parser
app.use(cookieParser());

//usar method override
app.use(methodOverride('__method'));

//Sesiones
app.use(session({
    secret: 'Tu clave secreta',
    resave: false,
    saveUninitialized: true
}));


//requiero rutas
const rutasMain = require('./src/routes/mainRoutes');
const rutasAdm = require('./src/routes/adminRoutes/adminRoutes');
const rutasNoticias = require('./src/routes/noticiasRoutes');
app.use('/',rutasMain);
app.use('/noticia',rutasNoticias);
app.use('/admin',rutasAdm);

app.listen(port, () => console.log(`Sevidor en http://localhost:3030/`));

