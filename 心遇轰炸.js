



console.show();//显示控制台
console.setPosition(200,200 );
var w =console.rawInput("这里输入你要说的话" );


console.hide();//隐藏控制台
程序();

function 程序(){
    sleep(500);
    launch("com.netease.moyi");//运行APP
  while(true){
     if(text ("消息").exists()){
         sleep(300);
          click("消息");
     };
    a ();
};
};


function a (){
    sleep(300);
    var u=id ("com.netease.moyi:id/nameView").find();
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
            sleep(500)         
        };
        if (id("com.netease.moyi:id/editTextMessage").findOne(1500)!=null){
            sleep(500);
            id ("com.netease.moyi:id/editTextMessage").find().click();
            sleep(300);
            setText(w);
            if(text("发送").exists()){
                sleep(200);
                click("发送");
                sleep(500);
                back ();
                sleep(300);
                back();            
            }
        }else{
            sleep(300);
            toast("官方消息");
            sleep(200);
           back();
        };


    }  ;
        
    
  className ("android.support.v7.widget.RecyclerView").scrollForward()

    sleep(700);

};



    
 
events.observeKey();
events.onKeyDown("volume_up",function(event){
engines.stopAll();
 toast("脚本已经停止");
});
 