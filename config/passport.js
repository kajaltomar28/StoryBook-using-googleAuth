const GoogleStrategy= require("passport-google-oauth20").Strategy
const mongoose= require("mongoose")

const User= require("../models/User")

module.exports=function(passport)
{
    passport.use(new GoogleStrategy(
    {
        clientID: "260309137673-dfcij929jf9s9qk8sgigmbljm2gue0e4.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/auth/google/callback"
    },
    async(accessToken, refreshToken, profile, done)=>
    {
        const newUser={
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value

        }
        try{
                let user=await User.findOne({googleId: profile.id})

                if(user)
                {
                    done(null,user)
                }
                else{
                    user=await User.create(newUser)
                    done(null,user)
                }
        }
        catch(err)
        {
            console.log(err)
        }
    }
    ))
    passport.serializeUser((user, done)=> {
         done(null, user.id)
            });
      
      passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user) =>
           done(err, user)
        )
    })
}