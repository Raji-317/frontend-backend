const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express=require('express');
const app=express();
const path=require('path');
const methodoverriding=require('method-override');

app.use(express.urlencoded({extended:true}));
app.use(methodoverriding("_method"));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sql_connection',//name of the database that we have created in mysql workbench
  password: 'Raji@317'
});

let createRandomUser = () => {
  return [
     faker.string.uuid({length:8}),
     faker.internet.username({length:10}),//converting an onject into the array ,without using the keys to store like in objects
     faker.internet.email({length:10}),
     faker.internet.password({length:10})
  ];
};

app.get("/",(req,res)=>{
  let q=`select Count(*) from user`;
  try{
  connection.query(q, (err,result)=>{
    if(err)
      throw err;
    let c=result[0]["Count(*)"];
    console.log(result[0]["Count(*)"]);//prints the result in the form of objects;
    res.render("home.ejs",{c});
  
  });
}
catch(err){
  console.log(err);
  res.send("there is a mistake in db");
}
});
//show route
app.get("/user",(req,res)=>{
  let q=`select * from user`;
  try{
    connection.query(q,(err,result)=>{
      if(err){
        throw err;
      }
      //console.log(result);
      let k=result;
      res.render("user.ejs",{k});
    });
  }
  catch(err){
    console.log(err);
  }
});

//edit route
app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params;
  let q=`select * from user where id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err)
        throw err;
      let k=result[0];
      res.render("edit.ejs",{k});
  });
  
}
catch(err){
  res.send("error in the db");
}
});
//for to modify the data
app.patch("/user/:id",(req,res)=>{
  let {id}=req.params;
  let{password:formpass,username:newusername}=req.body;
  let q=`update user set username='${newusername}',password='${formpass}' where id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err)
        throw err;
      res.redirect("/user");
    });
  }
  catch(err){
    res.send("error in the db");
  }
});
//post
app.get("/user/new",(req,res)=>{
  res.render("new.ejs");
});

app.post("/user",(req,res)=>{
  let {id,username,email,password}=req.body;
  let q=`insert into user(id,username,email,password) values('${id}','${username}','${email}','${password}')`;
  try{
    connection.query(q,(err,result)=>{
      if(err)
        throw err;
      res.redirect("/user");
    });
  }
  catch(err){
    res.send("error in the db");
  }
});
//delete
app.delete("/user/:id",(req,res)=>{
  let {id}=req.params;
  let q="DELETE FROM user WHERE id = ?";

  connection.query(q,[id],(err,result)=>{
    if(err){
      console.log(err);
      return res.send("error in db");
    }
    res.redirect("/user");
  });
});


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
