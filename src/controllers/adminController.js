const express = require('express');

const adminController = {
    home: (req,res)=>{
        res.render('admin/indexAdm.ejs')
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
    divisions: (req,res)=>{
        res.render('admin/divisionsAdm.ejs')
    },
    info: (req,res)=>{
        res.render('admin/infoAdm.ejs')
    }
}

module.exports = adminController;