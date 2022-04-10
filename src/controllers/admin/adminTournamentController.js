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

const adminController = {
    tournament: async(req,res)=>{
        let consultTournament = await Tournament.findAll();
        let data = consultTournament.length
        res.render('admin/tournament/tournamentAdm.ejs',{consultTournament,data})
    },
    tournamentIndividual: async(req,res)=>{
        const torneoName = req.params.tournament;
        const tournamentConsult = await Tournament.findByPk(torneoName);
        const teamsTournament = await Team.count({
            where: { tournamentId: tournamentConsult.id }
        });
        const typeTournament = await TypeTournament.findOne({where: {id: tournamentConsult.typeId}});
        const ascentTournament = await Ascent.findOne({where: {id: tournamentConsult.ascentId}});
        const declineTournament = await Decline.findOne({where: {id: tournamentConsult.declineId}});
        const divisionsTournament = await Division.count();;
        console.log(typeTournament);
        let tournamentValid = true;
        if(tournamentConsult === null){
            tournamentValid = false;
        }
        res.render('admin/tournament/tournamentIndividualAdm.ejs',
        {
            tournamentConsult,
            tournamentValid,
            teamsTournament,
            typeTournament,
            ascentTournament,
            declineTournament,
            divisionsTournament
        });
    },
    newTournament: async(req,res)=>{
        const consultAscent = await Ascent.findAll();
        const consultDecline = await Decline.findAll();
        const consultType = await TypeTournament.findAll();
        res.render('admin/tournament/tournamentAdmNew.ejs',{consultAscent,consultDecline,consultType})
    },
    newTournamentProcess: async(req,res)=>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            const consultAscent = await Ascent.findAll();
            const consultDecline = await Decline.findAll();
            const consultType = await TypeTournament.findAll();
            return res.render("admin/tournament/tournamentAdmNew.ejs",{errors:errors.mapped(), oldData: req.body,consultAscent,consultDecline,consultType})
        }
        // Tournament.create({
        //     name: req.body.name,
        //     divisions: req.body.divisions,
        //     ascentId: req.body.ascent,
        //     declineId: req.body.decline,
        //     startDate: req.body.startDate,
        //     endDate: req.body.endDate,
        //     typeId: req.body.typeTournament
        // })
        // .then(result => res.redirect('/admin/tournament'))
        // console.log("inicio");
        // console.log("inicio");
        // console.log("inicio");
        // console.log("inicio");
        // console.log(req.body.startDate);
        // console.log("inicio");
        // console.log("inicio");
        // console.log("inicio");
        // console.log("inicio");
    }
}

module.exports = adminController;