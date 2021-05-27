
function 获取回复(message){
    
        var url = "http://www.tuling123.com/openapi/api";
        var r = http.postJson(url, {
            key: "511aec3cf7784b128063f33108c484fd",
            info: message,
        });
        return r.body.json().text;//网站返回的文字
    
   
};
function 最新消息() {
    id ("editTextMessage").find().click();
    sleep(200);
    back();
    sleep(200);
    var f=id("nim_message_item_text_body").find().size()-1;//获取页面有多少条消息
    sleep(300);//等待 
    var a=id("nim_message_item_text_body").find().get(f).text();//获取页面最新的一条消息
    sleep(300);//等待
    sleep(200);
    return a; //获取到的文字定义到a
};
function 发送回复(){
if(id("editTextMessage").exists()){//判断是不是npc
    sleep(300);//等待
    setText(获取回复(最新消息()));//粘贴机器人的文字
    sleep (3500);//等待
    click("发送");//点击
    sleep (500);//等待
};
};
function 是否有最新消息(){
    //sml_move(400, 1700, 800, 230, 1000);
    if (id("unreadMsgCountView").exists()){//
        unreamsg=id ("unreadMsgCountView").findOnce(1);//
        if(unreamsg != null){
            unreamsg=id ("unreadMsgCountView").findOnce(0);//
            x1=unreamsg.bounds().centerX();//
            y1=unreamsg.bounds().centerY();//
            click (x1+200,y1);//
            sleep(500);//
            if(id("editTextMessage").findOne (1000)==null){//检查是不是官方的信息
                back();//返回
                sleep(500);//等待
            }else{//如果扫描到有新消息控件
                if(id("pic_bg").findOnce(200)!=null){
                    sleep(300);//等待
                    id("editTextMessage").find().click();
                    sleep(500);
                    setText("在干嘛啊 亲");//粘贴机器人的文字
                    sleep (3500);//等待
                    click("发送");//点击
                    sleep (500);//等待  
                    back();
                    sleep(500);
                    back();
                }else{
                 发送回复() ;//
                 sleep(500);//
                 back();//
                 sleep(600);//
                };
                
            };

        };
        
       
    };
};

while(true){
    是否有最新消息() ;  //循环运行子程序
    device.keepScreenOn()
};

events.observeKey();
events.onKeyDown("volume_up",function(event){
 engines.stopAll();
 toast("脚本已经停止");
});

