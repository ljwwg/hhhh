
console.show();//显示控制台
console.setPosition(200,200 );
var w =console.rawInput("这里输入你要说的话" );
console.hide();//隐藏控制台
程序();

function 程序(){
   sleep(500);
  launch("com.wemomo.matchmaker");//运行APP
 while(true){
    if(text("聊天").exists()){
        click("聊天");
        sleep (1000);
        break;
    };
}};

className("androidx.recyclerview.widget.RecyclerView").scrollForward();//滑页
while(true){
    sleep(200);
    var u=id ("main").find();
    var e=u.length
    sleep(300);
    for(var i=1;i<e;i++){  
        var tv=u[i];
        if(text("进入房间")){
            sleep(200);
            id("iv_dialog_close").find().click();
            sleep(300);
        };
        if(tv){
            var tr=tv.bounds();
            sleep(300);
            click(tr.centerX(),tr.centerY());
            sleep(1000);
            
            if (id("com.wemomo.matchmaker:id/chat_item_error_message").exists()){
                toast("被拉黑。。正在删除对方");
                sleep(200);
                id("com.wemomo.matchmaker:id/iv_menu").find().click();
                sleep(700);
                click("拉黑");
                sleep(700);
                click("确认拉黑");
                sleep(600);
            }else{
                if(text("请输入消息...").exists()){
                    sleep(200);
                    click("请输入消息...");
                    sleep(500);
                    setText(w);
                    sleep(1200);
                    id("com.wemomo.matchmaker:id/iv_input_btn_send").find().click();//点击ID控件
                    sleep(500);
                    id("iv_back").find().click();
                    sleep(300);
                }else{
                 sleep(300);
                 back();
                 sleep(200);
                 toast("官方消息");
                 sleep(200);
                };

            }
          
        };
    };
    className("androidx.recyclerview.widget.RecyclerView").scrollForward();//滑页
    sleep(1200);
};


device.keepScreenOn();
events.observeKey();
events.onKeyDown("volume_up",function(event){//音量加停止运行
 engines.stopAll();
 toast("脚本已经停止");
});

