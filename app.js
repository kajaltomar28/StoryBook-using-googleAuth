const path= require("path")
const express =require("express")
const  mongoose = require("mongoose")
const dotenv = require("dotenv")
const morgan= require("morgan")
const exphbs=require("express-handlebars")
const methodOverride= require("method-override")
const passport= require("passport")
const session= require("express-session")
const MongoStore = require("connect-mongo")
const connectDB = require("./config/db")

//load config

dotenv.config({path:"./config/config.env"})

//passport config

require("./config/passport")(passport)


//connect database

connectDB()

const app=express()

//body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Method Override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

//logging
if(process.env.NODE_ENV ==="development")
{
    app.use(morgan("dev"))
}

//handlebars helpers
const{formatDate, stripTags, truncate, editIcon, select}= require('./helper/hbs')

//handlebars
app.engine('.hbs',exphbs.engine({
  helpers:{formatDate,
  stripTags,
truncate, 
editIcon,
select
},
  dafaultLayout:'main',extname:'.hbs'}));
app.set('view engine','.hbs');

//session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store:  MongoStore.create({ mongoUrl: "mongodb+srv://kajal09:kajal@cluster0.ztvlyax.mongodb.net/?retryWrites=true&w=majority" })
  }))


//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//set global variable
app.use(function (req,res,next) {
  res.locals.user= req.user || null
  next()
})

//static folder

app.use(express.static(path.join(__dirname,"public")))

//routes
app.use('/',require("./routes/index"))
app.use('/auth',require("./routes/auth"))
app.use('/stories',require("./routes/stories"))

const PORT= process.env.PORT || 3000;



app.listen(PORT, console.log(`Server running on port ${PORT}`))