const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");
// const route = require('./routes/routes');
require("colors");
const jwtlib= require('jsonwebtoken')
const db = require("./config/db");
const app = express();
dotenv.config({path:"./config/config.env" });
if (process.env.NODE_ENV === "production") console.log = function() {};
if (process.env.NODE_ENV === "development") app.use(logger("dev"));
app.use(cors());
db(app);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(require("./routes/routes"));
app.use(require("./routes/admin"));
app.use(express.static('./frontend'))
module.exports = app;
var usser;
function generateJWTForOTTBot() {
    const payload = {
      "iat": (new Date().getTime()) / 1000,
        "exp": (new Date().getTime()) / 1000 + 86400,
        "aud": "https://idproxy.kore.ai/authorize",
        "iss": "cs-b9a26555-a947-5c1f-9717-3d7180044f09",
        "sub": "vspriya2525@gmail.com"
    }
    const secret = "a7a03ojJCnHuXzEstxi9iqY2iM49WAbq86tGnJfXizg=";
    var token = jwtlib.sign(payload, secret);
    return token;
}
app.get('/sts', (req, res) => {
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-methods": "*"
    });
    const jwt = generateJWTForOTTBot();
    data = {
        jwt: jwt
    };
    let userToken=req.get("Authorization");
    usser=verifytoken(userToken);
    res.send(JSON.stringify(data));
})
function verifytoken(userToken){  
let decode=jwtlib.decode(userToken,{complete:true});
console.log(decode);
console.log(decode.payload.user.email);
console.log(decode.payload.user.username);
return decode.payload.user.email;
}