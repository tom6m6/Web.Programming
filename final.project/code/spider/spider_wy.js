module.exports = () => {

    const https = require('https');
    const mysql = require('mysql');

    const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "test1234",
        database: "webproject"
    });

    db.query("delete from t_wy",(err,result) => {
        if(err){
            console.log("error");
            return 0;
        }
    });

    let index = ["","_02","_03"];

    for(let i = 0; i < index.length; i++){
        let req = https.request(`https://news.163.com/special/cm_guonei${index[i]}/`, res => {
            let content = "";
            res.on('data',data => content += data);
            res.on('end', () => {
                content = content.slice(14,-1);
                content = JSON.parse(content);
                let data = content;
                
                let sql = "insert into t_wy set ?";
                data.forEach((item) => {
                    if(!item.source)
                        item.source = "网易新闻";
                    let title = item.title;
                    let url = item.docurl;
                    let comment_total = item.tienum;

                    let keys = [];
                    item.keywords.forEach((i,index) => {
                        keys.push(i.keyname);
                    })
                    let keywords = keys.toString();
                    let source = item.source;

                    let tmp = item.time.split(" ");
                    let t = tmp[0].split("/");
                    let year = t[2];
                    let month = t[0];
                    let day = t[1];
                    let create_time = year + "-" + month + "-" + day + " " + tmp[1];
                    
                    let one = {title,url,comment_total,keywords,source,create_time};

                    db.query(sql,one,(err,result) => {
                        if(err){
                            console,log(err.message);
                            return 0;
                        }
                    })
                })
            })
        });

        req.end();
    }
    return 1;
}