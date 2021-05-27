

function 获取回复(message){
    var url = "http://www.tuling123.com/openapi/api";
    var r = http.postJson(url, {
        key: "511aec3cf7784b128063f33108c484fd",
        info: message,
    });
    return r.body.json().text;//网站返回的文字
};
function 最新消息() {
    var f=id("michat_tv_msgitem_message").find().size()-1;//获取页面有多少条消息
    //sleep(300)//等待
    if(f == -1){
        sleep(200);
        toast("没有检测到消息 自定义回复");
        sleep(200);
        var a = "你好"
        return a; //获取到的文字定义到a
    }else{
        var a=id("michat_tv_msgitem_message").find().get(f).text();//获取页面最新的一条消息
        sleep(300);//等待
        return a; //获取到的文字定义到a

    }
   
};
function 发送回复(){
    sleep(1000);
if(text("请输入信息…")){//判断是不是npc
    sleep(300)//等待
    setText(获取回复(最新消息()))//粘贴机器人的文字
    sleep (700);//等待
    click("发送");
    sleep(500);
    id("com.lanhu.qiaoyu:id/iv_back").find().click()//点击ID控件
    sleep (500);//等待
};
};
function 是否有最新消息(){
    if (id("rtv_msg_tip").exists()){//扫描新消息的控件ID
        unreamsg=id ("tv_unreader").findOnce(0)//获取新信息的所在位置
        
        if (unreamsg != null ){
            unreamsg=id ("tv_unreader").findOnce(0)//获取新信息的所在位置
            x1=unreamsg.bounds().centerX();//新消息的坐标
            y1=unreamsg.bounds().centerY();//新消息的坐标y
            click (x1+200,y1);//点击新消息
            sleep(1000);//等待
            if(text("请输入信息…").findOne (1500)==null){//检查是不是官方的信息
                back();//按一下返回
            }else{//如果扫描到有新消息控件
               发送回复() ;//调用子程序
                sleep(500);//等待
            };
        }else{
            sleep(300);
            className ("android.support.v7.widget.RecyclerView").scrollForward();
            sleep(200);
        };
    
    }else{
        sleep (400);
        id("com.wemomo.matchmaker:id/maintab_bottom_message").find().click();//
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