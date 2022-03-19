const db = require('../database/models');
const User = db.User;
const Player = db.Player;
const profileController = {
    profile: async(req,res)=>{
        let playerTable;
        let userTable;
        let referee = null;
        userTable = await User.findOne({where:{id:req.params.id}});
        if(userTable.id != 3){
            playerTable = await Player.findOne({
                where:{userId:req.params.id},
                include: ['teams']
            });
        }else{
            userTable = await User.findOne({where:{id:req.params.id}});
            referee = 1 
        }
        // console.log(playerTable);
        res.render('user/profile.ejs',{referee,userTable,playerTable});
    }
}
module.exports = profileController;