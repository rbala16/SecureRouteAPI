const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const envFilePath = path.resolve(__dirname,"../../.env");

dotenv.config({path:envFilePath})

c