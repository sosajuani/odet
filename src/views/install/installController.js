const express = require('express');
const db = require('../../database/models');
const Rol = db.Rol;
const Avatar = db.Avatar;
const User = db.User;
const Team = db.Team;
const Player = db.Player;

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
            await Avatar.create({image:'default.jpg'});
            //usuarios de prueba
            let usersCreate = await User.bulkCreate([
                {
                    user: 'admin',
                    name: 'Admin',
                    email: 'admin@odet.com',
                    pass: '$2a$10$0Xhs.ir9MpmkZoYYj92rs.oWRi2crKnqJDKvMdzIYYWxi.KMB74mK',
                    avatarId: 1,
                    rolId: 1
                },
                {
                    user: 'player',
                    name: 'Player',
                    email: 'player@odet.com',
                    pass: '$2a$10$0Xhs.ir9MpmkZoYYj92rs.oWRi2crKnqJDKvMdzIYYWxi.KMB74mK',
                    avatarId: 1,
                    rolId: 2
                },
                {
                    user: 'referee',
                    name: 'Referee',
                    email: 'referee@odet.com',
                    pass: '$2a$10$0Xhs.ir9MpmkZoYYj92rs.oWRi2crKnqJDKvMdzIYYWxi.KMB74mK',
                    avatarId: 1,
                    rolId: 3
                }
            ]);
            //team prueba
            let teamCreate = await Team.create({
                name: 'Team odet',
                avatarId: 1,
                captainId: 1
            });
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
        res.redirect('/install/registers')
    }
}

module.exports = adminController;