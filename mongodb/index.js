const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require('path');
const Chat=require("./models/chat.js");
const methodoverride=require("method-override");



app.set("views",path.join(__dirname,"view"));
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname ,"public")));
app.use(express.urlencoded({extended:true}));//it is used for parsing of data since in post method the data return in the form of an json file so to encode that we use this
app.use(methodoverride("_method"));//in edit .js method we have this as "_method" as query method
async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

main()
.then(()=>{
    console.log("connection is successful");
})
.catch((err)=>{
    console.log(err);
});


app.get("/chats",async (req,res)=>{//to get teh data from teh database it is in the form of promise so we are going to use async and await keywords here
    let chats=await Chat.find();//chat.find() :for to get the data it depends upon the database so it is asynchronous function so it return in the form of promises 
    // to handle promises we just need to use await and async
    // console.log(chats);
    res.render("index.ejs",{chats});
});



//keeping an option to get a new chat process:newchat->button->on clicking ->a form will be rendered ->form contains:msg ,from and to
//post method for to store the data in the database we use this method:
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})


//so upto here we have completed creating a new caht 
//now on clicking that button we have to store teh data in the in the database so we have to use post method:
//create using:Post method:
app.post("/chats",(req,res)=>{
    let {from,msg,to}=req.body;
    let newchat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),
    });
    //now to store:saving the data:
    //we can use either thenable or asyn and await:anything is fine
    //save():it is asynchromous ,so we have to use async and await ,but they are purely thenable so if we write.tehn methods then we didnt use saync and await and vice veresa too
    newchat.save().then(res=>{
        console.log("chat is saved");
    })
    .catch(err=>{
        console.log(err);
    }
);
   // console.log(newchat);
    res.redirect("/chats")

});

//by using id creating a route:
//edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});
});


//update route:
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg:newmsg}=req.body;
    let final=await Chat.findByIdAndUpdate(id,
        {
            msg:newmsg
        },
        // {
        //   runValidators:true,
        // new:true
        // }

    );
   // console.log(newmsg);
    res.redirect("/chats");
});
//destroy or delete 
// note:if we dont keep await and async to then they wont be deleted and anything process doesnt happens
app.delete("/chats/:id",async(req,res)=>{
    let{id}=req.params;
    let chatdelete= await Chat.findByIdAndDelete(id);
    console.log(chatdelete);
    res.redirect("/chats");
});


//so up to now the modifications that are done will be displayed and will be reflected that changes even in the database too..and it is the major part


app.get('/',(req,res)=>{
    res.send("It is working");

});


app.listen(3000,()=>{
    console.log("app is running in the port 3000");
});
// let chat1=new Chat({
//     from:"Raji",
//     to:"Abhi",
//     msg:"hello ma how r u?",
//     created_at:new Date()
// });
// chat1.save().then((res)=>{
//     console.log(res);
// });