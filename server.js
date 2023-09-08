console.log("in express project");
const express=require('express');
const dotenv=require('dotenv').config();
const mongoose=require('mongoose')

const port=process.env.PORT

const app=express();
app.use(express.json()); 




const contactRoute=require('./routes/contactRoutes')
const userRoute=require('./routes/userRoute')
const errorHandler=require('./middleware/errorHandler')



app.use('/api/contacts',contactRoute)   
app.use('/api/users',userRoute) 
app.use(errorHandler)


 mongoose.connect('your-mongodb-connection-string/Databasename',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(()=>{console.log("connected to mongodb")})
        .catch((error)=>{
        console.log(error);
        process.exit(1);
        })


app.listen(port,()=>{
    console.log(`runnning on the port ${port}`);
})
