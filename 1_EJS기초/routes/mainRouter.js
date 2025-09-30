const express = require("express");
const router = express.Router();

router.get('/', (req,res)=>{
    // res.sendFile(file_path+"/main.html");
    // app.js에서 확장자와 경로를 설정해서 main만쓰면됨.
    res.render("main", {name:"후상", login:true });
});

router.get('/userlist', (req,res)=>{
    let data = [{name:"후상", age:20}, {name:"최영화", age:40}, {name:"정형", age:20}];
    res.render("list", {data})
});

module.exports = router;
