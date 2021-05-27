



function 获取回复(message){
    var url = "http://www.tuling123.com/openapi/api";
    var r = http.postJson(url, {
        key: "c865e530df504ff1ab92093577a99ce7",
        info: message,
    });
    return r.body.json().text;//网站返回的文字
};
function 最新消息() {
    var f=id("com.iksocial.queen:id/messageText").find().size()-1;//获取页面有多少条消息
    //sleep(300)//等待
    if(f == -1){
        sleep(200);
        toast("没有检测到消息 自定义回复");
        sleep(200);
        var a = "你好"
        return a; //获取到的文字定义到a
    }else{
        var a=id("com.iksocial.queen:id/messageText").find().get(f).text();//获取页面最新的一条消息
        sleep(300);//等待
        //click ("输入消息...");
        id ("com.iksocial.queen:id/input_area").find().click();
        sleep(200);
        back();
        sleep(200);
        return a; //获取到的文字定义到a

    };
   
};
function 发送回复(){
 if(id("com.iksocial.queen:id/input_area").exists()){//判断是不是npc
    sleep(300)//等待
    setText(获取回复(最新消息()))//粘贴机器人的文字
    sleep (700);//等待
    //click("发送");
    id("com.iksocial.queen:id/messageSendButton").find().click()//点击ID控件
    sleep (500);//等待
};
};
function 是否有最新消息(){
    if (id("com.iksocial.queen:id/message_num").exists()){//扫描新消息的控件ID
        sleep(200);
        click("消息");
        sleep(100);
        click("消息");
        sleep(500);
        unreamsg=id ("com.iksocial.queen:id/unread_badger_num").findOnce(1)//获取新信息的所在位置
        
        if (unreamsg != null ){
            unreamsg=id ("com.iksocial.queen:id/unread_badger_num").findOnce(0)//获取新信息的所在位置
            x1=unreamsg.bounds().centerX();//新消息的坐标
            y1=unreamsg.bounds().centerY();//新消息的坐标y
            click (x1,y1);//点击新消息
            sleep(1000);//等待
            if(id("com.iksocial.queen:id/input_area").findOne (2000)==null){//检查是不是官方的信息
                back();//按一下返回
            }else{
               发送回复() ;//调用子程序
                sleep(500);//等待
                sleep(500);
                back();//返回
                sleep(500);//等待
            };
        };
    
    };
};

events.observeKey();
events.onKeyDown("volume_up",function(event){
 engines.stopAll();
 toast("脚本已经停止");
});

while(true){
    是否有最新消息() ;  //循环运行子程序
};