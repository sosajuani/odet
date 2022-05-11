// const express = require('express');
const db = require('../../database/models');
const {validationResult} = require('express-validator');

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

const adminController = {
    home: async(req,res)=>{
        const tournamentConsult = await Tournament.findAll();
        if(tournamentConsult.length === 0){
            return res.render("errors/404.ejs",{pageVersion:'adm'})
        }
        const divisionConsult = await Division.findAll({
            where: {
                tournamentId: tournamentConsult[0].id
            }
        });
        const tournamentId = tournamentConsult[0];
        const divisionId = divisionConsult[0];
        const teamsConsult = await Team.findAll({
            where:{
                tournamentId: tournamentId.id,
                divisionId: divisionId.id
            }
        });
        res.render('adminViews/fixture/fixture.ejs',{
            tournamentConsult,
            divisionConsult,
            tournamentId,
            divisionId,
            teamsConsult
        });

    },
    fixtureByHand: (req,res)=>{
        const dataDate = req.body.matchLength
        console.log(dataDate);
        for(let i=0;i<dataDate;i++){
            let teamId = req.body.na
            // MatchWeek.bulkcreate([
            //     {
            //         localTeamId: null,
            //         visitedTeamId: null,
            //         tournamentId: null,
            //         divisionId: null,
            //         date: null,
            //         match: null,
            //         journey: null
            //     }
            // ])
        }
    }
    // fixtureActomatico:(req,res)=>{             
    //     const teamsConsult = await Team.findAll();
    //     let teamsCant = teamsConsult.length;
    //     const random = Math.floor(Math.random() * teamsCant);
    //     const teamsLocals = [];
    //     const teamsRivals = [];
    //     const pruebaArray = teamsRivals.length == 15
    //     for(let i = 0; teamsLocals.length < 15; i++){
    //         const random = Math.floor(Math.random() * teamsCant);
    //         !teamsLocals.includes(teamsConsult[random].name) && !teamsRivals.includes(teamsConsult[random].name)
    //          ? teamsLocals.push(teamsConsult[random].name)
    //          : null
    //     }
    //     for(let i = 0; teamsRivals.length < 15; i++){
    //         const random = Math.floor(Math.random() * teamsCant);
    //         !teamsRivals.includes(teamsConsult[random].name) && !teamsLocals.includes(teamsConsult[random].name)
    //          ? teamsRivals.push(teamsConsult[random].name)
    //          : null
    //     }
    //     //console.log("locales");
    //     //console.log(teamsLocals);
    //     //console.log("total: "+teamsLocals.length);
    //     //console.log("rivales");
    //     //console.log(teamsRivals);
    //     //console.log("total: "+teamsRivals.length);
    //     //console.log("------------------------");
    //     //console.log("Duplicados en locales");
    //     let duplicadosLocales = [];   
    //     const tempArrayLocals = [...teamsLocals].sort();   
    //     for (let i = 0; i < tempArrayLocals.length; i++) {
    //       if (tempArrayLocals[i + 1] === tempArrayLocals[i]) {
    //         duplicadosLocales.push(tempArrayLocals[i]);
    //       }
    //     }
    //     //console.log(duplicadosLocales);
    //     //console.log("Duplicados en rivales");
    //     let duplicadosRivales = [];     
    //     const tempArrayRivals = [...teamsRivals].sort();      
    //     for (let i = 0; i < tempArrayRivals.length; i++) {
    //       if (tempArrayRivals[i + 1] === tempArrayRivals[i]) {
    //         duplicadosRivales.push(tempArrayRivals[i]);
    //       }
    //     }
    //     //console.log(duplicadosRivales);
    //     console.log("-----------------");
    //     console.log("creamos el emparejamiento");
    //     //console.log(teamsLocals);
    //     //console.log(teamsLocals);
    // }
}

module.exports = adminController;