const {validationResult} = require('express-validator');
const {compareSync, hashSync} = require('bcryptjs');
const db = require('../database/models');
const User = db.User;
const Player = db.Player;
const News = db.News;
const Tournament = db.Tournament;
const Division = db.Division;
const Statistic = db.Statistic;
const Banner = db.Banner;
const Sponsor = db.Sponsor;
const MatchWeek = db.Matchweek;
const Team = db.Team;

const mainController = {
    home: async(req,res)=>{
        const bannersConsult = await Banner.findAll({
            where:{
                active: 1
            }
        });
        const sponsorConsult = await Sponsor.findAll({
            where:{
                active:1
            }
        })
        res.render('userViews/pages/home/home.ejs',{bannersConsult,sponsorConsult});

    },
    noticiaVista: (req,res)=>{
        res.render('pages/noticiaVista.ejs');
    },
    tournament: async(req,res)=>{
        const tournamentConsult = await Tournament.findAll({include: [{association:'Divisions'}]});
        const divisionConsult = await Division.findAll({
            where:{
                tournamentId: tournamentConsult[0].id
            }
        });
        let errorConsult = false;
        if(tournamentConsult.length === 0 || divisionConsult.length === 0 || divisionConsult.length !== 0 && tournamentConsult.length === 0 || divisionConsult.length === 0 && tournamentConsult.length !== 0){
            errorConsult = true;
        }
        const statisticsConsult = await Statistic.findAll({
            where:{
                tournamentId: tournamentConsult[0].id,
                divisionId: divisionConsult[0].id
            },
            include: ['divisions','teams']
        })
        let divisionEmpty
        const tournamentId = tournamentConsult[0].id;
        const divisionId = divisionConsult[0].id;
        statisticsConsult.length === 0 ? divisionEmpty = true : divisionEmpty= false

        res.render('userViews/pages/tournament/tournamentMain.ejs',{errorConsult,tournamentConsult,divisionConsult,statisticsConsult,tournamentId,divisionEmpty,divisionId})
    },
    tournamentFilter: async(req,res)=>{
        const tournamentId = req.body.tournamentId;
        const divisionId = req.body.divisionId;
        const tournamentConsult = await Tournament.findAll();
        const divisionConsult = await Division.findAll({
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
                order:[['pts','DESC'],['gf','DESC']],
                include: ['divisions','teams']
        })
        statisticsConsult.length === 0 ? divisionEmpty = true : divisionEmpty= false
        return res.render('userViews/pages/tournament/tournamentFilter.ejs',{errorConsult,tournamentConsult,divisionConsult,statisticsConsult,divisionEmpty,tournamentId,divisionId});
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
        const tournamentConsult = await Tournament.findAll({include: [{association:'Divisions'}]});
        tournamentConsult.length == 0 ? res.render('errors/404.ejs',{pageVersion: 'user',errorMsg: 'No hay torneos registrados en la base de datos',redirect:''}) : null
        const divisionConsult = await Division.findAll({
            where: {
                tournamentId: tournamentConsult[0].id
            }
        })
        const tournamentId = tournamentConsult[0];
        const divisionId = divisionConsult[0];
        const matchWeekConsult = await MatchWeek.findAll({
            where:{
                tournamentId: tournamentId.id,
                divisionId: divisionId.id,
                journey: 1,
            },
            include: [{association:'localTeam',include:['avatars']},{association:'visitedTeam',include:['avatars']}]
        });
        const teamsConsult = await Team.findAll({
            where:{
                tournamentId: tournamentId.id,
                divisionId: divisionId.id
            }
        })
        res.render('userViews/pages/fixture/fixture.ejs',{
            tournamentConsult,
            divisionConsult,
            tournamentId,
            divisionId,
            matchWeekConsult,
            teamsConsult
        });
    },
    fixtureFilter: async(req,res)=>{
        const tournamentId = req.query.tournamentId;
        const divisionId = req.query.divisionId;
        const journey = req.query.journey ? req.query.journey : 1;
        const tournamentConsult = await Tournament.findAll();
        let matchWeekConsult;
        tournamentConsult.length == 0 ? res.render('errors/404.ejs',{pageVersion: 'user',errorMsg: 'No hay torneos registrados en la base de datos',redirect:''}) : null
        const divisionConsult = await Division.findAll({
            where: {
                tournamentId: tournamentId
            }
        })
        const teamsConsult = await Team.findAll({
            where:{
                tournamentId: tournamentId,
                divisionId: divisionId
            }
        });
        if(req.query.journey == "all"){
            matchWeekConsult = await MatchWeek.findAll({
                where:{
                    tournamentId: tournamentId,
                    divisionId: divisionId,
                },
                include: [{association:'localTeam',include:['avatars']},{association:'visitedTeam',include:['avatars']}]
            });
        }else{
            matchWeekConsult = await MatchWeek.findAll({
                where:{
                    tournamentId: tournamentId,
                    divisionId: divisionId,
                    journey: journey,
                },
                include: [{association:'localTeam',include:['avatars']},{association:'visitedTeam',include:['avatars']}]
            });
        }
        res.render('userViews/pages/fixture/fixture.ejs',{
            tournamentConsult,
            divisionConsult,
            tournamentId,
            divisionId,
            matchWeekConsult,
            teamsConsult,
            journey
        });
    },
    login: (req,res)=>{
        res.render('userViews/pages/login/login.ejs');
    },
    loginProcess: async(req,res)=>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('userViews/pages/login/login.ejs',{errors:errors.mapped(), oldData: req.body})
        
        }
        const userConsult = await User.findOne({where:{user:req.body.user}});
        if(userConsult === null){
            return res.render('userViews/pages/login/login.ejs',{errors:{userNull:'El usuario no existe'},oldData:req.body})
        }
         let confirmPass = compareSync(req.body.pass,userConsult.pass);
        if(!confirmPass){
            return res.render('userViews/pages/login/login.ejs',{errors:{passIncorrect: 'La contraseña ingresada no es válida'},oldData:req.body})
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
    }
}

module.exports = mainController;