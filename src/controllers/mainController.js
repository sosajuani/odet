const express = require('express');

const mainController = {
    'home': (req,res)=>{
        res.render('pages/noticias/home.ejs')
    },
    'torneo': (req,res)=>{
        res.render('')
    },
    'perfil': (req,res)=>{
        res.render('user/perfil.ejs')
    }
}

module.exports = mainController;