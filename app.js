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
app.use(methodOverride('_method'));

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
const routesNews = require('./src/routes/newsRoutes');
const routesTeam = require('./src/routes/teamRoutes');
const routesProfile = require('./src/routes/profileRoutes');
const routesRegister = require('./src/routes/registerRoutes');
const routesInstall = require('./src/views/install/installRoutes');
app.use('/',routesMain);
app.use('/teams',routesTeam);
app.use('/news',routesNews);
app.use('/admin',routesAdm);
app.use('/profile',routesProfile);
app.use('/register',routesRegister);
app.use('/install',routesInstall)

app.listen(process.env.PORT || port, () => console.log(`Sevidor funcionando`));

