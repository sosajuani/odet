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
        const tournamentId = tournamentConsult[0];
        const divisionId = divisionConsult[0];
        const teamsConsult = await Team.findAll({
            where:{
                tournamentId: tournamentId.id,
                divisionId: divisionId.id
            }
        });
        const controlMatch = await ControlMatch.findOne({
            where:{
                tournamentId: tournamentId.id,
                divisionId: divisionId.id
            }
        })
        res.render('adminViews/fixture/fixture.ejs',{
            tournamentConsult,
            divisionConsult,
            tournamentId,
            divisionId,
            teamsConsult,
            controlMatch
        });

    },
    fixtureByHand: (req,res)=>{
        const dataDate = req.body.matchLength
        const data_date = req.body.data_date
        console.log(dataDate);
        for(let i=0;i<dataDate;i++){
            let localId = local_fecha_partido
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
        res.send("hola")
    },
    fixtureAutomatico:async(req,res)=>{   
        res.send("funcionando")          
        const teamsConsult = await Team.findAll({
            where:{
                tournamentId:1,
                divisionId:1
            }
        });
        
        console.log("-----------------");
        console.log("creamos el emparejamiento");
        //const teams = ['Boca','River','Colon','Ferro']; //4 equipos

        const teams = [];
        const teamPrueba = ['Boca','Colon','Banfield','Independiente']
        teamPrueba.forEach(team => {
            teams.push(team)
        });
        function fixture(teams) {
        if (teams.length % 2 == 1) {
            teams.push(null);
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
                date: "14/5/2022",
                match: round+1,
                journey:`${round+1}`
            });
            }
            teamIndex.push(teamIndex.shift());
            tournamentPairings.push(roundPairings);
        }
        return tournamentPairings;
        }

        for(m = 0 ; m<fixture(teams).length;m++){
            console.log(`Item ${m+1}`);
            for(l = 0; l<fixture(teams)[m].length;l++){
                //console.log(fixture(teams)[m][l]);
            }
        }
        console.log(fixture(teams));
        const alla ={
            localTeamId: '1',
            visitedTeamId: '2',
            tournamentId: '3',
            divisionId: '4',
            date: '5',
            match: '6',
            journey: '7'
        }

    }
}

module.exports = adminController;