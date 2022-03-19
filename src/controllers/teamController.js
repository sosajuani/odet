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
    teamsDetail: (req,res)=>{
        res.render('pages/teams/teamsDetail.ejs')
    }
}
module.exports = teamController;