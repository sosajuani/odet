const {validationResult} = require('express-validator');
const {hashSync} = require('bcryptjs');
const db = require('../database/models');
const { Op } = require("sequelize");
const User = db.User;
const Player = db.Player;
const Team = db.Team;
const Rol = db.Rol;

const mainController = {
    register: (req,res)=>{
        Rol.findAll()
        .then(rol => res.render('pages/register/register.ejs',{rol}))
        .catch(e => console.log(e))
    },
    registerProcess: async(req,res)=>{
        let errors = validationResult(req);
        let rol = await Rol.findAll();
        let rolBody = req.body.rol;
        if(!errors.isEmpty()){
            return res.render("pages/register/register.ejs",{errors:errors.mapped(), oldData: req.body,rol})
        }
        let userConsult = await User.findOne({where:{user:req.body.user}})
        if(userConsult !== null){
            return res.render("pages/register/register.ejs",{userError:{msg:'El usuario ya existe'},oldData: req.body,rol})
        }
        let emailConsult = await User.findOne({where:{email:req.body.email}})
        if(emailConsult !== null){
            return res.render("pages/register/register.ejs",{emailError:{msg:'El email ingresado ya esta en uso'},oldData: req.body,rol})
        }
        let userCreate = await User.create({
            user: req.body.user,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            pass: hashSync(req.body.pass,10),
            avatarId: 1,
            rolId: rolBody
        });
        if(rolBody == 2){
            await Player.create({
                goals: 0,
                suspensionId: null,
                teamId: null,
                userId: userCreate.id,
                teamConfirm: null
            })
        }
        return res.render("pages/register/register.ejs",{completed:{msg:"registro completado"},rol})
    },
    registerMore: async(req,res)=>{
        if(req.session.user.rolId ===3){
            return res.redirect('/');
        }
        if(req.session.user.rolId !== 3){
            let playerConsult = await Player.findOne({where:{userId:req.session.user.id}})
            if(playerConsult.teamId !== null){
                return res.redirect('/')
            }
        }
        let pageTeam = req.query.pageTeam // 1 = true | 2 = false
        
        res.render('pages/register/registerTwo.ejs',{pageTeam})
    },
    registerSearchTeam:async(req,res)=>{
        let pageTeam = req.query.pageTeam
        let search = req.query.search;
        let searchResult;
        let playerConsult;
        let teamsConsult = await Team.findAll({
            where:{
                name: { [Op.like]: `%${search}%` }
            }
        })
        if(req.session.user.rolId ===3){
            return res.redirect('/');
        }
        if(req.session.user.rolId !== 3){
            playerConsult = await Player.findOne({where:{userId:req.session.user.id}})
            if(playerConsult.teamId !== null){
                return res.redirect('/')
            }
            if(teamsConsult.length > 0){
                searchResult = 1;
            }else{
                searchResult = 0
            }
        }
        res.render('pages/register/searchTeam.ejs',{playerConsult,pageTeam,searchResult,teamsConsult,search});
    },
    regTeamProcess:async(req,res)=>{
        await Player.update({
            teamId: req.params.id,
            teamConfirm: 0
        },{where:{userId:req.session.user.id}})
        res.redirect('/profile/'+req.session.user.id);
    }
}

module.exports = mainController;