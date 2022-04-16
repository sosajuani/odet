const db = require('../src/database/models')
const fs = require('fs')
const path = require('path');
const express = require('express');
const server = express()

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
const DivisionControl = db.DivisionControl;

const adminController = {
    home: (req,res)=>{
        res.render("../../install/views/home.ejs")
    },
    setup: (req,res)=>{
        let step = parseInt(req.query.step);
        let errQuery = req.query.err;
        res.render("../../install/views/setup.ejs",{step,errQuery})
        
    },
    install: (req,res)=>{
        let install = req.query.type
        res.render('../../install/views/install.ejs',{install})
    },
    config: (req,res)=>{
        let step = parseInt(req.query.step);
        res.render('../../install/views/config.ejs',{step})
    },
    connectDbProcess: async(req,res)=>{
        const nameDb = req.body.name;
        const userDb = req.body.user;
        const passDb = req.body.pass;
        const serverDb = req.body.server;
        const archive = path.resolve(__dirname,`../.env`);
        const Sequelize  = require('sequelize');
        const sequelize = new Sequelize(nameDb,userDb,passDb,{
            host: serverDb,
            dialect: 'mysql'
        });
        let connectDb = `DB_USERNAME= ${userDb}
DB_PASSWORD= ${passDb}
DB_HOST= ${serverDb}
DB_DATABASE=${nameDb}
DB_PORT=3306
DB_DIALECT=mysql`;
        fs.readFileSync(archive,'UTF-8')
        fs.writeFileSync(archive,connectDb);

        sequelize.authenticate()
        .then(()=>{
            return res.redirect('/install/setup?step=2')
        })
        .catch(e =>{   
            return res.redirect('/install/setup?step=1&err=true')
        })
    },
    // testConnection: ()=>{
    //     require('dotenv').config()
    //     const Sequelize  = require('sequelize');
    //     const sequelize = new Sequelize(process.env.DB_DATABASE,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    //         host: process.env.DB_HOST,
    //         dialect: 'mysql'
    //     });
    //     sequelize.authenticate()
    //      .then(()=>{
    //          console.log("correcto");
    //      })
    //      .catch(()=>{
    //          console.log("ios");
    //      })
    // },
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
            await TypeTournament.bulkCreate([
                {type: 'Liga'},
                {type: 'Copa'}
            ]);
            
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
            await DivisionControl.create({
                tournamentDivisions: 1,
                divisionsCreated: 1,
                tournamentId: 1,
                tournamentCompleted: 1
            })
        }catch(e){
            console.log(e);
        }
        res.redirect('/install/registers')
    }
}

module.exports = adminController;