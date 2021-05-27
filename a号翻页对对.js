
function 获取回复(message){
    var url = "http://www.tuling123.com/openapi/api";
    var r = http.postJson(url, {
        key: "c865e530df504ff1ab92093577a99ce7",
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
if(id("input_chat_et").exists()){//判断是不是npc
    sleep(300)//等待
    setText(获取回复(最新消息()))//粘贴机器人的文字
    sleep (700);//等待
    id("com.wemomo.matchmaker:id/iv_input_btn_send").find().click()//点击ID控件
    sleep (500);//等待
};
};
function 是否有最新消息(){
     进入房间();
    if (id("tab_hint").exists()){//扫描新消息的控件ID
        unreamsg=id ("tv_unreadmsg_count").findOnce(1)//获取新信息的所在位置
        
        if (unreamsg != null ){
            unreamsg=id ("tv_unreadmsg_count").findOnce(0)//获取新信息的所在位置
            x1=unreamsg.bounds().centerX();//新消息的坐标
            y1=unreamsg.bounds().centerY();//新消息的坐标y
            click (x1+200,y1);//点击新消息
            sleep(1000);//等待
            if(id("input_chat_et").findOne (1000)==null){//检查是不是官方的信息
                //发送回复() ;//调用子程序
              //  sleep(500)//等待
                back();//按一下返回
                //toast ("消息回复完毕")
                //sleep(600)//等待0.6秒
            }else{//如果扫描到有新消息控件
               发送回复() ;//调用子程序
                sleep(500);//等待
                //back()//按一下返回
                //toast ("官方消息")
                sleep(500);
                back();//返回
                sleep(500);//等待
            };
        }else{
            sleep (200);
            className("androidx.recyclerview.widget.RecyclerView").scrollForward();//滑页
            sleep (200);
        };
    
    }else{
        sleep (400);
        id("com.wemomo.matchmaker:id/maintab_bottom_message").find().click();//
    };
};

function 进入房间(){
if(text("向你推荐相亲对象")){
    id("iv_dialog_close").find().click()//点击ID控件
    
    sleep(200);
    
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
    是否有最新消息() ;  //循环运行子程序
};

