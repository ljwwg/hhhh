
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
    var f=id("tvContent").find().size()-1;//获取页面有多少条消息
    if(f == -1){
        sleep(200);
        toast("未检测到消息 自定义回复");
        a = "你好";
    }else{
        var a=id("tvContent").find().get(f).text();//获取页面最新的一条消息
        sleep(300);//等待
        id("editContent").find().click();//点输入框
        //id("rlEditText").find().click();
        sleep(200);
        back();
        sleep(200);
        return a; //获取到的文字定义到a
    };
  
};
function 发送回复(){
    sleep (200);
 if(id("rlEditText").exists()){//判断输入框是不是npc
    while(true){
        sleep(500);
        
        if(id("llNextConversation").exists()){//红包标志
           
            if(id("llRedPacket").exists()){//下一条消息按键
                sleep(300);
                toast("空消息 下一条");//弹出消息框
                sleep(200);
            }else{
                sleep(400);
                setText(获取回复(最新消息()));//粘贴机器人的文字
                sleep(300);
                click("发送");//点击发送按钮
                sleep (3000);//等待
            };
            sleep(300);
            id("llNextConversation").find().click();//点下一条按钮
            sleep(700);//等待时间
        }else{
            sleep(300);
            toast("没消息了");
            sleep(300);
           // back();
            //sleep(300);
            //是否有最新消息();
            //break;
        };
    };
};
};

function 是否有最新消息(){
    sleep(1000);
        launch("com.jiaoliuqu.peipei");//运行陪陪软件
        //聊天界面();
        sleep(400);
    if (id("tvMessageCount").exists()){//扫描新消息的控件ID
        unreamsg=id ("tvMessageCount").findOnce(0)//获取新信息的所在位置
        x1=unreamsg.bounds().centerX();//新消息的坐标
        y1=unreamsg.bounds().centerY();//新消息的坐标y
        click (x1+200,y1);//点击新消息
        sleep(500);//等待
        if(id("editContent").findOne (1000)==null){//检查是不是官方的信息
            back();//返回
            sleep(500);//等待
        }else{//如果扫描到有新消息控件
            挡住输入框();
            发送回复() ;//调用子程序
            sleep(500);//等待
            back();//按一下返回
            sleep(600);//等待0.6秒
        };
    };
};
function 挡住输入框(){
    sleep(400);
    if(id("tvReplyFast").findOne (1000)==null){//检查是不是官方的信息
        sleep(200);
        id ("com.xingjiabi.shengsheng:id/tvReplyFast").find().click();//点击按钮
        sleep(200);
    }else{
        sleep(200);
        id ("com.xingjiabi.shengsheng:id/tvReplyFast").find().click();//点击按钮
        sleep(200);
    };
};

while(true){
    device.keepScreenOn()
    if(id ("negativeButton").exists()){
        sleep (200);
        click("取消");
        sleep(200);
    };
    是否有最新消息() ;  //循环运行子程序
};

events.observeKey();
events.onKeyDown("volume_up",function(event){//音量加停止运行
 engines.stopAll();
 toast("脚本已经停止");
});

