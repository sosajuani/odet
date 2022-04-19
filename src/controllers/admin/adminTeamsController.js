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
        const countTeams = await Team.count()
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
        res.render("admin/teams/teamsAdm.ejs",{consultTeams,pages,pagesCount,pageQuery,query})
    },
    search: async(req,res)=>{
        let query = req.query.name
        console.log(query);
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
        res.render("admin/teams/filterName.ejs",{consultTeams,pages,pagesCount,pageQuery,query})
    },
    create: (req,res)=>{
        res.render("admin/teams/newTeam.ejs")
    }
}

module.exports = teamsController;