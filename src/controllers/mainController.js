const {validationResult} = require('express-validator');
const {compareSync, hashSync} = require('bcryptjs');
const db = require('../database/models');
const { send } = require('express/lib/response');
const User = db.User;
const Player = db.Player;
const News = db.News;
const Tournament = db.Tournament;
const Division = db.Division;

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
        res.render('pages/tournament.ejs');
    },
    fixture: async(req,res)=>{
        let tournamentConsult = await Tournament.findAll();
        let divisionConsult =  await Division.findAll()
        res.render('pages/fixture.ejs',{tournamentConsult,divisionConsult});
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
        req.session.user = userConsult.dataValues;
        req.session.access = userConsult.dataValues.rolId;
        
        if(userConsult.rolId !== 3){
            let playerConsult = await Player.findOne({where:{userId:userConsult.id}});
            req.session.playerSession = playerConsult.dataValues;
            if(playerConsult.teamId == null){
                res.redirect('/register/more');
            }
        }
        res.redirect('/')
    },
    logout: (req,res)=>{
        delete req.session.user
        delete req.session.access
        res.redirect('/login')
    },
    pruebas: async(req,res)=>{
        let consulta = await db.AwardStatistics.findOne({
            include:[
                {model: User,as: 'bestPlayer1',include:[{association:'players',include:['teams']}]},
                {model: User,as: 'bestScorer1'},
            ]
        },{where: {id:1}})
            console.log("##############");
            console.log("##############");
            console.log("##############");
            console.log("##############");
            console.log("##############");
            console.log("##############");
            console.log(consulta.bestPlayer1.players.teams);
            console.log("##############");
            console.log("##############");
            console.log("##############");
            console.log("##############");
            console.log("##############");
            console.log("##############");
        res.send("hola")
    }
}

module.exports = mainController;