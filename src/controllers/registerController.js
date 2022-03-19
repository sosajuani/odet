const {validationResult} = require('express-validator');
const {hashSync} = require('bcryptjs');
const db = require('../database/models');
const { send } = require('express/lib/response');
const User = db.User;
const Player = db.Player;

const mainController = {
    register: (req,res)=>{
        res.render('pages/register.ejs');
    },
    registerProcess: async(req,res)=>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render("pages/register.ejs",{errors:errors.mapped(), oldData: req.body})
        }
        let userConsult = await User.findOne({where:{user:req.body.user}})
        if(userConsult !== null){
            return res.render("pages/register.ejs",{userError:{msg:'El usuario ya existe'},oldData: req.body})
        }
        let emailConsult = await User.findOne({where:{email:req.body.email}})
        if(emailConsult !== null){
            return res.render("pages/register.ejs",{emailError:{msg:'El email ingresado ya esta en uso'},oldData: req.body})
        }
        let userCreate = await User.create({
            user: req.body.user,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            pass: hashSync(req.body.pass,10),
            avatarId: 1,
            rolId: 2
        });
        await Player.create({
            goals: 0,
            suspensionId: null,
            teamId: null,
            userId: userCreate.id
        })
        res.redirect('/register/more')
    },
    registerMore: (req,res)=>{
        let pageTeam = req.query.pageTeam // 1 = true | 2 = false
        res.render('pages/registerTwo.ejs',{pageTeam})
    },
    registerMoreProcess:(req,res)=>{
        send("proximamente")
    },
    registerSearchTeam:(req,res)=>{
        res.render('pages/registerTwo.ejs');
    }
}

module.exports = mainController;