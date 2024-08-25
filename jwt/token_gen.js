const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

//define secret key for signing the token
const client_secret = "abc-store-api";

//Create an API endpoint for generating tokens
app.get("/generate-token",(req,res)=>{
    //create a token using the sign() method
    const token = jwt.sign({client_id:"cust-details"},client_secret,{
        expiresIn : "1h",
    });
    res.send({token});
});

//start the server
app.listen(port,()=>{
    console.log(`Server is running on port :${port}`);
})