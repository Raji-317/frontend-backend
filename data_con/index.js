const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express=require('express');
const app=express();

//creating a database connection from node.js to sql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sql_connection',//name of the database that we have created in mysql workbench
  password: 'Raji@317'
});


// manual insertion of data into th database 
// let q="insert into user(id,username,email,password) values (?,?,?,?)";
// let q="insert into user(id,username,email,password) values ?";
// let users=[
//   // ["123","rajya","raji@gmail.com","ra567"],
//   ["1290","ajammmmmm","rajaaaaa@gmail.comc","baa80002"],
//   ["1250","rajyammabcdma","raadbxii@gmail.comd","caaaa1900323"]
// ];
connection.query(q,[data], (err,result)=>{
    if(err)
      throw err;
    console.log(result);
  });


//for bulk insertion of data into the database using faker package;
//faker package as a database
//since our database only contains the  4 cols  as below:
let createRandomUser = () => {
  return [
     faker.string.uuid({length:8}),
     faker.internet.username({length:10}),//converting an onject into the array ,without using the keys to store like in objects
     faker.internet.email({length:10}),
     faker.internet.password({length:10})
  ]
}
let q="insert into user(id,username,email,password) values ?";
let data=[];
for(let i=0;i<100;i++){
  // console.log(createRandomUser());//we can able to print the fake details of 100 persons
  data.push(createRandomUser());
}

//for to know the type of queries like show ,insert,update,delete etc..


