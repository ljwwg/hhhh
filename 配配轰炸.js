
console.show();//显示控制台
console.setPosition(200,200 );
var w =console.rawInput("这里输入你要说的话" );
console.hide();//隐藏控制台
程序();

function 程序(){
   sleep(500);
  launch("com.jiaoliuqu.peipei");//运行APP
 while(true){
    if(text("消息").exists()){
       
        break;
    };
};
sleep (300);
className("androidx.recyclerview.widget.RecyclerView").scrollForward();//滑页
sleep(200);
while(true){
    sleep(300);
    if (id("llContentView").exists()){
        sleep(300);
        click("取消");
        sleep(200);
    };
    sleep (500);
    var u=id ("rlRoot").find();
    var e=u.length-7
    toast(e);
    for(var i=1;i<e;i++){
        var tv=u[i];
        if(tv){
            sleep(300);
         if (id("llContentView").exists()){
             sleep(300);
             click("取消");
             sleep(200);
            };
            sleep(500);
            var tr=tv.bounds();
            sleep(500);
            click(tr.centerX(),tr.centerY());
            sleep(1500);
           
            if(id("com.jiaoliuqu.peipei:id/imgSendError").exists()){
                sleep(500);
                toast("对方已拉黑跳过");
                sleep(200);
                back();

            }else{
                if(id("editContent").findOne (1000)!=null){
                    setText(w);
                    sleep(800);
                    click("发送");
                    sleep(500);
                    back();
                    sleep(500);
                   }else{
                       sleep(200);
                       back();
                       sleep(300);
                   };
            }
            
        };
    };
    className("androidx.recyclerview.widget.RecyclerView").scrollForward();//滑页
    sleep(700);
};


};



