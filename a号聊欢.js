





function 是否有最新消息(){
    launch("com.sh.shuihulu.kiwi");
    sleep(1000);
   if(id("com.sh.shuihulu.kiwi:id/tv_unread_count").exists()){
       sleep(200);
       back();
       sleep(200); 
       if(text("去看看")){
           sleep(300);
           click("去看看");
           sleep(200);
           if(id("et_content").findOne(1500)!=null){
               发送回复1();
               sleep(500);
           }else{
              back();
               sleep(200);
               toast("官方消息");
               sleep(200);
           };
       };
       if(text("我再看看")){
           sleep(200);
           click("我再看看");
           sleep(200);
       };
   };
   


};

function 获取回复1(message){
    var url = "http://www.tuling123.com/openapi/api";
    var r = http.postJson(url, {
    key: "c865e530df504ff1ab92093577a99ce7",
    info: message,
    });
    
    if(r.body.json().text == ("喜欢宽大胸怀的","我是做公益慈善的，对待工作一直兢兢业业呢。","你会打针吗","服从命令听指挥。","你自己拍一个视屏呗。","亲爱的，当天请求次数已用完。","微什么，微信吗？","加微信行不","你的小可爱的微信号是：Turingrobot，记得搜索并关注哦","我是机器人，我为机器人代言","收了我的联系方式就要来找我哦，微信公众号，等你哦！","我的联系方式是微信公众号，一般人我都不告诉他。","互换联系方式什么的我最喜欢了，联系方式就是微信公众号：Turingrobot哦。")){
       toast("检测到敏感话语");
       sleep(500);
       return text = "你发的什么我这边看不见";
    }else{
       return r.body.json().text;
    };
    
};


function 最新消息1() {
 var f=id("tv_content").find().size()-1;
 if(f == -1){
     toast("未识别到消息。。。自定义回复");
     sleep(200);
     var a = "哈哈哈";
     return a; 
    }else{
     var a=id("tv_content").find().get(f).text();
     sleep(300);
     id("com.sh.shuihulu.kiwi:id/et_content").find().click();
      sleep(200);
      back();
      sleep(200);
      return a; 
    };
 
};

function 发送回复1(){
    if(id("com.sh.shuihulu.kiwi:id/et_content").exists()){
        sleep(300);
        setText(获取回复1(最新消息1()));
        sleep (500);
    };
    if(text("发送").exists()){
        sleep(200);
        id("com.sh.shuihulu.kiwi:id/tv_send").find().click();
        sleep(1000);
        back();
       
    };
 
};

while(true){
  device.keepScreenOn();
  是否有最新消息();  
};

events.observeKey();
events.onKeyDown("volume_up",function(event){
 engines.stopAll();
 toast("脚本已经停止");
});
