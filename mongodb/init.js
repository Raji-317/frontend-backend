const mongoose=require("mongoose");
const Chat=require("./models/chat.js");



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

let chats=[
    {
    from:"Raji",
    to:"Abhi",
    msg:"hello ma how r u?",
    created_at:new Date()
    },
        {
    from:"Dhamini",
    to:"Abhi",
    msg:"where are u?",
    created_at:new Date()
    },
        {
    from:"Gangadhar",
    to:"Abhi",
    msg:"waht is u r favourite food?",
    created_at:new Date()
    },
        {
    from:"Abhi",
    to:"Raji",
    msg:"u r my sweetheart.....",
    created_at:new Date()
    }
]
Chat.insertMany(chats)
