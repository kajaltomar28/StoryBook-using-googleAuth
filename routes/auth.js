const express= require("express")
const passport=require("passport")
const router =express.Router()

//Auth with google
//GET /auth/google
router.get('/google',passport.authenticate('google',{scope:['profile']}))

router.get('/google/callback', passport.authenticate('google',{failureRedirect:'/'}),(req,res)=>
{
    res.redirect('/dashboard')
})


//LogoutUser
// route /auth/logout

router.get('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      })
}
)

module.exports=router