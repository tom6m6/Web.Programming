
function spider_sina(){
    const https = require('https');
    const mysql = require('mysql');

    const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "test1234",
        database: "webproject"
    });

    db.query("delete from t_sina",(err,result) => {
        if(err){
            console.log("error");
            return 0;
        }
    });

    for(let i = 1; i <= 30; i++){
        let req = https.request(`https://feed.sina.com.cn/api/roll/get?pageid=121&lid=1356&num=20&versionNumber=1.2.4&page=${i}&encode=utf-8`, res => {
            let content = "";
            res.on('data',data => content += data);
            res.on('end', () => {
                content = JSON.parse(content);
                let data = content.result.data;
                
                let sql = "insert into t_sina set ?";
                data.forEach((item) => {
                    if(!item.media_name)
                        item.media_name = "新浪新闻";
                    if(!item.comment_total)
                        item.comment_total = 0;
                    let title = item.title;
                    let url = item.url;
                    let intro = item.intro;
                    let keywords = item.keywords;
                    let source = item.media_name;

                    let create_time = new Date(parseInt(item.intime) * 1000);
                    let year = create_time.getFullYear();
                    let month = ("0" + (create_time.getMonth() + 1)).slice(-2);
                    let day = ("0" + create_time.getDate()).slice(-2);
                    let hour = create_time.getHours();
                    let minute = create_time.getMinutes();
                    let seconds = create_time.getSeconds();
                    create_time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds;
                    
                    let one = {title,url,intro,keywords,source,create_time};

                    db.query(sql,one,(err,result) => {
                        if(err){
                            console,log(err.message);
                            return 0;
                        }
                    });
                })
            })
        });

        req.end();
    }
    return 1;
}

module.exports = spider_sina;
