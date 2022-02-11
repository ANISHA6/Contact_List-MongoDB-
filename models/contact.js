//require the library
//mongoose is used to create the schema
//it has same instance as mongoose.js's mongoose has
const mongoose=require('mongoose');

//create schema
//here name and phone could be any name
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

//name of the collection which will be using schema
//here, model, signify the collection
const Contact=mongoose.model('Contact', contactSchema);

module.exports=Contact;