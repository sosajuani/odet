const { body } = require("express-validator");
const validationTournament = {
    validationCreate: [
            body('name')
             .notEmpty().withMessage("Debes colocar un nombre"),
            body('divisions')
             .notEmpty().withMessage("Debes colocar la cantidad de divisiones"),
            body('ascent')
             .notEmpty().withMessage("Debes seleccionar el tipo de ascenso"),
            body('decline')
             .notEmpty().withMessage("Debes seleccionar el tipo de descenso"),
            body('startDate')
             .notEmpty().withMessage("Debes seleccionar una fecha de inicio")
             .custom((value, {req})=>{
                if(value > req.body.endDate){
                    throw new Error('La fecha de inicio no puede ser mayor a la fecha final')
                }
                return true
             })
             .custom((value)=>{
                let dateConfirm =new Date()
                let [yearDate, monthDate, dayDate] =[dateConfirm.getFullYear(),dateConfirm.getMonth() + 1, dateConfirm.getDate()]
                let confirm = `${yearDate}-${monthDate < 10 ? '0'+monthDate:monthDate}-${dayDate}`
                 if(value < confirm){
                    throw new Error('La fecha de inicio no puede ser ser menor a la actual')
                 }
                 return true
             }),
            body('endDate')
             .notEmpty().withMessage("Debes seleccionar una fecha final"),
            body('typeTournament')
             .notEmpty().withMessage("Debes seleccionar el tipo de torneo"),
    ],
}
module.exports = validationTournament;