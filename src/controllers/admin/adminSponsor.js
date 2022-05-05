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
const Sponsor = db.Sponsor;

const adminSponsor = {
    sponsors: async(req,res)=>{
        const sponsorConsult = await Sponsor.findAll();
        res.render('adminViews/sponsors/sponsors.ejs',{sponsorConsult})
    },
    editSponsor: async(req,res)=>{
        const sponsorConsult = await Sponsor.findByPk(req.params.id);
        if(sponsorConsult === null){
            return res.render("errors/404.ejs",{pageVersion:'adm'})
        }
        res.render('adminViews/sponsors/edit.ejs',{sponsorConsult})
    },
    uploadSponsor: async(req,res)=>{
        const redirect = '/admin/sponsors';
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            //delete archive
            if(req.file){
                fs.unlinkSync(path.resolve(__dirname,"../../../public/img/sponsors/"+req.file.filename))
            }
            const sponsorConsult = await Sponsor.findAll();
            return res.render("adminViews/sponsors/sponsors.ejs",{errors:errors.mapped(), oldData:req.body,sponsorConsult})
        }
        if(req.file){
            await Sponsor.create({
                image: req.file.filename,
                active: 1
            })
            return res.redirect(redirect)
        }else{
            return res.redirect(redirect)
        }
    },
    updateSponsor: async(req,res)=>{
        const redirect = '/admin/sponsors';
        const sponsorConsult = await Sponsor.findAll();
        const id = req.params.id;
        let errors = validationResult(req);
        sponsorConsult == null ? res.redirect(redirect) : null
        const oldImage = sponsorConsult.image;
        if(!errors.isEmpty()){
            //delete archive
            if(req.file){
                fs.unlinkSync(path.resolve(__dirname,"../../../public/img/sponsors/"+req.file.filename))
            }
            return res.render("adminViews/sponsors/sponsors.ejs",{errors:errors.mapped(), oldData:req.body,sponsorConsult})
        }
        if(req.file){
            fs.unlinkSync(path.resolve(__dirname,"../../../public/img/sponsors/"+oldImage));
            await Sponsor.destroy({
                where:{
                    image: oldImage
                }
            })
            await Sponsor.update({
                image: req.file.filename,
                active: 1
            },{
                where:{
                    id
                }
            })
            return res.redirect(redirect)
        }else{
            return res.redirect(redirect)
        }
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

module.exports = adminSponsor;