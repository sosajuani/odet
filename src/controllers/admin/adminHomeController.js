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
    home: async(req,res)=>{
        // User.findOne({
        //     where:{
        //         id: req.session.user.id
        //     }
        // })
        // .then(resolve => res.render('admin/indexAdm.ejs',{user:resolve}))
        // .catch(e => console.log(e))
        const bannerConsult = await Banner.findAll();
        res.render('adminViews/home/home.ejs',{bannerConsult})
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
        Banner.create({
            image: "",
            active: 1
        })
       // console.log(req.file.filename);
    },
    dataModal: async(req,res)=>{
        const banner = req.params.id;
        const bannerConsult = await Banner.findByPk(banner);
        let response = {
            meta: {
                status: 200,
                url: '/admin/api/bannerdata/'+banner
            },
            banner:{
                data: {
                    image: bannerConsult.image,
                    active: bannerConsult.active
                }
            }
        }
        return res.json(response)
    },
    updateActiveBanner: async(req,res)=>{
        const id = req.body.id;
        const status = parseInt(req.body.status);
        await Banner.update({
            active: status === 1 ? 2 : 1
        },{
            where:{
                id
            }
        })
        return res.redirect("/admin/")
    },
    updateBanner: (req,res)=>{
        res.send("funciono")
    }
}

module.exports = homeController;