// const express = require('express');
const db = require('../../database/models');
const {validationResult} = require('express-validator');

const User = db.User;
const Tournament = db.Tournament;
const Team = db.Team;
const Division = db.Division;
const TypeTournament = db.TypeTournament;
const Ascent = db.Ascent;
const Decline = db.Decline;
const DivisionControl = db.DivisionControl;
const MatchWeek = db.Matchweek;
const Statistic = db.Statistic;

const adminController = {
    tournament: async(req,res)=>{
        let consultTournament = await Tournament.findAll();
        let data = consultTournament.length;
        res.render('admin/tournament/tournamentAdm.ejs',{consultTournament,data});
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
        const divisionControl = await DivisionControl.findOne({where:{tournamentId: torneoName}});
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
            divisionControl
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
        const consultAscent = await Ascent.findAll();
        const consultDecline = await Decline.findAll();
        const consultType = await TypeTournament.findAll();
        if(!errors.isEmpty()){
            return res.render("admin/tournament/tournamentAdmNew.ejs",{errors:errors.mapped(), oldData:req.body,consultAscent,consultDecline,consultType})
        }
        let tournamentId = parseInt(req.body.typeTournament)

        if(tournamentId != 1){
            console.log("entro");
        }
        if(tournamentId !== 1 && tournamentId !== 2){
            let errorTypeTournament = "El tipo de torneo seleccionado no es valido";
            return res.render("admin/tournament/tournamentAdmNew.ejs",{errors:{typeTournament:{msg:errorTypeTournament}},oldData:req.body,consultAscent,consultDecline,consultType})           
        }
        //modo liga
        if(tournamentId === 1){
            let newTournament = await Tournament.create({
                    name: req.body.name,
                    divisions: req.body.divisions,
                    ascentId: req.body.ascent,
                    declineId: req.body.decline,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    typeId: req.body.typeTournament
                })
                await DivisionControl.create({
                    tournamentDivisions: newTournament.divisions,
                    divisionsCreated: 0,
                    tournamentId: newTournament.id,
                    tournamentCompleted: 0
                })            
        }
        //modo copa
        if(tournamentId === 2){    
            return('/admin/tournament')
        }
        res.redirect('/admin/tournament')
    },
    editTournament: async(req,res)=>{
        const consultAscent = await Ascent.findAll();
        const consultDecline = await Decline.findAll();
        const consultType = await TypeTournament.findAll();
        const consultTournament = await Tournament.findByPk(req.params.tournament)
        res.render("admin/tournament/tournamentAdmEdit.ejs",{consultAscent,consultDecline,consultType,consultTournament})
    },
    editTournamentProcess: async(req,res)=>{      
        let errors = validationResult(req);
        const consultTournament = await Tournament.findByPk(req.params.id)
        const consultDivControl = await DivisionControl.findOne({where:{tournamentId:req.params.id}})
        const consultAscent = await Ascent.findAll();
        const consultDecline = await Decline.findAll();
        const consultType = await TypeTournament.findAll();
        if(!errors.isEmpty()){
            return res.render("admin/tournament/tournamentAdmEdit.ejs",{errors:errors.mapped(), oldData: req.body,consultAscent,consultDecline,consultType,consultTournament})
        }
        //tengo mas divisiones de las que quiero actualizar
        // quiero poner 2 divisiones y tengo 4
        if(consultDivControl.divisionsCreated > req.body.divisions){
            let errorDivision = "Tiene mas divisiones registradas, elimine previamente las que quiera quitar";
            return res.render("admin/tournament/tournamentAdmEdit.ejs",{errors:{divisionError:{msg:errorDivision}}, oldData: req.body,consultAscent,consultDecline,consultType,consultTournament})
        }

        await Tournament.update({
            name: req.body.name,
            divisions: consultTournament.divisions !== req.body.divisions ? req.body.divisions : consultTournament.divisions,
            ascentId: req.body.ascent,
            declineId: req.body.decline,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            typeId: req.body.typeTournament
        },{where:{
            id: req.params.id
        }})
        if(consultTournament.divisions !== req.body.divisions){
            await DivisionControl.update({
                tournamentDivisions: req.body.divisions,
                tournamentCompleted: req.body.divisions == consultDivControl.divisionsCreated ? 1 : 0
            },{where:{tournamentId: req.params.id}})
        }
        res.redirect('/admin/tournament')
    },
    deleteTournament: async(req,res)=>{
        const tournament = req.body.id;
        //let prueba = await MatchWeek.findAll({where:{tournamentId:tournament}})
         await DivisionControl.destroy({where:{tournamentId:tournament}})
         await Division.destroy({where:{tournamentId: tournament}})
         await Team.update({
            tournamentId: null
         },{where:{tournamentId: tournament}});
         await MatchWeek.destroy({where:{tournamentId:tournament}});
         await Statistic.destroy({where:{tournamentId:tournament}});
         await Tournament.destroy({where:{id:tournament}});
        res.redirect('/admin/tournament')
    }
}

module.exports = adminController;