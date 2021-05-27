




console.show();//显示控制台
console.setPosition(200,200 );
var w =console.rawInput("这里输入你要说的话" );


console.hide();//隐藏控制台
程序();

function 程序(){
    sleep(500);
    launch("com.iksocial.queen");//运行APP
  while(true){
     if(text ("消息").exists()){
         sleep(300);
         click("消息")
        };
    a ();
};
};


function a (){
     sleep(300);
     var u=id ("com.iksocial.queen:id/avatar_container").find();
     sleep(100);
     var e=u.length-1
     sleep(100);
     for(var i=1;i<e;i++){
         sleep(100);
         var tv=u[i];
         sleep(100);
         if(tv){
             sleep(300);
             var tr=tv.bounds();
             sleep(200);
             click(tr.centerX(),tr.centerY());
             sleep(1000)
             
                 if(id("input_area").exists()){
                     sleep(200);
                     id("input_area").find().click();
                     sleep(500);
                     setText(w);
                     sleep(600);
                     //click("发送");
                     id ("messageSendButton").find().click();
                     sleep(200);
                     if (id("tv_confirm").exists()){
                         sleep(100);
                         id ("tv_confirm").find().click();
                        };
                     sleep (300);
                     back ();
                     sleep(500);
                     back();
                     sleep(500);
                    }else{
                     sleep(300);
                     back();
                     sleep(200);
                     toast("官方消息");
                    };
 
             
             
         };
 
      
    };
     
     sleep(100);
     className ("android.support.v7.widget.RecyclerView").scrollForward();
     sleep(200);
};
 
events.observeKey();
events.onKeyDown("volume_up",function(event){
engines.stopAll();
 toast("脚本已经停止");
});
 