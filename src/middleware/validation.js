const { body } = require("express-validator");
const validation = {
    validationLogin: [
            body('user').notEmpty().withMessage("Debes colocar un usuario"),
            body('pass').notEmpty().withMessage("Debes colocar una contraseña")
    ],
    validationRegister:[
        body('user').notEmpty().withMessage("Debes colocar un usuario"),
        body('pass').notEmpty().withMessage("Debes colocar una contraseña"),
        body('email').notEmpty().withMessage("Debes colocar un email").bail()
            .isEmail().withMessage("Debes colocar un email valido"),
        body('pass')
         .notEmpty().withMessage("Contraseña obligatoria")
         .isLength({min:5}).withMessage("La contraseña debe tener mínimo 5 caracteres")
         .custom((value,{req})=>{
             if(value!=req.body.pass2){
                 throw new Error('Las contraseñas no coinciden');
             }
             return true;
         })
    ]
}
module.exports = validation;
