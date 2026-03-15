const mongoose=require('mongoose');

const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/test");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
connectDB();
const user=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
});
// const User=mongoose.model("User",user);
const employees=mongoose.model("employees",user);
// //queries
// 
employees.findOne({name:"Raji"}).then((res)=>{
    console.log(res);
})
.catch((err)=>{
 console.log(err);
});

// const k=new employees({
//     name:"@Raji",
//     email:"rajya@example.com",
//     password:"password123",
//     phone:1234567890
// });
// k.save();
//insert
// employees.insertMany([
//     {
//         name:"Raji",
//         email:"rajya@.com",
//         password:"1234",
//         phone :9949201794
//     },
//     {
//         name:"abii",
//         email:"adhjya@.com",
//         password:"123456",
//         phone :9949201793
//     },
//     {
//         name:"Dhamini",
//         email:"dhamini@.com",
//         password:"1234",
//         phone :9133062645
//     },
//     {
//         name:"GANGADHAR",
//         email:"gangadhار@.com",
//         password:"1234",
//         phone :9949201794
// }
// module.exports={User,employees};
// ]).then((res)=>{
//     console.log("Documents inserted:", res);
// });
