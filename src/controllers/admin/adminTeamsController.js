// const express = require('express');
const db = require('../../database/models');
const {validationResult} = require('express-validator');
const { Op } = require("sequelize");

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
        const firstTournamentConsult = await Tournament.findAll();
        const firstTournament = firstTournamentConsult.shift();
        const firstDivisionTour = await Division.findAll({
            where:{
                tournamentId: firstTournament.id
            }
        })
        const countTeams = await Team.count();
        let pages;
        let pagesCount=0;
        const limit= 10;
        if(countTeams > limit){
            pages = true;
            pagesCount = Math.ceil(countTeams / 10)
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
        let query = null
        res.render("admin/teams/teamsAdm.ejs",{consultTeams,pages,pagesCount,pageQuery,query,consultTournament,firstDivisionTour})
    },
    search: async(req,res)=>{
        let query = req.query.name
        const consultTournament = await Tournament.findAll();
        const firstTournamentConsult = await Tournament.findAll();
        const firstTournament = firstTournamentConsult.shift();
        const firstDivisionTour = await Division.findAll({
            where:{
                tournamentId: firstTournament.id
            }
        })

        !query ? res.redirect('/admin/teams') : null

        const countTeams = await Team.count({
            where:{
                name: { [Op.like]: `%${query}%` }
            }
        })
        let pages;
        let pagesCount=0;
        const limit= 10;
        if(countTeams > limit){
            pages = true;
            pagesCount = Math.ceil(countTeams / 10)
        }else{
            pages = false
        }
        let consultTeams;
        let pageQuery = parseInt(req.query.page);
        const pageSize = 10
        let offset;
        if(pageQuery){
            pageQuery > pagesCount ? res.redirect("/admin/teams/search?name="+query) : null
            offset= (pageQuery - 1)* pageSize
            consultTeams = await Team.findAll({
                limit: 10,  
                offset: offset,
                where:{
                    name: { [Op.like]: `%${query}%` }
                }
            })
        }else{
            consultTeams = await Team.findAll({
                limit: 10,
                where:{
                    name: { [Op.like]: `%${query}%` }
                }
            })
        }
        return res.render("admin/teams/filterName.ejs",{consultTeams,pages,pagesCount,pageQuery,query,consultTournament,firstDivisionTour})
    },
    searchDivTour: async(req,res)=>{
        const divId = req.query.divisionSelect;
        const tournamentId = req.query.tournamentSelect;
        const consultTournament = await Tournament.findAll();
        const firstTournamentConsult = await Tournament.findAll();
        const firstTournament = firstTournamentConsult.shift();
        const firstDivisionTour = await Division.findAll({
            where:{
                tournamentId: firstTournament.id
            }
        })
        const countTeams = await Team.count({
            where:{
                tournamentId: tournamentId,
                divisionId: divId
            }
        })
        let pages;
        let pagesCount=0;
        const limit= 10;
        if(countTeams > limit){
            pages = true;
            pagesCount = Math.ceil(countTeams / 10)
        }else{
            pages = false
        }
        let consultTeams;
        let offset;
        let query;
        let pageQuery = parseInt(req.query.page);
        const pageSize = 10
        if(pageQuery){
            pageQuery > pagesCount ? res.redirect(`/admin/teams/search/div?tournamentSelect=${tournamentId}&divisionSelect=${divId}`) : null
            offset= (pageQuery - 1)* pageSize
            consultTeams = await Team.findAll({
                limit: 10,  
                offset: offset,
                where:{
                    tournamentId: tournamentId,
                    divisionId: divId
                }
            })
        }else{
            consultTeams = await Team.findAll({
                limit: 10,
                where:{
                    tournamentId: tournamentId,
                    divisionId: divId
                }
            })
        }
        return res.render("admin/teams/filterDivTour.ejs",{consultTeams,pages,pagesCount,pageQuery,consultTournament,firstDivisionTour,query,tournamentId,divId})
    },
    create: async(req,res)=>{
        consultTournament = await Tournament.findAll()
        consultDivision = await Division.findAll({
            where:{
                tournamentId: consultTournament[0].id
            }
        })
        res.render("admin/teams/newTeam.ejs",{consultTournament,consultDivision})
    }
}

module.exports = teamsController;