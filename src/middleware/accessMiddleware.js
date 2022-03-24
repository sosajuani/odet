const accessMiddleware = (req,res,next)=>{
    let access = null; //permissions
    let user = null; // user
    let playerSession = null;
    if(req.session && req.session.user != undefined){
        access = req.session.access
        user = req.session.user
        if(req.session.user.rolId !== 3){
            playerSession = req.session.playerSession;
        }else{}
    }
    res.locals.user = user;
    res.locals.access = access;
    res.locals.playerSession = playerSession;
    return next()
}
module.exports = accessMiddleware