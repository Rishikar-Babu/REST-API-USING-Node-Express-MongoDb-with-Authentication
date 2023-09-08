// all our logic implemented here for request and response and conntected with the database..!
const asyncHandler= require('express-async-handler');
var contactss=require('../models/contactModel');



//@desc Getallcintacts
//@route GET /api/contacts
//private access scpecifier..!

const getContact=asyncHandler(async (req,res)=>{
    const contact=await contactss.find({user_id:req.user.id})    
    res.status(200).json({msg:contact})
});

//@desc cretaing the contact
//@route GET /api/contacts
//private access scpecifier..!

const cretaeContact=asyncHandler(async(req,res)=>{
    console.log("requested information is :",req.body )
    const{ name ,email, phno } = req.body;
    if(!email || !name || !phno){
        res.status(400)
        throw new Error("All feild are mandatory..")
    }
    const contact=await contactss.create({
        name,
        email,
        phno,
        user_id:req.user.id
    });
    res.status(200).json({msg:"created contact id :",contact})
});
//@desc Get the contact details by Id
//@route post/api/contacts/id
//private access scpecifier..!

const getContactById= asyncHandler(async(req,res)=>{
    const contact=await contactss.findById(req.params.id);
    if(!contact){
        res.status(400)
        throw new Error("Conatct not found..!")
    }
    if(contact.user_id.toString()!= req.user.id){
        res.status(403)
        throw new Error("user dont have permisson to update the conatct of the other user..!")
    }
    res.status(200).json({msg:`contact detils of id = ${req.params.id}`,contact})
  
})

//@desc updating contacts by id
//@route update/api/contacts/id
//private access scpecifier..!

const updateContactById=asyncHandler(async (req,res)=>{
    const contact=await contactss.findByIdAndUpdate(req.params.id);
    if(!contact){
        res.status(400)
        throw new Error("Conatct npt found..!")
    }

    if(contact.user_id.toString()!= req.user.id){
        res.status(403)
        throw new Error("user dont have permisson to update the conatct of the other user..!")
    }

    const updateConatct =await contactss.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json({msg:`contact detils of id = ${req.params.id}`,contact})
})

//@desc deleting the contact by id 
//@route delete/api/contacts/id
//private access scpecifier..!

const deleteContactById=asyncHandler(async (req,res)=>{
    const contact=await contactss.findByIdAndDelete(req.params.id);
    if(!contact){
        res.status(400)
        throw new Error("Contact npt found..!")
    }
    if(contact.user_id.toString()!= req.user.id){
        res.status(403)
        throw new Error("user dont have permisson to update the conatct of the other user..!")
    }
    await contactss.deleteOne(req.params.id)
    res.status(200).json({msg:`contact detils of id = ${req.params.id}`,contact})
}
);




module.exports={getContact,deleteContactById,updateContactById,getContactById,cretaeContact}