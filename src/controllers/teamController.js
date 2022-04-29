let db = require('../database/models')
const Team = db.Team;
const Tournament = db.Tournament;
const Division = db.Division;

const teamController = {
    teams: async(req,res)=>{
        const tournamentConsult = await Tournament.findAll();
        const countTeams = await Team.count();
        const divisionConsult = await Division.findAll();
        const tournamentId = null;
        const divisionId = null;
        
        let pages;
        let pagesCount=0;
        const limit= 20;
        if(countTeams > limit){
            pages = true;
            pagesCount = Math.ceil(countTeams / limit)
        }else{
            pages = false
        }
        let teamsConsult;
        let pageQuery = parseInt(req.query.page);
        let offset;
        if(pageQuery){
            pageQuery > pagesCount ? res.redirect("/teams") : null
            offset= (pageQuery - 1)* limit
            teamsConsult = await Team.findAll({
                limit: limit,  
                offset: offset,
                include: ['avatars']
            })
        }else{
            teamsConsult = await Team.findAll({
                limit: limit,
                include: ['avatars']
            })
        }
        
        res.render('userViews/pages/teams/teamsMain.ejs',{teamsConsult,pages,pagesCount,pageQuery,tournamentConsult,divisionConsult,tournamentId,divisionId});
    },
    teamsFilter: async(req,res)=>{
        const tournamentId = req.query.tournamentId;
        const divisionId = req.query.divisionId;
        
        const tournamentConsult = await Tournament.findAll();
        const divisionConsult = await Division.findAll();        
        // const countTeams = await Team.count({
        //     where: {tournamentId,divisionId}
        // });
        // let pages;
        // let pagesCount=0;
        // const limit= 20;
        // if(countTeams > limit){
        //     pages = true;
        //     pagesCount = Math.ceil(countTeams / limit)
        // }else{
        //     pages = false
        // }
        // let teamsConsult;
        // let pageQuery = parseInt(req.query.page);
        // let offset;
        // if(pageQuery){
        //     pageQuery > pagesCount ? res.redirect("/teams") : null
        //     offset= (pageQuery - 1)* limit
        //     teamsConsult = await Team.findAll({
        //         limit: limit,  
        //         offset: offset,
        //         include: ['avatars']
        //     })
        // }else{
        //     teamsConsult = await Team.findAll({
        //         limit: limit,
        //         include: ['avatars']
        //     })
        // }
        const teamsConsult = await Team.findAll({
            where: {
                tournamentId,
                divisionId
            },
            include: ['avatars']
        })
        res.render('userViews/pages/teams/teamsFilter.ejs',{teamsConsult,tournamentConsult,divisionConsult,tournamentId,divisionId});
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