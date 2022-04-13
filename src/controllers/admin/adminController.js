// const express = require('express');
const db = require('../../database/models');

const User = db.User;
const News = db.News;
const Tournament = db.Tournament;
const Team = db.Team;
const Division = db.Division;
const TypeTournament = db.TypeTournament;
const Ascent = db.Ascent;
const Decline = db.Decline;
const DivisionControl = db.DivisionControl;

const adminController = {
    home: (req,res)=>{
        User.findOne({
            where:{
                id: req.session.user.id
            }
        })
        .then(resolve => res.render('admin/indexAdm.ejs',{user:resolve}))
        .catch(e => console.log(e))
    },
    news: (req,res)=>{
        News.findAll()
        .then(news => res.render('admin/newsAdm.ejs',{news}))
        .catch(e => console.log(e))
        
    },
    newsCreate: (req,res)=>{
        res.render('admin/crud/newsCreate.ejs')
    },
    newsCreateProcess: (req,res)=>{
        News.create({
            title: req.body.title,
            body: req.body.body,
            authorId: req.session.user.id,
            image: null,
            date:Date('Y')
        })
        .then(r => res.redirect('/admin/news'))
    },
    newsEdit: async(req,res)=>{
        let newsConsult = await News.findOne({where:{id:req.params.id}});
        if(newsConsult === null){
            return res.redirect('/admin/news')
        }

        res.render('admin/crud/editCreate.ejs',{newsConsult})
    },
    newsEditProcess: (req,res)=>{
        News.update(
            {
            title: req.body.title,
            body: req.body.body,
            image: null,
            },{where:{id: req.params.id}}
        );
        res.redirect('/admin/news')
    },
    newsDelete:(req,res)=>{
        News.destroy({where:{id:req.params.id}})
        .then(r => res.redirect('/admin/news'))
    },
    config: (req,res)=>{
        res.render('admin/configAdm.ejs')
    },
    players: (req,res)=>{
        res.render('admin/playersAdm.ejs')
    },
    teams: (req,res)=>{
        res.render('admin/teamsAdm.ejs')
    },
    roles: (req,res)=>{
        res.render('admin/rolesAdm.ejs')
    },
    divisions: async(req,res)=>{
        divisionControlConsult = await DivisionControl.findAll({include:['tournaments']})
        res.render('admin/divisions/divisionsAdm.ejs',{divisionControlConsult})
    },
    divisionsNew: async(req,res)=>{
        consultTournament = await DivisionControl.findAll({
            where: {tournamentCompleted:0},
            include: ['tournaments']
        })
        //console.log(consultTournament[0].tournaments);
        res.render('admin/divisions/newDivisionAdm.ejs',{consultTournament})
    },
    divisionsNewProcess: async(req,res)=>{
        const tournamentId = req.body.tournament
        const tournamentConsult = await Tournament.findByPk(tournamentId);
        const divisionControlConsult = await DivisionControl.findOne({ where:{ tournamentId: tournamentId}})

        if(divisionControlConsult.divisionsCreated == tournamentConsult.divisions){
            console.log("maximo de divisiones alcanzado");
        }else{
            console.log("faltan crear "+parseInt(tournamentConsult.divisions - divisionControlConsult.divisionsCreated));
        }
        await Division.create({
            name: req.body.name,
            tournamentId: tournamentId
        })
        let divisionCount = parseInt(divisionControlConsult.divisionsCreated + 1)
        await DivisionControl.update({
            divisionsCreated: divisionCount,
            tournamentCompleted: divisionCount === parseInt(tournamentConsult.divisions) ? 1 : 0
        },{where: {tournamentId:tournamentId}})
        res.redirect('/admin/divisions')
    },  
    divisionDetail: async(req,res)=>{
        const consultDivision = await Division.findAll({
            where:{tournamentId:req.params.id},
            include: ['tournaments']
        })
        res.render('admin/divisions/divisionDetail.ejs',{consultDivision})
    },
    info: (req,res)=>{
        res.render('admin/infoAdm.ejs')
    }
}

module.exports = adminController;