const express = require('express');
const router = express.Router();
const conn = require('../config/db');

router.get('/',(req,res)=>{
    // 핵심 : 반드시 값을 가지고 페이지를 제작할 때는 초기값의 설정이 매우 중요하다.
    // 이유 : 없으면 undefined 출력 -> 페이지 생성이 불가능
    res.render('main');    
    // user가null이기때문에 로그인한 후에 다시 홈으로 돌아가며 
    // 초기화가 되어서 로그인이 풀린다..우리의 한계
});

router.get('/login',(req,res)=>{
    res.render('login');
})

// 로그아웃 기능 구현 -> session 값을 삭제.
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
});

// 전체 회원 관련 코드작성
// *get방식으로 경로를 조회
// *DB에 연결해서 모든 사용자를 조회 -> id, nick만 조회 -> query문을 신경쓰자
// *조회된 모든 회원정보를 리턴 -> 세션에 저장 X -> 페이지를 렌더링(조회한 값을 전달) -> 리스트 타입
router.get('/userlist',(req,res)=>{
    let sql = "select id,nick from member";
    conn.query(sql,(err,rows)=>{
        console.log(rows);
        res.render("userlist", {userlist : rows})
    })
});


router.post('/login',(req,res)=>{
    let {id,pw} = req.body;
    console.log({id,pw});
    let sql = 'select nick from member where id=? and pw=?';
    conn.query(sql,[id,pw],(err,rows)=>{
        console.log(rows);
        if(rows.length >0){
            // 핵심 : 값을 넘길때 정확한 값을 넘기자
            // 이유 : 출력하는 ejs에서 가장 간단하게 출력하는게 가독성에 좋다.
            // res.render("main", {user : rows[0].nick}); 
            // -> render함수는 값을전달한다, 그러나 지금은 session에서 값을 가져오는거라 필요없다.
            // 공용공간인 session에 닉네임을 저장
            req.session.user = rows[0].nick
            res.redirect('/');   
        }else{
            res.redirect("/login");
        }
    })
});

module.exports = router;
