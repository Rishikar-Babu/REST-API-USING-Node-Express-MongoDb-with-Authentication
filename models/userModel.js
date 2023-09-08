const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"name is requiried"]
    },
    email:{
        type:String,
        requiried:[true, "enter the email compulsuiry..!"],
        unique:[true,"enter the unique email id"]
    },
    password:{
        type:String,
        requiried:[true, "mandatory to enter the password"]
    },
    
},
{
    timestamps:true
}
);


const userSchemaaa =mongoose.model("User",userSchema);
module.exports=userSchemaaa;