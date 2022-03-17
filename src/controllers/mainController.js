const {validationResult} = require('express-validator');
const {compareSync, hashSync} = require('bcryptjs');
const db = require('../database/models');
const User = db.User;

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
    loginProcess: async(req,res)=>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render("pages/login.ejs",{errors:errors.mapped(), oldData: req.body})
        }
        let userConsult = await User.findOne();
        if(userConsult === null){
            return res.render('pages/login.ejs',{errors:{userNull:"El usuario no existe"},oldData:req.body})
        }
        let confirmPass = compareSync(req.body.pass,userConsult.pass);
        if(!confirmPass){
            return res.render('pages/login.ejs',{errors:{passIncorrect: "La contraseña ingresada no es válida"},oldData:req.body})
        }
        console.log("*******************************");
        console.log("*******************************");
        console.log("*******************************");
        console.log("*******************************");
        console.log("*******************************");
        console.log(userConsult);
        console.log("*******************************");
        console.log("*******************************");
        console.log("*******************************");
        console.log("*******************************");
        console.log("*******************************");
        console.log("*******************************");
        res.redirect("/login")
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
    },
    perfil: (req,res)=>{
        res.render('user/perfil.ejs');
    }
}

module.exports = mainController;