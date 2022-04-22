const { body } = require("express-validator");
const path = require("path")
const validation = {
    validationLogin: [
            body('user').notEmpty().withMessage("Debes colocar un usuario"),
            body('pass').notEmpty().withMessage("Debes colocar una contraseña")
    ],
    validationRegister:[
        body('user')
         .notEmpty().withMessage("Debes colocar un usuario")
         .isLength({min:5})
         .withMessage('El usuario debe tener minimo 5 caracteres')
         .custom((value)=>{
            let space = /\s/;
            if(value.indexOf(" ") !== -1){
                throw new Error('El usuario no puede contener espacios')
            }
            return true
         }),
        body('firstName')
         .notEmpty().withMessage("Debes colocar un nombre"),
        body('lastName')
         .notEmpty().withMessage("Debes colocar una contraseña"),
        body('pass2')
         .notEmpty().withMessage("Debes colocar una contraseña").bail()
         .isLength({min:5}).withMessage('La contraseña debe tener mínimo 5 caracteres'),
        body('email')
         .notEmpty().withMessage("Debes colocar un email").bail()
         .isEmail().withMessage("Debes colocar un email valido"),
        body('rol')
         .notEmpty().withMessage('Debes seleccionar una opción')
         .custom(value =>{
            if(value == 2 || value == 3){
                return true
            }else{
                throw new Error("Rol invalido");
            }
         }),
        body('pass')
         .notEmpty().withMessage("Contraseña obligatoria").bail()
         .isLength({min:5}).withMessage("La contraseña debe tener mínimo 5 caracteres")
         .custom((value,{req})=>{
             if(value!=req.body.pass2){
                 throw new Error('Las contraseñas no coinciden');
             }
             return true;
         })
    ],
    divisionEdit:[
        body('name').notEmpty().withMessage("El nombre de la división no puede estar vacío")
         .isLength({min:4}).withMessage("Debe contener al menos 4 caracteres")
    ],
    divisionCreate:[
        body('name').notEmpty().withMessage("El nombre de la división no puede estar vacío")
         .isLength({min:4}).withMessage("Debe contener al menos 4 caracteres"),
        body('tournament').notEmpty().withMessage("Debe seleccionar un torneo")
    ],
    createTeam: [
        body('name').notEmpty().withMessage("El nombre del equipo no puede estar vacío")
         .isLength({min:2,max:16}).withMessage("El equipo tiene que tener mas tener entre 2 y 16 caracteres"),
        body('tournamentId').notEmpty().withMessage("Debe seleccionar un torneo"),
        body('divisionId').notEmpty().withMessage("Debe seleccionar una división"),
        body('img').custom((value, {req})=>{
            if(!req.file){
                return true
            }else{
                const archiveName = req.file.originalname.toLowerCase()
                const extensionArchive = path.extname(archiveName)
                const extensions = ['.jpg','.png','.jpeg']
                if(extensions.includes(extensionArchive) === false){
                    throw new Error("Oops la extensión de la imagen no es correcta")
                }
            }
            return true
        })
    ]
}
module.exports = validation;
