const WstgModel = require("../models/WebOwasp")
const WebOwasp = require("../config/owasp_wstg_data");
const OwaspWstg = require("../models/OwaspWstg");
const owasp_impact = require("../config/owasp_impact");

// Recursive ID sanitizer
function sanitizeIds(node) {
  node.id = node.id.replace(/\./g, '');
  if (node.children && node.children.length > 0) {
    node.children = node.children.map(child => sanitizeIds(child));
  }
  return node;
}

const saveWebOwaspWstg = async (req, res) => {
  try {
    await WstgModel.deleteMany({})
    await WstgModel.insertMany(WebOwasp);
    res.status(201).json("done!");
  } catch (err) {
    console.error("Insert failed:", err);
    res.status(500).json("Error inserting data.");
  }
};


const getAllOwaspWeb = async (req, res) => {

  try {

    const result = await WstgModel.find({})

    res.status(200).json({ result })

  } catch (err) {
    console.error("Fetch failed:", err);
    res.status(500).json("Error fetching data.");
  }
}


const saveImpactsWeb = async (req, res) => {
  try {
    await OwaspWstg.deleteMany({})
    await OwaspWstg.insertMany(owasp_impact);
    res.status(201).json("done!");
  } catch (err) {
    console.error("Insert failed:", err);
    res.status(500).json("Error inserting data.");
  }
}

const getOwaspItemById = async(req , res)=>{
  
const {id} = req.query 
const result = await OwaspWstg.findOne({id})

res.status(200).json(result) 

}



module.exports = {
  saveWebOwaspWstg, getAllOwaspWeb, saveImpactsWeb , getOwaspItemById
};
