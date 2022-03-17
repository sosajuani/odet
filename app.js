const express = require('express');
const app = express();
const path = require('path');
const port = 3030;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const accessMiddleware = require('./src/middleware/accessMiddleware')
const methodOverride = require("method-override");

//Motor de plantillas
app.set('views engine','ejs');
app.set('views',path.resolve(__dirname,'src/views'));

//Procesar formularios
app.use(express.urlencoded({extended:false}))

//ruta estatica
app.use(express.static('public'));

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
//middlewareSession
app.use(accessMiddleware)


//requiero rutas
const routesMain = require('./src/routes/mainRoutes');
const routesAdm = require('./src/routes/adminRoutes/adminRoutes');
const routesNoticias = require('./src/routes/noticiasRoutes');
const routesTeam = require('./src/routes/teamRoutes');
const routesInstall = require('./src/views/install/installRoutes');
app.use('/',routesMain);
app.use('/teams',routesTeam);
app.use('/noticia',routesNoticias);
app.use('/admin',routesAdm);
app.use('/install',routesInstall)

app.listen(port, () => console.log(`Sevidor en http://localhost:3030/`));

