

function 获取回复(message){
    var url = "http://www.tuling123.com/openapi/api";
    var r = http.postJson(url, {
        key: "97b4010b542f4484bf09dc688e4a822d",
        info: message,
    });
    return r.body.json().text;
};
function 最新消息() {
    var f=id("chat_item_content_text").find().size()-1;//获取页面有多少条消息
    //sleep(300)//等待
    if(f == -1){
        sleep(200);
        toast("没有检测到消息 自定义回复");
        sleep(200);
        var a = "你好"
        return a; //获取到的文字定义到a
    }else{
        var a=id("chat_item_content_text").find().get(f).text();//获取页面最新的一条消息
        sleep(300);//等待
        click ("输入消息...");
        sleep(200);
        back();
        sleep(200);
        return a; //获取到的文字定义到a

    }
   
};
function 发送回复(){
if(id("input_chat_et").exists()){
    sleep(300);
    setText(获取回复(最新消息()));
    sleep (500);
    id("com.wemomo.matchmaker:id/iv_input_btn_send").find().click();
    sleep (500);
};
};
function 是否有最新消息(){
     进入房间();
    if (id("tv_unreadmsg_count").exists()){
        unreamsg=id ("tv_unreadmsg_count").findOnce(0);
        x1=unreamsg.bounds().centerX();
        y1=unreamsg.bounds().centerY();
        click (x1+200,y1);
        sleep(1000);
        if(id("input_chat_et").findOne (1000)==null){
            back();
        }else{
           发送回复() ;
            sleep(500);
            sleep(500);
            back();
            sleep(500);
        };
    };
};

function 进入房间(){
if(text("向你推荐相亲对象")){
    id("iv_dialog_close").find().click();
    sleep(200);
    id("com.wemomo.matchmaker:id/maintab_bottom_message").find().click();
};
};

threads.start(a4);
function a4(){
    while (true){
        if(text("向你推荐相亲对象")){
            id("iv_dialog_close").find().click();
            sleep(200);
            id("com.wemomo.matchmaker:id/maintab_bottom_message").find().click();
        };
    };
};

events.observeKey();
events.onKeyDown("volume_up",function(event){
 engines.stopAll();
 toast("脚本已经停止");
});

while(true){
    device.keepScreenOn()
    是否有最新消息();  
};






