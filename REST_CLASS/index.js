const express=require("express");
const  app=express();
const port=3000;
const path=require("path");
const {v4:uuidv4}=require('uuid');//package importing for unique id generation
const methodOverride=require("method-override");

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));
app.use(express.static(path.join(__dirname,"public")));


let posts=[
    {
        id:uuidv4(),
        username:"RAJI",
        content:"LEADING HAPPY LIFE IS A BOON"
    },
    {
        id:uuidv4(),
        username:"ABHI",
        content:"HAVING GREAT AND UNDERSTANDING FAMILY IS LIKE A HEAVEN ON THE EARTH"
    },
    {
        id:uuidv4(),
        username:"DHAMINI",
        content:"THE PERSON WHO UNDERSTAND US WITHOUT KNOWING ANYTHING IS ALWAYS BE WITH US"
    },
    {
        id:uuidv4(),
        username:"GANGADHAR",
        content:"FAMILY IS FIRST PRIORITY"
    }
]

app.get("/posts",(req,res)=>{
    res.render("rest.ejs", { posts: posts });
});

app.get("/posts_new",(req,res)=>{
    res.render("posts_new.ejs");
});


app.post("/posts",(req,res)=>{
    console.log(req.body);
    let {username,content} = req.body;
    // create a simple unique id for the new post
    const id = uuidv4();
    posts.push({ id, username, content });
    // res.send("post created successfully");
    res.redirect("/posts");
});


app.get("/posts/:id",(req,res)=>{
    const {id} = req.params;
    // find post by its id property rather than array index
    const post = posts.find(p => p.id === id);
    if (!post) {
        // handle missing post (could render error page or redirect)
        return res.status(404).send("Post not found");
    }
    res.render("show.ejs", { post });
});


 app.patch("/posts/:id",(req,res)=>{
     const {id}=req.params;
     let newContent=req.body.content;
     let post=posts.find((p)=>p.id===id);

     console.log("patch request is working");
     post.content=newContent;
      console.log(post);
    //  let newUser=req.body.username;
    //  post.username=newUser;
    //  console.log(post);
     res.redirect("/posts");
    // res.send("post updated successfully")
 });


 app.get("/posts/:id/edit",(req,res)=>{
    //with in the div we have created an edit option
    const {id}=req.params;
    let post=posts.find((p)=>p.id===id);
    if(!post){
        return res.status(404).send("post not found");
    }
    res.render("edit.ejs",{post});
    //the function that we have donr by using patch request that we have use here and redirected teh patch request into post page
});
app.delete("/posts/:id",(req,res)=>{
    const {id}=req.params;
    posts=posts.filter((p)=>p.id!==id);
    res.redirect("/posts");
});
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})