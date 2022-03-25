const express = require('express');
const db = require('../../database/models');
const Rol = db.Rol;
const Avatar = db.Avatar;
const User = db.User;
const Team = db.Team;
const Player = db.Player;
const Ascent = db.Ascent;
const Decline = db.Decline;
const TypeTournament = db.TypeTournament;
const Tournament = db.Tournament;
const Division = db.Division;

const adminController = {
    registers: (req,res)=>{
        res.render('install/install.ejs')
    },
    registersProcess: async(req,res)=>{
        //creo roles
        try{
            await Rol.bulkCreate([
                {name:'Admin'},
                {name:'Player'},
                {name:'Referee'}
            ]);
            //avatar base
            await Avatar.create({image:'default.png'});
            //usuarios de prueba
            let usersCreate = await User.bulkCreate([
                {
                    user: 'admin',
                    firstName: 'Admin',
                    lastName: 'Odet',
                    email: 'admin@odet.com',
                    pass: '$2a$10$0Xhs.ir9MpmkZoYYj92rs.oWRi2crKnqJDKvMdzIYYWxi.KMB74mK',
                    avatarId: 1,
                    rolId: 1
                },
                {
                    user: 'player',
                    firstName: 'Player',
                    lastName: 'Odet',
                    email: 'player@odet.com',
                    pass: '$2a$10$0Xhs.ir9MpmkZoYYj92rs.oWRi2crKnqJDKvMdzIYYWxi.KMB74mK',
                    avatarId: 1,
                    rolId: 2
                },
                {
                    user: 'referee',
                    firstName: 'Referee',
                    lastName: 'Odet',
                    email: 'referee@odet.com',
                    pass: '$2a$10$0Xhs.ir9MpmkZoYYj92rs.oWRi2crKnqJDKvMdzIYYWxi.KMB74mK',
                    avatarId: 1,
                    rolId: 3
                }
            ]);
            //team prueba
            let teamCreate = await Team.bulkCreate([
                {
                    name: 'Team odet',
                    avatarId: 1,
                    captainId: 1
                },
                {
                    name: 'Team rival',
                    avatarId: 1,
                    captainId: 1
                },
            ]);
            //Players create
            await Player.bulkCreate([
                {
                    goals: 10,
                    suspensionId: null,
                    teamId: 1,
                    userId: 1
                },
                {
                    goals: 10,
                    suspensionId: null,
                    teamId: 1,
                    userId: 2
                }
            ]);
            await Ascent.create({
                type: 'Puntos'
            });
            await Decline.create({
                type: 'Puntos'
            });
            await TypeTournament.create({

            });
            let tournamentConsult = await Tournament.create({
                name: 'Torneo de prueba',
                divisions: 1,
                ascentId: 1,
                declineId: 1,
                startDate: Date('y'),
                endDate: Date('y'),
                typeId: 1
            });
            await Division.create({
                name: "Primera división",
                tournamentId: tournamentConsult.id
            });
        }catch(e){
            console.log(e);
        }
        res.redirect('/install/registers')
    }
}

module.exports = adminController;