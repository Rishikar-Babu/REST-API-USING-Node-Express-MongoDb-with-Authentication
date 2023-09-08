// we need to create a custom error which is responsible for handling request response and next and handle the resonpse into json

const {Constants}=require("../Constans")

const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode:500

    switch(statusCode){
        case Constants.VALIDATION_ERROR:
            res.json({
                title:"Validation Failed..!",
                message:err.message
            })
       
        case Constants.NOT_FOUND:
            res.json({
                title:"Not fpund..!",
                message:err.message
            })
       
        case Constants.FORBIDDEN:
            res.json({
                title:"Forbidden..!",
                message:err.message
            })
       
        case Constants.UNAUTHORIZED:
            res.json({
                title:"Unauthorized....!",
                message:err.message
            })
       
        case Constants.SERVERNOTFOUND:
            res.json({
                title:"Server Connection Lost..!",
                message:err.message
            })
            default:
                console.log("NO eroor!....");
            break;
    }
}

module.exports=errorHandler