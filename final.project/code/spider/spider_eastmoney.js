module.exports = async function(){

    const https = require('https');
    const mysql = require('mysql');

    const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "test1234",
        database: "webproject"
    });

    async function delAll(){
        db.query("delete from t_eastmoney",(err,result) => {
            if(err){
                console.log("error");
                return 0;
            }
        });
    }

    await delAll();

    async function getOne(i){
        let req = https.request(`https://np-listapi.eastmoney.com/comm/web/getNewsByColumns?client=web&biz=web_news_col&column=350&order=1&needInteractData=0&page_index=${i}&page_size=20&req_trace=1&fields=showTime,title,mediaName,summary,image,url`, res => {
                let content = "";
                res.on('data',data => content += data);
                res.on('end', () => {
                    content = JSON.parse(content);
                    let data = content.data.list;
                    
                    let sql = "insert into t_eastmoney set ?";
                    data.forEach((item) => {
                        let title = item.title;
                        let url = item.url;
    
                        let intro = item.summary;
                        if(intro.length > 255){
                            intro = intro.slice(0,252) + "...";
                        }
    
                        let source = item.mediaName;
                        let create_time = item.showTime;
                        
                        let one = {title,url,intro,source,create_time};
    
                        db.query(sql,one,(err,result) => {
                            if(err){
                                console,log(err.message);
                                return 0;
                            }
                            return 1;
                        })
                    })
                })
            });
    
        req.end();
    }

    async function getNews(){
        for(let i = 1; i <= 300; i++){
            let result = await getOne(i);
            if(result === 0)
                return 0;
        }
        return 1;
    }

    return await getNews();

}