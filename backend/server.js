const express = require("express");
const app = express ();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
// const User = require("./Models/userModel");
const userRout = require("./Routs/userRout");
const cors = require("cors");
app.use(cors());
app.use(express.json());

dotenv.config();
mongoose.connect(process.env.URI).then(()=>{
  
  console.log("Connected sucessfully");
  app.listen(process.env.PORT || 8000 , (err)=>{
    if(err) console.log(err);
    console.log("Running Sucessfully at",process.env.PORT);
  });
}).catch((error)=>{
  console.log("error",error);
});

app.use(userRout);