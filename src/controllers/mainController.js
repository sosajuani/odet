const express = require('express');

const mainController = {
    home: (req,res)=>{
        res.render('pages/home.ejs');
    },
    noticiaVista: (req,res)=>{
        res.render('pages/noticiaVista.ejs');
    },
    tournament: (req,res)=>{
        res.render('pages/torneo.ejs');
    },
    teams: (req,res)=>{
        res.render('pages/teams.ejs');
    },
    fixture: (req,res)=>{
        res.render('pages/fixture.ejs');
    },
    login: (req,res)=>{
        res.render('pages/login.ejs');
    },
    register: (req,res)=>{
        res.render('pages/register.ejs');
    },
    perfil: (req,res)=>{
        res.render('user/perfil.ejs');
    }
}

module.exports = mainController;