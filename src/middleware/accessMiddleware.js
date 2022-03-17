const accessMiddleware = async (req,res,next)=>{
    let access = null; //permissions
    let user = null; // user
    // const db = require('../database/models');
    // const User = db.User;
    if(req.session && req.session.user != undefined){
        access = req.session.access
        user = req.session.user
    }
    return next()
}
module.exports = accessMiddleware