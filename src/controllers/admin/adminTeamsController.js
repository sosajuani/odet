// const express = require('express');
const db = require('../../database/models');
const {validationResult} = require('express-validator');
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs")

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
const Avatar = db.Avatar;

const teamsController = {
    home: async(req,res)=>{
        const consultTournament = await Tournament.findAll();
        const firstDivisionTour = await Division.findAll({
            where:{
                tournamentId: consultTournament[0].id
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
        const firstDivisionTour = await Division.findAll({
            where:{
                tournamentId: consultTournament[0].id
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
        const firstDivisionTour = await Division.findAll({
            where:{
                tournamentId: consultTournament[0].id
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
        const consultTournament = await Tournament.findAll()
        const consultDivision = await Division.findAll({
            where:{
                tournamentId: consultTournament[0].id
            }
        })
        res.render("admin/teams/newTeam.ejs",{consultTournament,consultDivision})
    },
    createProcess: async(req,res)=>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            //delete archive
            if(req.file){
                fs.unlinkSync(path.resolve(__dirname,"../../../public/img/teams/"+req.file.filename))
            }
            consultTournament = await Tournament.findAll()
            consultDivision = await Division.findAll({
                where:{
                    tournamentId: consultTournament[0].id
                }
            })
            return res.render("admin/teams/newTeam.ejs",{consultTournament,consultDivision,errors:errors.mapped(), oldData:req.body})
        }
        let avatarNew
        if(req.file){
            avatarNew = await Avatar.create({
                image: req.file.filename
            })
        }
        const teamCreate = await Team.create({
            name: req.body.name,
            avatarId: req.file ? avatarNew.id : 1,
            captainId: null,
            tournamentId: req.body.tournamentId,
            divisionId: req.body.divisionId
        })
        await Statistic.create({
            teamId: teamCreate.id,
            played: 0,
            win: 0,
            drawn:0,
            lost:0,
            gf:0,
            ga:0,
            gd:0,
            pts:0,
            tournamentId: req.body.tournamentId,
            divisionId: req.body.divisionId
        })
        return res.redirect('/admin/teams')
    },
    edit: async(req,res)=>{
        const id = req.params.id
        const teamConsult = await Team.findByPk(id,{
            include: ['tournaments','divisions','avatars']
        })
        teamConsult === null ? res.render("errors/errorConsult.ejs",{err: "team"}) : null
        
        if(teamConsult !== null){
            const consultTournament = await Tournament.findAll()
            const consultDivision = await Division.findAll({
                where:{
                    tournamentId: teamConsult.tournaments.id
                }
            })
            return res.render("admin/teams/editTeam.ejs",{consultTournament,consultDivision,teamConsult})
        }
    },
    editProcess: async (req,res)=>{
        const id = req.params.id
        let errors = validationResult(req);
        const teamConsult = await Team.findByPk(id,{
            include: ['tournaments','divisions','avatars']
        })
        
        if(!errors.isEmpty()){
            //delete archive
            if(req.file){
                fs.unlinkSync(path.resolve(__dirname,"../../../public/img/teams/"+req.file.filename))
            }
            const consultTournament = await Tournament.findAll()
            const consultDivision = await Division.findAll({
                where:{
                    tournamentId: teamConsult.tournaments.id
                }
            })
            return res.render("admin/teams/editTeam.ejs",{consultTournament,consultDivision,teamConsult,errors:errors.mapped(), oldData:req.body})
        }
        const oldAvatar = teamConsult.avatarId
        let avatarNew
        if(req.file){
            //delete old avatar and reg
            fs.unlinkSync(path.resolve(__dirname,"../../../public/img/teams/"+teamConsult.avatars.image))
            avatarNew = await Avatar.create({
                image: req.file.filename
            })
        }
        await Team.update({
            name: req.body.name,
            avatarId: req.file ? avatarNew.id : oldAvatar,
            captainId: null,
            tournamentId: req.body.tournamentId,
            divisionId: req.body.divisionId
        },{
            where:{id}
        })
        //delete old reg
        req.file ? await Avatar.destroy({where:{id:oldAvatar}}) : null
        res.redirect('/admin/teams/')
    }
}

module.exports = teamsController;