const express = require('express');
const router = express.Router();

const spider = require('../spider/spider_eastmoney');

const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "test1234",
    database: "webproject",
    timezone: "08:00"
});

router.get("/eastmoney/page",(req,res) => {
    res.set({
        'content-type': 'application/json; charset=utf-8'
    });
    let pageNum = req.query.pageNum;
    let pageSize = req.query.pageSize;
    let title = req.query.title == null ? '' : req.query.title;
    let intro = req.query.intro == null ? '' : req.query.intro;
    let source = req.query.source == null ? '' : req.query.source;
    let start = pageSize * (pageNum - 1);
    const sql = `select * from t_eastmoney where title like '%${title}%' and intro like '%${intro}%' and source like '%${source}%' order by create_time desc limit ${start},${pageSize}`;
    db.query(sql,(err,result) => {
        if(err){
            let response = {code:401,msg:'查询错误',data:null};
            res.end(JSON.stringify(response));
            return;
        }
        const countSql = `select count(*) from t_eastmoney where title like '%${title}%' and intro like '%${intro}%' and source like '%${source}%'`;
        db.query(countSql,(err,result2) => {
            let data = {records: result};
            data.total = result2[0]['count(*)'];
            let response = {code:200,msg:'查询成功',data};
            res.send(JSON.stringify(response));
        })
    });
})

router.post("/eastmoney",(req,res) => {
    res.set({
        'content-type': 'application/json; charset=utf-8'
    });
    let news = req.body;
    if(news.id == null){
        const sql = "insert into t_eastmoney set ?";
        db.query(sql,news,(err,result) => {
            if(err){
                let response = {code:401,msg:'更新失败'};
                res.send(JSON.stringify(response));
                return;
            }
            let response = {code:200,msg:'更新成功'};
            res.send(JSON.stringify(response));
        })
        return;
    }
    const sql = "update t_eastmoney set ? where id = ?";
    db.query(sql,[news,news.id],(err,result) => {
        if(err){
            let response = {code:401,msg:'更新失败'};
            res.send(JSON.stringify(response));
            return;
        }
        let response = {code:200,msg:'更新成功'};
        res.send(JSON.stringify(response));
    })
})



router.delete("/eastmoney",(req,res) => {
    let id = req.body.id;
    const sql = "delete from t_eastmoney where id = ?";
    db.query(sql,id,(err,result) => {
        if(err){
            let response = {code:401,msg:'删除失败'};
            res.send(JSON.stringify(response));
            return;
        }
        let response = {code:200,msg:'删除成功'};
        res.send(JSON.stringify(response));
    })
})

router.delete("/eastmoney/batch",(req,res) => {
    let ids = req.body.toString();
    ids = '(' + ids + ')';
    const sql = `delete from t_eastmoney where id in ${ids}`;
    db.query(sql,(err,result) => {
        if(err){
            let response = {code:401,msg:'删除失败'};
            res.send(JSON.stringify(response));
            return;
        }
        let response = {code:200,msg:'删除成功'};
        res.send(JSON.stringify(response));
    });
})

router.get("/eastmoney/update",async function(req,res){
    let result = await spider();
    if(result === 1){
        let response = {code: 200,msg: 'success'};
        res.send(JSON.stringify(response));
        return;
    }
    let response = {code: 500,msg: 'error'};
    res.send(JSON.stringify(response));
})

module.exports = router;