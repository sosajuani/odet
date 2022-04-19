const {validationResult} = require('express-validator');
const {compareSync, hashSync} = require('bcryptjs');
const db = require('../database/models');
const User = db.User;
const Player = db.Player;
const News = db.News;
const Tournament = db.Tournament;
const Division = db.Division;
const Statistic = db.Statistic;

const mainController = {
    home: (req,res)=>{
        News.findAll()
        .then(news => res.render('pages/home.ejs',{news}))
        .catch(e => console.log(e))
    },
    noticiaVista: (req,res)=>{
        res.render('pages/noticiaVista.ejs');
    },
    tournament: async(req,res)=>{
        let tournamentConsult = await Tournament.findAll();
        let firstTournamentConsult = await Tournament.findAll({include: [{association:'Divisions'}]})
        const firstTournament = firstTournamentConsult.shift()
        let divisionConsult = await Division.findAll({
            where:{
                tournamentId: firstTournament.id
            }
        });
        let firstDivisionConsult = await Division.findAll({
            where:{
                tournamentId: firstTournament.id
            }
        });
        const firstDivision = firstDivisionConsult.shift()
        let errorConsult = false;
        if(tournamentConsult.length === 0 || divisionConsult.length === 0 || divisionConsult.length !== 0 && tournamentConsult.length === 0 || divisionConsult.length === 0 && tournamentConsult.length !== 0){
            errorConsult = true;
        }
        let statisticsConsult = await Statistic.findAll({
            where:{
                tournamentId: firstTournament.id,
                divisionId: firstDivision.id
            },
            include: ['divisions','teams']
        })
        let divisionEmpty
        const tournamentId = firstTournament.id
        statisticsConsult.length === 0 ? divisionEmpty = true : divisionEmpty= false
        res.render('pages/tournaments/tournament.ejs',{errorConsult,tournamentConsult,divisionConsult,statisticsConsult,tournamentId,divisionEmpty});
    },
    tournamentFilter: async(req,res)=>{
        const tournamentId = req.body.tournamentId;
        const divisionId = req.body.divisionId;
        let tournamentConsult = await Tournament.findAll();
        let divisionConsult = await Division.findAll({
            where:{
                tournamentId: tournamentId
            }
        });
        let errorConsult = false;
        if(tournamentConsult.length === 0 || divisionConsult.length === 0 || divisionConsult.length !== 0 && tournamentConsult.length === 0 || divisionConsult.length === 0 && tournamentConsult.length !== 0){
            errorConsult = true;
        }
        let divisionEmpty; 
        let statisticsConsult = await Statistic.findAll({
                where:{
                    tournamentId: tournamentId,
                    divisionId: divisionId
                },
                include: ['divisions','teams']
        })
        statisticsConsult.length === 0 ? divisionEmpty = true : divisionEmpty= false
        return res.render('pages/tournaments/filterTournamentSearch.ejs',{errorConsult,tournamentConsult,divisionConsult,statisticsConsult,divisionEmpty,tournamentId});
    },
    apiTournamentChange: async(req,res)=>{
        const tournamentId = req.params.id
        const consultDivision = await Division.findAll({
            where: { tournamentId}
        })
        let response = {
            meta: {
                status: 200,
                url: '/tournament/api/change/'+tournamentId
            },
            divisions:{
                data: []
            }
        }
        consultDivision.forEach(division => {
            response.divisions.data.push({
                id: division.id,
                name: division.name,
                tournamentId: tournamentId
            })
            return division;
        });
        return res.json(response)
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
        
        if(userConsult.rolId == 2){
            let playerConsult = await Player.findOne({where:{userId:userConsult.id}});
            req.session.playerSession = playerConsult.dataValues;
            if(playerConsult.teamId == null){
                return res.redirect('/register/more');
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
            //console.log(consulta.bestPlayer1.players.teams);
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