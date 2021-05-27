


console.show();//显示控制台
console.setPosition(200,200 );
var w =console.rawInput("这里输入你要说的话" );


console.hide();//隐藏控制台
程序();

function 程序(){
    sleep(500);
    launch("com.sh.shuihulu.kiwi");//运行APP
  while(true){
     if(id ("iv_msg").exists()){
         sleep(300);
         id("iv_msg").find().click();
     };
    a ();
};
};


function a (){
     sleep(300);
     if(text ("残忍离开").exists()){
         sleep(200);
         back();
         sleep(300);      
        };
     var u=id ("com.sh.shuihulu.kiwi:id/tv_nickname").find();
     sleep(100);
     var e=u.length-1
     sleep(100);
     for(var i=1;i<e;i++){
         sleep(100);
         var tv=u[i];
         sleep(100);
         if(tv){
             sleep(300);
             if(text ("残忍离开").exists()){
                 sleep(200);
                 back();
                 sleep(300);      
                };
             var tr=tv.bounds();
             sleep(200);
             click(tr.centerX(),tr.centerY());
             sleep(500)
             if(text("该用户违规，已经被封号").exists()){
                 sleep(200);
                 click("我知道了");
                 sleep(500);
               };
              if (text("该用户以注销").exists()){
                 sleep(200);
                 click("我知道了");
                 sleep(500)   
                };
            
             if(id("com.sh.shuihulu.kiwi:id/iv_resend").exists()){
                 sleep(300);
                 toast("被对方拉黑 跳过");
                 sleep(300);
                 back();
                 sleep(300);
 
                }else{
                 if(id("et_content").exists()){
                     sleep(200);
                     id("et_content").find().click();
                     sleep(500);
                     setText(w);
                     sleep(600);
                     click("发送");
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
 
      
    };
     
     sleep(100);
     className("androidx.recyclerview.widget.RecyclerView").scrollForward();//滑页
     sleep(200);
};
 
events.observeKey();
events.onKeyDown("volume_up",function(event){
engines.stopAll();
 toast("脚本已经停止");
});
 