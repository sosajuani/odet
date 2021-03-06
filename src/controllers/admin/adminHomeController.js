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
    deleteBanner: async(req,res)=>{
        const consultBanner = await Banner.findByPk(req.params.id);
        fs.unlinkSync(path.resolve(__dirname,"../../../public/img/banners/"+consultBanner.image));
        await Banner.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.redirect('/admin')
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
        await Banner.create({
            image: req.file.filename,
            active: 1
        })
        return res.redirect('/admin')
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
    updateBanner: async(req,res)=>{
        const bannerConsult = await Banner.findByPk(req.params.id)
        res.render("adminViews/home/bannerEdit.ejs",{bannerConsult})
    },
    updateBannerProcess: async(req,res)=>{
        const bannerConsult = await Banner.findByPk(req.params.id)
        if(bannerConsult !== null){
            const oldImage = bannerConsult.image;
            let errors = validationResult(req);
            if(!errors.isEmpty()){
                //delete archive
                if(req.file){
                    fs.unlinkSync(path.resolve(__dirname,"../../../public/img/banners/"+req.file.filename))
                }
                return res.render("adminViews/home/bannerEdit.ejs",{errors:errors.mapped(), oldData:req.body,bannerConsult})
            }
            if(req.file){
                fs.unlinkSync(path.resolve(__dirname,"../../../public/img/banners/"+oldImage))
                await Banner.update({
                    image: req.file.filename
                },{
                    where:{
                        id: req.params.id
                    }
                })
                return res.redirect("/admin/")
            }else{
                return res.send("debe subir un archivo")
            }
        }else{
            return res.send("el registro que quiere editar no existe")
        }

    }
}

module.exports = homeController;