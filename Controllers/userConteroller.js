const asyncHandler=require('express-async-handler')
const Userm=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


//@desc loginUsermr
//@route post /api/user
//public access scpecifier..!

const loginUser=asyncHandler(async (req,res)=>{
    const {email, password } = req.body;
        console.log(req.body);
        if(!email || !password){
            res.status(400)
            throw new Error("All field are mandatory..")
        } 
        const user = await Userm.findOne({email})    
       if(user &&(await bcrypt.compare(password,user.password))){
        const accesstoken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"10m"}     
       );
        res.status(200).json({accesstoken})
       }else{

    res.status(401).json({msg:"acces token not generated..!"})
       }
});

const welcomeuser=asyncHandler(async(req,res)=>{
    res.send("welcome to the user page..!")
})


//@desc register the user
//@route GET /api/contacts
//public access scpecifier..!


const registerUser=asyncHandler(async (req,res)=>{
    const { username ,email, password } = req.body;
        console.log(req.body);
        if(!username || !email || !password){
            res.status(400)
            throw new Error("All field are mandatory..")
        }
        const userAvavilable = await Userm.findOne({email})    
        if(userAvavilable){
            
            res.status(400)
            throw new Error("User already registered..!")
        }

        //hash Password..
        const hashPassword=await bcrypt.hash(password,10) 
        console.log("password",hashPassword);

        const user= await Userm.create({
            username,
            email,
            password:hashPassword,
            givenpassword:password
        });
        
        console.log(`user created ${user}`);
        if(user){
            res.status(201).json({id:user.id,email:user.email})
        }else{
        throw new Error("Data is not valid..!")
        }
        res.status(200).json({msg:"Registerd the user.."})
    
    });

//@desc get curent user by id 
//@route GET /api/contacts
//public access scpecifier..!

const currentUser=asyncHandler(async (req,res)=>{
    console.log("the requested information if the user is..:");
    res.status(200).json(req.user)
    console.log(req.user);
});


module.exports={registerUser,welcomeuser,loginUser,currentUser};