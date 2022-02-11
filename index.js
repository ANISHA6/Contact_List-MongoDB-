
const exp = require('constants');
const express=require('express');
//path is a inbuild module into path
const path=require('path');
const port=8000;

//2nd step of db
const db=require('./config/mongoose');


//it is used to create entry or collection should be 
//populated using Contact variable
const Contact=require('./models/contact');

const app=express();
//setting ejs value for view engine property
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//use signify the middleware, write it after creating form
//it reads the data, and parses through keys-and values
//it does not read params data
app.use(express.urlencoded());

//put middleware here
app.use(express.static('assets'));

//Create array for the contact
var contactList=[
    {
        name:"Anisha",
        phone:"1111111"
    },
    {
        name:"Neha",
        phone:"22222222"
    },
    {
        name:"codingNinjas",
        phone:"33333333"
    }

]

//After getting req, sending back smth as res
//this msg will display on profile url
app.get('/',function(req, res){
    // console.log(__dirname);
    //We are rendering the file, so we don't neet res.send
    // res.send('<h1>Cool, it is running! or is it</h1>');


    //fetch the Contact(Schema)
    //find func goes to the database, find without any qery
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contact from db');
            return;
        }
    //render the home file
    //we need to send our contactList to home page
    return res.render('home',{
        title:"My Contacts List",
        contact_list:contacts
        // contact_list:contactList
   });
});
});

//create controller for practice.ejs file
// app.get('/practice',function(req,res){
//     return res.render('practice',{
//         title:"Lets play with ejs"
//     });
// });

//router and controller
app.post('/create-contact', function(req,res){
    // return res.redirect('/practice');
    //send object to contactList
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    //when we receive key-value, it is into req.body
    // contactList.push(req.body);

    //instead of pushing into contact_list
    //push into database
    //create instance of schema
    //create contact part
    Contact.create({
        //name of key should be same as schema
       name:req.body.name,
       phone:req.body.phone 
    },function(err,newContact){
        if(err){console.log('erroe in creating a contact');
       return;}

       console.log('*******',newContact);
       return res.redirect('back');
    });

    // return res.redirect('/');
    // return res.redirect('back');
});
//this msg will disply on pro url
// app.get('/pro',function(req, res){
//     res.send('<h1>Cool, it is running on pro! or is it</h1>');
// });

//setting router and controller for deleting a contact
app.get('/delete-contact', function(req,res){
    //delete matches phone no. contact
    // console.log(req.params);
    // let phone=req.params.phone;
//now, get query from url
    // console.log(req.query);
    // let phone=req.query.phone;

    //after connecting the db
    //get the id from query in the url
    let id=req.query.id;
    // let contactIndex=contactList.findIndex(contact => contact.phone==phone);

    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }

    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        //now, need to go on same page
    return res.redirect('back');


    })
    //now, need to go on same page
    // return res.redirect('back');
});




//run our server
app.listen(port,function(err){
    if(err){console.log('Error in running the server',err);}
    console.log('Yup! my Express Server is running on port',port);
});