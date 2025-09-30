const express = require("express");
const app = express();
const path = require("path");
const mainRouter = require('./routes/mainRouter');
const session = require("express-session");
// session 사용 등록
app.use(
    session({
        secret : "mysecret", // 세션을 암호화 할때 사용하는 키
        resave : false, // 비어있는 값을 자동으로 저장할 꺼냐
        saveUninitialized : false, // 빈세션을 만들거냐?
        cookie : {
            httpOnly : true, // 자바스크립트의 접근을 막겠다.
            secure : false, // 권장은 true -> https에서만 실행하겠다.
            maxAge : 1000*60*30 // 1초는 1000밀리세컨드
                                // session의 생명주기.밀리초단위
        }
    })
)

// 넘겨온 세션값을 전역변수로 등록
app.use((req,res,next)=>{
    res.locals.user = req.session.user || null;
    console.log("세션값 : "+res.locals.user)
    next();
    // next()가 없으면 밑에 코드가 돌아가지않아서 무한루프에 빠짐.
})
// post데이터 처리
app.use(express.urlencoded({extended:true}))
// ejs 셋팅
app.set('view engine','ejs');  //view엔진을 쓸거고 거기서 ejs사용할거다.
// react는 view폴더가 react로 바뀌고 노드와 빌드해서 사용가능
app.set('views',__dirname+'/views');
// 라우터 등록
app.use('/', mainRouter);

app.listen(3000);

