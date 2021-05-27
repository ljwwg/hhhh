



console.show();//显示控制台
console.setPosition(200,200 );
var w =console.rawInput("这里输入你要说的话" );


console.hide();//隐藏控制台、
while(true){ 
    a() ;  //循环运行子程序
};

function a (){
     sleep(300);
     var u=id ("ll_sessionitem").find();
     sleep(100);
     var e=u.length-1
     toast(e)
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
         sleep(500)
         if(text("请输入信息…")){
             sleep(200);
             //id("et_chat").find().click();
             click("请输入信息…");
             sleep(500);
             setText(w);
             sleep(600);
             click("发送");
             sleep (300);
             back ();
             sleep(500);
             sleep(500);
            }else{
             sleep(300);
              back();
             sleep(200);
              toast("官方消息");
            };           
        };
    };
    className ("android.support.v7.widget.RecyclerView").scrollForward();
    sleep(300);
};
 
events.observeKey();
events.onKeyDown("volume_up",function(event){
engines.stopAll();
 toast("脚本已经停止");
});
 

