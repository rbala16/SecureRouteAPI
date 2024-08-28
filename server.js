const express = require("express");
//create instance of express app
const app = express();
//define port 
const port = process.env.PORT || 8080;

//use router in your app
const router = require("./middleware/router");

// use the router in your app
app.use(express.json(), router);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})