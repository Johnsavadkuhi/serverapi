const mongoose = require('mongoose');

const OwaspWstgSchema = new mongoose.Schema({
  id: { type: String, required: true , index:true }, // مثلا "4.1.2"
  description: { type: String, required: true }, // توضیح فارسی
  impact: { type: String, required: true }, // تاثیر/ریسک
  exploit: { type: String }, // روش اکسپلویت به انگلیسی
  exploit_fa :String , 
  solution:String, 
  label:String  
});

// export default mongoose.model("OwaspWstg", OwaspWstgSchema);
module.exports = mongoose.model("OwaspWstg", OwaspWstgSchema);
