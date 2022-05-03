// const express = require('express');
const db = require('../../database/models');
const {validationResult} = require('express-validator');
const fs = require("fs");
const path = require("path");

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
const Banner = db.Banner;

const homeController = {
    home: (req,res)=>{
        // User.findOne({
        //     where:{
        //         id: req.session.user.id
        //     }
        // })
        // .then(resolve => res.render('admin/indexAdm.ejs',{user:resolve}))
        // .catch(e => console.log(e))
        res.render('adminViews/home/home.ejs',{user:"juan"})
    },
    uploadBanner: async(req,res)=>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            //delete archive
            if(req.file){
                fs.unlinkSync(path.resolve(__dirname,"../../../public/img/banners/"+req.file.filename))
            }
            return res.render("adminViews/home/home.ejs",{errors:errors.mapped(), oldData:req.body})
        }
        // Banner.create({
        //     image: "",
        //     active: 1
        // })
       // console.log(req.file.filename);
    }
}

module.exports = homeController;