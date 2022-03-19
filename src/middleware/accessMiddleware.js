const accessMiddleware = (req,res,next)=>{
    let access = null; //permissions
    let user = null; // user
    if(req.session && req.session.user != undefined){
        access = req.session.access
        user = req.session.user
        // if(req.session.user.rol !== 3 && user){

        // }
    }
    res.locals.user = user;
    res.locals.access = access
    return next()
}
module.exports = accessMiddleware