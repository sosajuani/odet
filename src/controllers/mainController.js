const {validationResult} = require('express-validator');
const {compareSync, hashSync} = require('bcryptjs');
const db = require('../database/models');
const User = db.User;
const News = db.News;

const mainController = {
    home: (req,res)=>{
        News.findAll()
        .then(news => res.render('pages/home.ejs',{news}))
        .catch(e => console.log(e))
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
    loginProcess: async(req,res)=>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render("pages/login.ejs",{errors:errors.mapped(), oldData: req.body})
        }
        let userConsult = await User.findOne({where:{user:req.body.user}});
        if(userConsult === null){
            return res.render('pages/login.ejs',{errors:{userNull:"El usuario no existe"},oldData:req.body})
        }
        let confirmPass = compareSync(req.body.pass,userConsult.pass);
        if(!confirmPass){
            return res.render('pages/login.ejs',{errors:{passIncorrect: "La contraseña ingresada no es válida"},oldData:req.body})
        }
        req.session.user = userConsult.dataValues
        req.session.access = userConsult.dataValues.rolId
        res.redirect("/login")
    },
    logout: (req,res)=>{
        delete req.session.user
        delete req.session.access
        res.redirect('/login')
    },
    register: (req,res)=>{
        res.render('pages/register.ejs');
    },
    registerProcess: (req,res)=>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render("pages/register.ejs",{errors:errors.mapped(), oldData: req.body})
        }
        res.send("sin errores")
    }
}

module.exports = mainController;