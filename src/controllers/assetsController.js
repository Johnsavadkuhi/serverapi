const mongoose= require("mongoose")
const Assets = require("../models/Assets")



const addAsset = async(req , res)=>{

    console.log("req.formData : " , req.body.formData )

    res.send("hel")

}

module.exports = {
addAsset
}