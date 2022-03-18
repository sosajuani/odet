const express = require('express');
const db = require('../database/models');

const User = db.User;
const News = db.News;

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
    tournament: (req,res)=>{
        res.render('admin/tournamentAdm.ejs')
    },
    tournamentIndividual: (req,res)=>{
        let torneoName = req.params.tournament;
        res.render('admin/tournamentIndividualAdm.ejs',{torneo:torneoName});
    },
    divisions: (req,res)=>{
        res.render('admin/divisionsAdm.ejs')
    },
    info: (req,res)=>{
        res.render('admin/infoAdm.ejs')
    }
}

module.exports = adminController;