const express = require("express");
const app = express();
const session = require("express-session");
const mainRouter = require("./routes/mainRouter")
// 설정
app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", __dirname+"/views");

app.use("/",mainRouter);

app.listen(3000,'127.0.0.1',()=>console.log("http://127.0.0.1:3000"));
// app.listen(3000);