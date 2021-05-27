

function 获取回复(message){
    var url = "http://www.tuling123.com/openapi/api";
    var r = http.postJson(url, {
        key: "97b4010b542f4484bf09dc688e4a822d",
        info: message,
    });
    if(r.body.json().text == ("喜欢宽大胸怀的","我是做公益慈善的，对待工作一直兢兢业业呢。","你会打针吗","服从命令听指挥。","你自己拍一个视屏呗。","亲爱的，当天请求次数已用完。","微什么，微信吗？","加微信行不","你的小可爱的微信号是：Turingrobot，记得搜索并关注哦","我是机器人，我为机器人代言","收了我的联系方式就要来找我哦，微信公众号，等你哦！","我的联系方式是微信公众号，一般人我都不告诉他。","互换联系方式什么的我最喜欢了，联系方式就是微信公众号：Turingrobot哦。","你好小哥哥")){
        toast("检测到敏感话语");
        sleep(500);
        var h = "你发的什么我这边看不见";
        return h ;
     }else{
        return r.body.json().text;
     };
};
function 最新消息() {
    var f=id("com.mosheng:id/left_iv_text").find().size()-1;
    if(f == -1){
        sleep(200);
        toast("没有检测到消息 自定义回复");
        sleep(200);
        var a = "你好"
        return a; //获取到的文字定义到a
    }else{
        var a=id("com.mosheng:id/left_iv_text").find().get(f).text();//获取页面最新的一条消息
        sleep(300);//等待
        id("com.mosheng:id/editText").find().click();
        sleep(200);
        back();
        sleep(200);
        return a; //获取到的文字定义到a
    };
    
};
function 发送回复(){
    if(id("com.mosheng:id/editText").exists()){
        sleep(300);
        setText(获取回复(最新消息()));
        sleep (700);
        while(true){
            if(text("发送").exists()){
             sleep(200);
             click("发送");
             sleep (200);
            }else{
             sleep(200);
             break;
            }
        };
        
    };
};

function 是否有最新消息(){
 launch("com.mosheng");//运行APP
 进入房间();
 sleep(500);
     if(id("tv_new_count").exists()){
         sleep(200);
         back(); 
         sleep(700); 
         if (text("小哥哥发来新消息，不去看看吗？").exists()){
            sleep(500);
            if(text("去看看").exists()){
                sleep(200);
                unreamsg=id ("tv_ok").findOnce(0)
                x1=unreamsg.bounds().centerX();
                y1=unreamsg.bounds().centerY();
                click (x1,y1);
                sleep(1000);
            };
            sleep(1000);
            if(id("com.mosheng:id/editText").findOne (1000)==null){
                sleep(200);
                back();
            }else{
               发送回复() ;
                sleep(700);
                id("com.mosheng:id/imageLeftReturn").find().click();
                sleep(500);
                //back();
    
            };
        }else{
            if(text("我再看看")){
                sleep(300);
                toast("系统信息请手动处理");
                sleep(300);
                click("我再看看")
                sleep(200);
            };
        };  
        };
     
   
};

function 进入房间(){

    sleep(200);
    if(id("com.mosheng:id/control_customize_dialog_button_ok_layout")){
        sleep(200);
        id("com.mosheng:id/control_customize_dialog_button_ok_layout").find().click();
        sleep(200);
    }else{
        sleep(200);
    };
    

};

while(true){
   
    是否有最新消息();  
};

device.keepScreenOn();
events.observeKey();
events.onKeyDown("volume_up",function(event){
 engines.stopAll();
 toast("脚本已经停止");
});
