const express = require("express");
const mongooseConnectionFile = require("../db/mongoose");
const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
//to create a unique id
const {v4 : uuidv4} = require("uuid");

//create a new instance of an Express router
const router = express.Router();

//define secret key for signing the token
const client_secret = "abc-store-api";

//vertify token 
const authenticateToken = (req,res,next)=>{
    const tokenHeader = req.headers.authorization;

    if(!tokenHeader){
        return res.status(401).send("Token Required!!");
    }
    const token = tokenHeader.split(" ")[1];
    
    jwt.verify(token,client_secret,async(err,decoded)=>{
        if(err){
            return res.status(401).send("Invalid token");
        }
        req.user = decoded;
        next(); 
    });

}
