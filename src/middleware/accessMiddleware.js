const accessMiddleware = (req,res,next)=>{
    console.log("access middleware");
    let access = null; //permissions
    let user = null; // user
    if(req.session && req.session.user != undefined){
        access = req.session.access
        user = req.session.user
        if(req.session.user.rolId !== 3){
            if(req.url !== '/register/more'){
                console.log(req.session.player.teamId);
                if(req.session.player.teamId == null){ 
                    res.redirect('/register/more')
                }
            }
        }else{
            console.log("soy referee");
        }
    }
    res.locals.user = user;
    res.locals.access = access
    return next()
}
module.exports = accessMiddleware