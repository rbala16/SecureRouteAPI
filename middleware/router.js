const express = require("express");
const mongooseConnectionFile = require("../db/mongoose");
const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
//to create a unique id
const { v4: uuidv4 } = require("uuid");

//create a new instance of an Express router
const router = express.Router();

//define secret key for signing the token
const client_secret = "abc-store-api";

//vertify token
const authenticateToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(401).send("Token Required!!");
  }
  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, client_secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    req.user = decoded;
    next();
  });
};

//create user
router.post("/customers", authenticateToken, async (req, res) => {
  let { custId, name, age, location } = req.body;
  if (!custId) {
    custId = uuidv4();
  }
  try {
    const existingCustomer = await Customer.findOne({ custId });
    if (existingCustomer) {
      return res.status(400).send({ error: "Customer already exists" });
    }
    const customer = new Customer({ custId, name, age, location });
    await customer.save();
    res.status(201).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
});

//read the customer info
router.get("/customers",authenticateToken,async(req,res)=>{
  let { custId, name, age, location } = req.query;

  try{
    let customers;
    //get customer by cust id
    if(custId){
      customers = await getCustomerBycustId(custId);
      if(customers.length === 0){
        return res.status(404).json({error :"Invalid custId"});
      }
    } 
    //get cust by name ,age and loaction
    else{
      customers = await getCustomerByNameAgeLocation(name,age,location);
    }
     if(customers.length === 0){
      return res.status(404).json({error :"No customer found"});
     }
     res.send(customers);
      
    }
    //Error Handling
    catch (e) {
      if (e.message === "Customer not found" || e.message === "Invalid customer ID") {
        return res.status(404).json({ error: e.message });
      } else if (e.message === "InvalidcustIdError") {
        return res.status(400).json({ error: e.message });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  
});

//handler function
async function getCustomerBycustId(custId) {
  const customers = await Customer.findOne({custId});
  if(!customers || customers === null){
    throw new Error("Customer not found");
  }
  return customers;
}

async function getCustomerByNameAgeLocation(name,age,location){
  const filter = {};
  if(name){
    filter.name = name;
  }
  if(age){
    filter.age = age;
  }
  if(location){
    filter.location= location;
  }
  const customers = await Customer.find(filter).select("id custId name age location");
  return customers;
}

//get customer by id
router.get("/customers/:id",authenticateToken,async(req,res)=>{
  const _id = req.params.id;
  try{
    const customer = await Customer.findById(_id);
    if(!customer){
      return res.status(404).send();
    }
    res.send(customer);
  }
  catch(e){
    return res.status(500).json({ e: "Internal Server Error" });
  }
})

//delete cust data
router.delete("/customers",authenticateToken,async(req,res)=>{
  
})
module.exports = router;