const mongoose = require("mongoose"); 

const mongoconn=async()=>{
    try{
 mongoose.connect("mongodb+srv://kajal09:kajal@cluster0.ztvlyax.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser:true , 
    useUnifiedTopology:true
    })
    console.log(`connection is sucessfull`); 
    }
    catch(e)
    {
        console.log(e); 
    }
};

module.exports  = mongoconn;