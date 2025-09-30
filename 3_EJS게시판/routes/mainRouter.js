const express = require("express");
const router = express.Router();
const conn = require("../config/db");

// 1. 사용자가 메인에 방문하면 db에 있는 전체 게시글의 정보를 가져와서 메인페이지에 출력
router.get('/',(req,res)=>{
    console.log("DB전체조회라우터");
    // 1) 전체 게시글 조회하는 sql문 작성
    // 2) conn을 통해서 쿼리문을 실행*넘겨줄 값은 없다.
    // 3) 메인페이지를 렌더링 + posts키로 넘겨받은 모든 데이터 넣어주기
    const sql = "select * from board"
    conn.query(sql,(err,rows)=>{
        // console.log(rows);
        res.render("main", {posts : rows})
    })
});

// 2. 특정 게시글을 조회해서 상세페이지를 제작
// 핵심 : 게시글의 번호를 받아와서 해당 게시글만 조회
// 경로/:id 파라미터를 받아올때 사용. main.ejs에서 보내오는 값을 받을 변수
router.get('/board/:id',(req,res)=>{
    console.log("board/:id라우터")
    let id = req.params.id; //get방식에 url의 파라미터를 받아오겠다.
    // console.log(id);
    // * 조회수 1 증가하는 로직 작성
    let sql2 = "update board set hit = hit+1 where id =?"
    conn.query(sql2,[id])

    // 1) 각 id에 해당하는 게시글 정보를 수집 -> db에서
    let sql = "select * from board where id = ?"
    conn.query(sql,[id],(err,rows)=>{
        // console.log(rows)
        res.render("detail", {post : rows[0]})
    })
});

// 3. 게시글 등록
// * 포인트 : 단순 입력폼 제작
router.get('/write',(req,res)=>{
    res.render("write");
});

// 4. 게시글 입력기능(DB) => 미션
router.post('/write',(req,res)=>{
    // 1. 보내온 3개의 데이터 받기(제목,작성자,내용)->post
    // 2. insert 쿼리문 작성
    let {title,writer,content} = req.body;
    let sql = "insert into board (title, writer, content) values (?,?,?)"
    // 3. 값을 입력하는 로직 작성 -> conn -> 입력이 완료되면 메인페이지로 이동
    conn.query(sql,[title,writer,content],(err,rows)=>{
        if(rows.affectedRows >0){
            console.log(rows)
            res.redirect('/');
        }
    })
});

// 5. 게시글 수정폼 제작
router.get('/edit/:id',(req,res)=>{
    let id = req.params.id;
    let sql = "select * from board where id = ?"
    conn.query(sql,[id],(err,rows)=>{
        res.render("edit",{post : rows[0]});
    })
});

// 6. 입력받은 데이터를 활용해서 DB값을 수정
router.post("/edit/:id", (req,res)=>{
    let id = req.params.id;
    let {title,writer,content} = req.body;
    console.log("여기다",req.body);
    let sql = "update board set title =?, writer=?, content=? where id=?"
    conn.query(sql,[title,writer,content,id],(err,rows)=>{
        res.redirect('/board/'+id);
    })
});

// 7. 게시글 삭제
router.post('/delete/:id',(req,res)=>{
    let id = req.params.id;
    let sql = "delete from board where id = ?"
    conn.query(sql,[id],(err,rows)=>{
        if(rows.affectedRows>0){
            res.redirect('/');
        }
    })
});

module.exports = router;