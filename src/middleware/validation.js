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
        body('pass2').notEmpty().withMessage("Tiene que volver a escribir la contraseña")
    ]
}
module.exports = validation;
