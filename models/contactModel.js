const mongoose=require('mongoose')

const contactSchema= new mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    name:{
        type:String,
        required:[true,"name is requiried"]
    },
    email:{
        type:String,
        requiried:[true, "enter the email compulsuiry..!"]
    },
    phno:{
        type:Number,
        requiried:[true, "mandatory to enter the phone number"]
    },
    
},
{
    timestamps:true
}
);


const contactdetails =mongoose.model("Contact",contactSchema);
module.exports=contactdetails;