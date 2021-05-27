"ui";
ui.layout(
    <vertical >
    <appbar>
    <toolbar title="仅供学习交流 切勿用于非法用途 " />
    <tabs id="tabs"/>
    </appbar>
    <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" />
    <viewpager id="v">
    <vertical>
    <input id="name" hint="这里输入你要说的话"/>
    <button id="a1" text="聊欢轰炸"/>
    <button id="a2" text="对对轰炸"/>
    <button id="a3" text="佩佩轰炸"/>
    <button id="a4" text="9D同城聊欢"/>
    <button id="a5" text="9D二和一"/>
    <button id="a6" text="9D对对"/>
    <button id="a7" text="9D翻页对对"/>
    <button id="a8" text="9D佩佩"/>

    </vertical>
    <vertical>
    <vertical>
    <button id="a9" text="3B同城聊欢"/>
    <button id="a10" text="3B二和一"/>
    <button id="a11" text="3B对对"/>
    <button id="a12" text="3B翻页对对"/>
    <button id="a13" text="3B佩佩"/>
    <button id="a14" text="B1同城聊欢"/>
    <button id="a15" text="B1二和一"/>
    <button id="a16" text="B1对对"/>
    <button id="a17" text="B1翻页对对"/>
    <button id="a18" text="B1佩佩"/>

    </vertical>
    </vertical>
    <vertical>
    <button id="a19" text="F3同城聊欢"/>
    <button id="a20" text="F3二和一"/>
    <button id="a21" text="F3对对"/>
    <button id="a22" text="F3翻页对对"/>
    <button id="a23" text="F3佩佩"/>
   
    </vertical>
    </viewpager>
    </vertical>
);
ui.v.setTitles(["脚本集合","2","3"])
ui.tabs.setupWithViewPager(ui.v)

//var IMEI=device.getIMEI()
//var 激活码=IMEI.slice(0,1)+IMEI.slice(4,7)+"ljw"
//var 填写的激活码=ui.abc.getText()
ui.autoService.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if(checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    };
    if(!checked && auto.service != null){
        auto.service.disableSelf();
    };
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

ui.a1.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a1);
    };
});

function a1(){
    toast("无障碍已开始");//提示框
    sleep(500);
    launch("com.sh.shuihulu.kiwi");//运行APP
  while(true){
     if(id ("iv_msg").exists()){
         sleep(300)
         id("iv_msg").find().click()
     };
     a ();
    };

};

function a (){
    var name = ui.name.getText();
    sleep(300);
    if(text ("残忍离开").exists()){
        sleep(200);
        back();
        sleep(300);      
    };
    var u=id ("tv_nickname").find();
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
                sleep(200)
                click("我知道了")
                sleep(500)
            }
            if(id("et_content").exists()){
             sleep(200);
             id("et_content").find().click();
             sleep(500);
             setText(name);
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
    b ();
};

function b (){
    sleep(300);
    if (id("undefined").exists()){
      sleep(200);
      back();
      sleep(200);
    };
    sleep(100);
    className("androidx.recyclerview.widget.RecyclerView").scrollForward();//滑页
    sleep(200);
    a ();
}

ui.a2.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a2);
    };
});

function a2(){
    var name = ui.name.getText();
 toast("无障碍已开始");//提示框
 sleep(1000);
 launch("com.wemomo.matchmaker");//运行APP
 while(true){
 if(text("聊天").exists()){
     click("聊天");
     sleep (1000);
     break;
 }};
 className("androidx.recyclerview.widget.RecyclerView").scrollForward();//滑页
 while(true){
    var u=id ("main").find();
    var e=u.length
    toast(e);
    for(var i=1;i<e;i++){  
        var tv=u[i];
        if(text("进入房间")){
            sleep(200);
            id("iv_dialog_close").find().click();
            sleep(300);
        }
        if(tv){
            var tr=tv.bounds();
            sleep(300);
            click(tr.centerX(),tr.centerY());
            sleep(1000);
            if(text("请输入消息...").exists()){
             sleep(200);
             click("请输入消息...");
             sleep(500);
             setText(name);
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
        };
    };
    className("androidx.recyclerview.widget.RecyclerView").scrollForward();//滑页
    sleep(1200);
    events.observeKey();
 events.onKeyDown("volume_up",function(event){
 engines.stopAll();
 toast("脚本已经停止");
});

};
};

ui.a3.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a3);
    };
});

function a3(){
    var name = ui.name.getText();
    toast("无障碍已开始");//提示框
    sleep(1000);
   launch("com.jiaoliuqu.peipei");//运行APP
  while(true){
     if(text("消息").exists()){
         //unreamsg=id ("tvTabViewNavigation").findOnce(0);//获取新信息的所在位置
        // sleep(200);
         //x1=unreamsg.bounds().centerX();//新消息的坐标
         //y1=unreamsg.bounds().centerY();//新消息的坐标y
         //sleep(200);
         //click (x1,y1);//点击新消息
         //sleep(500);//等待
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
                 sleep(500);
                 if(id("editContent").findOne (1000)!=null){
                  setText(name);
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
             };
         };
         className("androidx.recyclerview.widget.RecyclerView").scrollForward();//滑页
         sleep(700);
     
         events.observeKey();
         events.onKeyDown("volume_up",function(event){
          engines.stopAll();
          toast("脚本已经停止");
         });
         
     };
     

};
ui.a4.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a4);
    };
});

function a4(){
    require ("./9D聊欢自动");
};

ui.a5.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a5);
    };
});

function a5(){
    require ("./9D二合一");
};

ui.a6.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a6);
    };
});

function a6(){
    require ("./9D对对");
};
ui.a7.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a7);
    };
});

function a7(){
    require ("./9D翻页对对");
};
ui.a8.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a8);
    };
});

function a8(){
    require ("./9D配配制动");
};
ui.a9.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a9);
    };
});

function a9(){
    require ("./3B聊欢自动");
};
ui.a10.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a10);
    };
});

function a10(){
    require ("./3B二合一");
};
ui.a11.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a11);
    };
});

function a11(){
    require ("./3B对对");
};
ui.a12.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a12);
    };
});

function a12(){
    require ("./3B翻页对对");
};
ui.a13.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a13);
    };
});

function a13(){
    require ("./3B配配制动");
};
ui.a14.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a14);
    };
});

function a14(){
    require ("./B1聊欢自动");
};
ui.a15.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a15);
    };
});

function a15(){
    require ("./B1二合一");
};
ui.a16.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a16);
    };
});

function a16(){
    require ("./B1对对");
};
ui.a17.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a17);
    };
});

function a17(){
    require ("./B1翻页对对");
};
ui.a18.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a18);
    };
});

function a18(){
    require ("./B1配配制动");
};
ui.a19.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a19);
    };
});

function a19(){
    require ("./F3聊欢自动");
};
ui.a20.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a20);
    };
});

function a20(){
    require ("./F3二合一");
};
ui.a21.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a21);
    };
});

function a21(){
    require ("./F3对对");
};
ui.a22.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a22);
    };
});

function a22(){
    require ("./F3翻页对对");
};
ui.a23.click(function(){
    if(auto.service == null){
        toast("请先开启无障碍");
    }else{
        threads.shutDownAll();
        threads.start(a23);
    };
});

function a23(){
    require ("./F3配配制动");
};

