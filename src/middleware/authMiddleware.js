const authMiddleware = {
    logged: (req,res,next)=>{
        if(req.session.user != undefined){
            next();
        }else{
            res.redirect('/login');
        }
    },
    visited: (req,res,next)=>{
        if(req.session.user != undefined){
            res.redirect(`/profile/${req.session.user.id}`);
        }else{
            next();
        }
    },
    admin: (req,res,next)=>{
        if(req.session.user && req.session.access==1){
            next();
        }else{
            res.send("No tiene permisos para estar aca");
        }
    },
    onlyUser: (req,res,next)=>{
        if(req.session.user.id == req.params.id){
            next();
        }else{
            res.redirect(`/profile/${req.session.user.id}`);
        }
    }
}

module.exports = authMiddleware;