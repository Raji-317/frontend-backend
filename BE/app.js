const express = require("express");           
const app = express();
const port = 3000;

// parse urlencoded bodies (HTML form submits) and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


  app.get("/register",(req,res)=>{
    let {user,password} = req.query;
    res.send(`Received GET request with username: ${user}, password: ${password}`);
  });
  app.post("/register",(req,res)=>{
    let {user,password}=req.body;
    console.log("POST data received:", {user, password});
    res.send(`Received POST request with username: ${user}, password: ${password}`);
  });
  app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)

  });