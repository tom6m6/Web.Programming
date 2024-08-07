const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "test1234",
    database: "webproject"
});

function getCount(date,keywords){
    return new Promise(resolve => {
        let sql = `select count(*) from t_sina where title like '%${keywords}%' and DATE(create_time) = ?`;
        let count = 0;
        db.query(sql,date,(err,result) => {
            count += result[0]['count(*)'];
            sql = `select count(*) from t_wy where title like '%${keywords}%' and DATE(create_time) = ?`;
            db.query(sql,date,(err,result) => {
                count += result[0]['count(*)'];
                sql = `select count(*) from t_eastmoney where title like '%${keywords}%' and DATE(create_time) = ?`;
                db.query(sql,date,(err,result) => {
                    count += result[0]['count(*)'];
                    resolve(count);
                })
            })
        })
    })
}

async function hotHandler(req,res){
    let keywords = req.query.keywords;
    let date = new Date().getTime();
    let dates = [];
    for(let i = 0; i < 5; i++){
        dates.unshift(date);
        date -= 86400*1000;
    }
    dates = dates.map(time => {
        let d = new Date(time);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        if(month >= 1 && month <= 9)
          month = "0" + month;
        if(day >= 0 && day <= 9)
          day = "0" + day;
        return (year + "-" + month + "-" + day);
    });
    let data = {};
    for(let i = 0;i < 5; i++){
        let date = dates[i];
        let count = await getCount(date,keywords); 
        data[date] = count;
    }
    res.send(JSON.stringify({data}));
}

router.get("/hot",hotHandler);

async function wordcloudHnadler(req,res){
    let keywords = req.query.keywords;
    const sql = `select source from t_eastmoney where title like '%${keywords}%'`;
    db.query(sql,(err,result) => {
        let response = {};
        for(let i = 0; i < result.length; i++){
            if(response[result[i].source] == null)
                response[result[i].source] = 0;
            response[result[i].source]++;
        }
        res.send(response);
    })
}

router.get("/wordcloud",wordcloudHnadler)

module.exports = router;