const {validationResult} = require('express-validator');
const mainController = {
    home: (req,res)=>{
        res.render('pages/home.ejs');
    },
    noticiaVista: (req,res)=>{
        res.render('pages/noticiaVista.ejs');
    },
    tournament: (req,res)=>{
        res.render('pages/torneo.ejs');
    },
    teams: (req,res)=>{
        res.render('pages/teams.ejs');
    },
    fixture: (req,res)=>{
        res.render('pages/fixture.ejs');
    },
    login: (req,res)=>{
        res.render('pages/login.ejs');
    },
    loginProcess: (req,res)=>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render("pages/login.ejs",{errors:errors.mapped(), oldData: req.body})
        }
        res.send("aprobado")
    },
    register: (req,res)=>{
        res.render('pages/register.ejs');
    },
    registerProcess: (req,res)=>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render("pages/register.ejs",{errors:errors.mapped(), oldData: req.body})
        }
    },
    perfil: (req,res)=>{
        res.render('user/perfil.ejs');
    }
}

module.exports = mainController;