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
const ControlMatch = db.ControlMatch;

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
        const tournamentId = tournamentConsult[0].id;
        const divisionId = divisionConsult[0].id;
        const teamsConsult = await Team.findAll({
            where:{
                tournamentId: tournamentId,
                divisionId: divisionId
            }
        });
        const matchWeekConsult = await MatchWeek.findAll({
            where:{
                tournamentId: tournamentId,
                divisionId: divisionId,
                journey: 1
            },
            include: ['localTeam','visitedTeam']
        });
        res.render('adminViews/fixture/fixture.ejs',{
            tournamentConsult,
            divisionConsult,
            tournamentId,
            divisionId,
            teamsConsult,
            matchWeekConsult
        });
    },
    filterTourDiv: async(req,res)=>{
        const tournamentId = req.query.tournamentId;
        const divisionId = req.query.divisionId;
        const journey = req.query.journey ? req.query.journey : 1;
        const tournamentConsult = await Tournament.findAll();
        let matchWeekConsult;
        if(tournamentConsult.length === 0){
            return res.render("errors/404.ejs",{pageVersion:'adm'})
        }
        const divisionConsult = await Division.findAll({
            where:{
                tournamentId: tournamentId
            }
        });
        const teamsConsult = await Team.findAll({
            where:{
                tournamentId: tournamentId,
                divisionId: divisionId
            }
        });
        if(req.query.journey === "all"){
            matchWeekConsult = await MatchWeek.findAll({
                where:{
                    tournamentId: tournamentId,
                    divisionId: divisionId,
                },
                include: ['localTeam','visitedTeam']
            });
        }else{
            matchWeekConsult = await MatchWeek.findAll({
                where:{
                    tournamentId: tournamentId,
                    divisionId: divisionId,
                    journey: journey
                },
                include: ['localTeam','visitedTeam']
            });
        }
        res.render('adminViews/fixture/fixtureFilter.ejs',{
            tournamentConsult,
            divisionConsult,
            tournamentId,
            divisionId,
            teamsConsult,
            matchWeekConsult,
            journey
        });
    },
    fixtureAutomatico:async(req,res)=>{     
        const tournamentId = req.body.tournamentId;
        const divisionId = req.body.divisionId;
        const teamsConsult = await Team.findAll({
            where:{
                tournamentId:tournamentId,
                divisionId:divisionId
            }
        });
        const teams = [];
        teamsConsult.forEach(team => {
            teams.push(team)
        });
        function fixture(teams) {
            const ghost = {
                id: null,            
                tournamentId:tournamentId,
                divisionId:divisionId
            }
            if (teams.length % 2 == 1) {
                teams.push(ghost);
            }

            const teamsCount = teams.length; // cuento cuantos equipos hay
            const rounds = teamsCount - 1; // número de fechas (n° de equipos - 1)
            const half = teamsCount / 2; // número de partidos por fechas (n° de equipos / 2)

            const tournamentPairings = []; //array de emparejamientos

            const teamIndex = teams.map((team, i) => i).slice(1); //quito al primer equipo

            for (let round = 0; round < rounds; round++) {
                const roundPairings = [];

                const newTeamIndex = [0].concat(teamIndex); //vuelvo a agregar el primer equipo

                const firstHalf = newTeamIndex.slice(0, half);
                const secondHalf = newTeamIndex.slice(half, teamsCount).reverse();

                for (let i = 0; i < firstHalf.length; i++) {
                roundPairings.push({
                    localTeamId: teams[firstHalf[i]].id,
                    visitedTeamId: teams[secondHalf[i]].id,
                    tournamentId: teams[firstHalf[i]].tournamentId,
                    divisionId: teams[firstHalf[i]].divisionId,
                    date: "2022-05-14",
                    time: "15:00",
                    journey:`${round+1}`
                });
                }
                teamIndex.push(teamIndex.shift());
                tournamentPairings.push(roundPairings);
            }
            return tournamentPairings;
        }
        for(m = 0 ; m<fixture(teams).length;m++){
            for(l = 0; l<fixture(teams)[m].length;l++){
               const fixture2 = fixture(teams)[m][l];
               await MatchWeek.create({
                    localTeamId: fixture2.localTeamId,
                    visitedTeamId: fixture2.visitedTeamId,
                    tournamentId: fixture2.tournamentId,
                    divisionId: fixture2.divisionId,
                    date: fixture2.date,
                    time: fixture2.time,
                    journey:fixture2.journey
               })
            }
        }
        console.log(fixture(teams));
        return res.redirect(`/admin/fixture/filter?tournamentId=${tournamentId}&divisionId=${divisionId}`)
    }
}

module.exports = adminController;