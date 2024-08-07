const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "test1234",
    database: "webproject"
});

router.post("/user/login",(req,res) => {
    res.set({
        'content-type': 'application/json; charset=utf-8',
    });
    let user = req.body;
    if(!user){
        let response = {'code':401,'msg':'用户密码不正确'};
        res.end(JSON.stringify(response));
        return;
    }
    const sql = "select * from t_user where username = ? and password = ?";
    db.query(sql,[user.username,user.password],(err,result) => {
        if(err || !result[0]){
            let response = {code:401,msg:'用户密码不正确'};
            res.end(JSON.stringify(response));
            return;
        }

        let response = {code:200,data:result[0]};
        res.send(JSON.stringify(response));
    })
})

router.post("/user/register",(req,res) => {
    let user = {username: req.body.username,password: req.body.password};
    if(!user || !user.username || !user.password){
        let response = {'code':401,'msg':'用户信息错误'};
        res.end(JSON.stringify(response));
        return;
    }
    let sql = "select * from t_user where username = ?";
    db.query(sql,user.username,(err,result) => {
        if(err){
            let response = {code: 500,msg: '查询错误'};
            res.end(JSON.stringify(response));
            return;
        }
        if(result.length > 0){
            let response = {code: 401,msg: '用户名已存在'};
            res.end(JSON.stringify(response));
            return;
        }
        sql = "insert into t_user set ?";
        db.query(sql,user,(err,result) => {
            let response = err ? {code: 500,msg: '注册失败，请重试'} : {code: 200,msg: '注册成功',data: user};
            res.end(JSON.stringify(response));
            return;
        })
    })
})

router.put("/user",(req,res) => {
    res.set({
        'content-type': 'application/json; charset=utf-8'
    });
    let user = req.body;
    if(!user){
        let response = {'code':401,'msg':'用户信息错误'};
        res.end(JSON.stringify(response));
        return;
    }
    const sql = "update t_user set ? where username = ?";
    db.query(sql,[user,user.username],(err,result) => {
        if(err){
            let response = {code:401,msg:'用户信息错误'};
            res.end(JSON.stringify(response));
            return;
        }

        let response = {code:200,msg:'修改成功'};
        res.send(JSON.stringify(response));
    })
})

router.get('/user/username/:username',(req,res) => {
    let username = req.params.username;
    if(!username){
        let response = {code:401,msg:'参数错误'};
        res.end(JSON.stringify(response));
        return;
    }
    const sql = "select * from t_user where username = ?";
    db.query(sql,username,(err,result) => {
        if(err){
            let response = {code:401,msg:'参数错误'};
            res.end(JSON.stringify(response));
            return;
        }
        if(!result[0]){
            let response = {code:401,msg:'未查找到用户',data:{}};
            res.end(JSON.stringify(response));
            return;
        }
        let response = {code:200,data:result[0]};
        res.end(JSON.stringify(response));
    })
})

module.exports = router;