

var b = "在吗"

var a = http.get("http://api.qingyunke.com/api.php?key=free&appid=0&msg="+b)

var obj = a.body.json();//
    var str = JSON.stringify(obj);
    var patt1 = /("content":"[\s\S]*?")/g;
    var rec ;
    var arr = str.match(patt1);
    arr.forEach((child,index)=>{
        if(index%2 == 0) {
           rec = "";
            var one = child.match(/"[\s\S]*?"/g)[1];//去除多余的
            rec = one.replace("\"","").replace("\"","");//去除双引号
            log (rec);
        };
    
    }); 


    /*var message = "在吗";
    var url = "http://api.qingyunke.com/api.php?";
    var a = http.get(url, {
     key: "free",
     appid :"0",
     msg :message,
    });
    var obj = a.body.json();//
    var str = JSON.stringify(obj);
    var patt1 = /("content":"[\s\S]*?")/g;
    var rec ;
    var arr = str.match(patt1);
    arr.forEach((child,index)=>{
        if(index%2 == 0) {
           rec = "";
            var one = child.match(/"[\s\S]*?"/g)[1];//去除多余的
            rec = one.replace("\"","").replace("\"","");//去除双引号
            log (rec);
        };
    
    }); */
   // return rec;//网站返回的文字



