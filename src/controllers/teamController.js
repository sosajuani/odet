let db = require('../database/models')
const teamController = {
    pruebas: (req,res)=>{
        res.render('pruebas.ejs')
    },
    pruebasPro: (req,res)=>{
        db.Ascent.create({
            type: 'Puntos'
        })
        .then(r=> res.redirect('/'))
    }
}
module.exports = teamController;