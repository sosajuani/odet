const {validationResult} = require('express-validator');
const {compareSync, hashSync} = require('bcryptjs');
const db = require('../database/models');
const User = db.User;
const News = db.News;

const newsController = {
    newsRead: (req,res)=>{
        News.findOne({
            where:{
                id:req.params.id
            },
            include:['users']
        })
        .then(news => res.render('pages/newsRead.ejs',{news}))
    }
}

module.exports = newsController;