// const express = require('express');
const db = require('../../database/models');
const {validationResult} = require('express-validator');

const User = db.User;
const News = db.News;
const Tournament = db.Tournament;
const Team = db.Team;
const Division = db.Division;
const TypeTournament = db.TypeTournament;
const Ascent = db.Ascent;
const Decline = db.Decline;
const DivisionControl = db.DivisionControl;
const MatchWeek = db.Matchweek;
const Statistic = db.Statistic;

const teamsController = {
    home: async(req,res)=>{
        const consultTournament = await Tournament.findAll();
        const consultFirstTournament = await Tournament.findAll();
        const consultDivision = await Division.findAll({
            where:{
                tournamentId: consultFirstTournament.shift().id
            }
        });
        const countTeams = await Team.count()
        let pages;
        let pagesCount=0;
        const limit= 10;
        if(countTeams > limit){
            pages = true;
            pagesCount = countTeams / 10
        }else{
            pages = false
        }
        let consultTeams;
        let pageQuery = parseInt(req.query.page);
        const pageSize = 10
        let offset;
        if(pageQuery){
            pageQuery > pagesCount ? res.redirect("/admin/teams") : null
            offset= (pageQuery - 1)* pageSize
            consultTeams = await Team.findAll({
                limit: 10,  
                offset: offset
            })
        }else{
            consultTeams = await Team.findAll({
                limit: 10
            })
        }
        //console.log(countTeams);
        res.render("admin/teams/teamsAdm.ejs",{consultTournament,consultDivision,consultTeams,pages,pagesCount})
    }
}

module.exports = teamsController;