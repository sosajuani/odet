require('dotenv').config();
const db = require('../src/database/models')
const fs = require('fs')
const path = require('path');
const express = require('express');
const server = express();
const {hashSync} = require('bcryptjs');

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
        const archive = path.resolve(__dirname,`../.env`);
        const leer = fs.readFileSync(archive,'UTF-8')
        console.log("trae "+process.env.DB_DATABASE);
        res.render("../../install/views/home.ejs")
    },
    setup: (req,res)=>{
        let step = parseInt(req.query.step);
        let errQuery = req.query.err;
        res.render("../../install/views/setup.ejs",{step,errQuery})
        console.log(process.env.DB_DATABASE);
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
        fs.writeFileSync(archive,connectDb)
        
        process.env.DB_USERNAME = `${userDb}`
        process.env.DB_PASSWORD = `${passDb}`
        process.env.DB_DATABASE = `${nameDb}`
        process.env.DB_HOST = `${serverDb}`
        process.env.DB_PORT = `3306`
        process.env.DB_DIALECT = `mysql`
        sequelize.authenticate()
        .then(()=>{
            return res.redirect('/install/setup?step=2')
        })
        .catch(e =>{   
            return res.redirect('/install/setup?step=1&err=true')
        })
    },
    odetBaseProcess: (req,res)=>{
        require('dotenv').config();
        const mysql = require('mysql2');
         const archive = path.resolve(__dirname,`./sql/base.sql`);
        let connect = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password:process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            multipleStatements: true
        })
        connect.connect((e)=>{
            if(!!e){
                console.log("error");
            }else{
                console.log("connected");
            }
        })
        const sql = fs.readFileSync(archive,'utf-8')
        connect.query(sql,(err,result)=>{
           console.log(err);
        });    
        res.redirect('/install/config')
    },
    odetBaseAdminProcess: async(req,res)=>{
        const userCreate = await User.create({
            user: req.body.user,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            pass: hashSync(req.body.pass,10),
            avatarId: 1,
            rolId: 1
        })
        res.redirect('/install/config?step=2')
    },
    odetDemoProcess: (req,res)=>{

    },
    devBaseProcess: async(req,res)=>{
        await Rol.bulkCreate([
            {name:'Admin'},
            {name:'Player'},
            {name:'Referee'}
        ]);
        
        await Avatar.create({image:'default.png'});

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
        res.redirect('/')
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
            //creo liga      
            let tournamentConsult = await Tournament.create({
                name: 'Torneo de prueba',
                divisions: 3,
                ascentId: 1,
                declineId: 1,
                startDate: Date('y'),
                endDate: Date('y'),
                typeId: 1,
                season: 1
            });
            await Division.bulkCreate([
                {
                    name: "Primera división",
                    tournamentId: tournamentConsult.id
                },
                {
                    name: "Segunda división",
                    tournamentId: tournamentConsult.id
                },
                {
                    name: "Tercera división",
                    tournamentId: tournamentConsult.id
                },
            ]);
            await DivisionControl.create({
                tournamentDivisions: 3,
                divisionsCreated: 3,
                tournamentId: 1,
                tournamentCompleted: 1
            })
            //team prueba
            let teamCreate = await Team.bulkCreate([
                {
                    name: 'Team odet',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Team rival',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Ultimate Raiders',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Colossal Friars',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Strong Fusion',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Steel Hornets',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Bizarre Pride',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Atlantic Bulls',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Sugar Explorers',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Basket Bandits',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Valiant Miracles',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Killer Crocodiles',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Net Foxes',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Legendary Lightning',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Merry Commodores',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Mighty Ravens',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Daring Explorers',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Phenomenal Bandits',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Disturbed Anteaters',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Platinum Huskies',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:1
                },
                {
                    name: 'Phenomenal Flash',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:2
                },
                {
                    name: 'Wise Hornets',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:2
                },
                {
                    name: 'Legendary Pride',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:2
                },
                {
                    name: 'Platinum Aztecs',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:2
                },
                {
                    name: 'Atlantic Brigade',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:2
                },
                {
                    name: 'Voodoo Preachers',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:3
                },
                {
                    name: 'Strong Minutemen',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:3
                },
                {
                    name: 'Abandoned Blackflies',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:3
                },
                {
                    name: 'Silly Pros',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:3
                },
                {
                    name: 'Careless Blugolds',
                    avatarId: 1,
                    captainId: null,
                    tournamentId: 1,
                    divisionId:3
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
        }catch(e){
            console.log(e);
        }
        res.redirect('/')
    }    
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
}

module.exports = adminController;