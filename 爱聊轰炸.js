
console.show();//显示控制台
console.setPosition(200,200 );
var w =console.rawInput("这里输入你要说的话" );
console.hide();//隐藏控制台
程序();

function 程序(){
   sleep(500)
  launch("com.mosheng");//运行APP
 while(true){
    if(text("消息").exists()){  
        click("消息");
        sleep (1000);
        break;
    };
};
className("androidx.recyclerview.widget.RecyclerView").scrollForward();//滑页
while(true){
    var u=id ("com.mosheng:id/rl_header_layout").find();
    var e=u.length-1
    toast(e);
    for(var i=1;i<e;i++){
        var tv=u[i];
        if(tv){
            var tr=tv.bounds();
            sleep(500);
            click(tr.centerX(),tr.centerY());
            sleep(1000);
            if(id("com.mosheng:id/editText").exists()){
                sleep(200);
                
                id("com.mosheng:id/editText").find().click();
                sleep(500);
                setText(w);
                sleep(1200);
               
                if(text("发送")){
                    sleep(200);
                    click("发送");
                    sleep(300);
                    id("com.mosheng:id/imageLeftReturn").find().click();
                    sleep(200);
                }else{
                    sleep(200);
                    id("com.mosheng:id/imageLeftReturn").find().click();
                    sleep(300);
                };
                
            }else{
             sleep(300);
             back();
             sleep(200);
             toast("官方消息");
             sleep(200);
            };
        };
    };
    className("androidx.recyclerview.widget.RecyclerView").scrollForward();//滑页
    sleep(1200);
};


};





device.keepScreenOn();
events.observeKey();
events.onKeyDown("volume_up",function(event){//音量加停止运行
 engines.stopAll();
 toast("脚本已经停止");
});

