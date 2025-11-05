const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String, 
        required:true 
    } ,
    lastName :{
        type:String , 
        required:true 
 
    } , 
    username: {
        type: String,
        required: true, unique:true 
    },
    roles: {
        User: {
            type: Number,
        },
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: [String],
    profileImageUrl: { type: String } , 
    status:{type:String , default:"Active"}, 
    score:{type:Number , default:0} ,
    devOps:{type:Boolean , required:true  }, 
    security:{type:Boolean , required:true  }, 
    qualityAssurance:{type:Boolean , required:true } , 
    userProject: [{
        type: Schema.Types.ObjectId, 
        ref: 'ProjectUser'
    }],

    

});

module.exports = mongoose.model('User', userSchema);