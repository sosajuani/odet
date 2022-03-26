let db = require('../database/models')
const Team = db.Team;
const Tournament = db.Tournament;
const Division = db.Division;

const teamController = {
    teams: async(req,res)=>{
        try{
            let tournamentConsult = await Tournament.findAll();
            let teamsConsult = await Team.findAll();
            let divisionConsult = await Division.findAll();
            res.render('pages/teams/teams.ejs',{teamsConsult,tournamentConsult,divisionConsult});
        }catch(e){
            console.log(e);
        }
    },
    teamsDetail: async(req,res)=>{
        let teamConsult = await Team.findByPk(req.params.id,{
            include: ['avatars','tournaments','divisions','users']
        })
        if(teamConsult == null){
            res.render('404.ejs');
        }else{
            res.render('pages/teams/teamsDetail.ejs',{teamConsult});
        }
    },
    teamsDetailPosition: async(req,res)=>{
        let teamConsult = await Team.findByPk(req.params.id,{
            include: ['avatars','tournaments','divisions','users']
        })
        if(teamConsult == null){
            res.render('404.ejs');
        }else{
            res.render('pages/teams/teamsDetailPosition.ejs',{teamConsult})
        }
    },
    teamsDetailPlayer: async(req,res)=>{
        let teamConsult = await Team.findByPk(req.params.id,{
            include: ['avatars','tournaments','divisions','users']
        })
        if(teamConsult == null){
            res.render('404.ejs');
        }else{
            res.render('pages/teams/teamsDetailPlayer.ejs',{teamConsult})
        }
    },
    teamsDetailMore: async(req,res)=>{
        let teamConsult = await Team.findByPk(req.params.id,{
            include: ['avatars','tournaments','divisions','users']
        })
        if(teamConsult == null){
            res.render('404.ejs');
        }else{
            
            res.render('pages/teams/teamsDetailMore.ejs',{teamConsult})
        }
    }
}
module.exports = teamController;