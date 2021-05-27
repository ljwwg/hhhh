

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
    <button id="b1" text="巧遇轰炸"/>
    <button id="b2" text="心遇轰炸"/>
    <button id="b4" text="心遇自动"/>
    <button id="b16" text="巧遇自动"/>
    <button id="b8" text="翻页心遇"/>
    <button id="b9" text="翻页巧遇"/>
    </vertical>
    <vertical>
    
    <horizontal>
    </horizontal>
    </vertical>
    </viewpager>
    </vertical>
);
ui.v.setTitles(["脚本合集"])
ui.tabs.setupWithViewPager(ui.v)

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

ui.b1.click(function(){
  threads.shutDownAll();
  threads.start(b1);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

ui.b2.click(function(){
  threads.shutDownAll();
  threads.start(b2);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

ui.b4.click(function(){
  threads.shutDownAll();
  threads.start(b4);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

ui.b9.click(function(){
  threads.shutDownAll();
  threads.start(b9);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

ui.b8.click(function(){
  launch("com.wemomo.matchmaker");//运行APP
  threads.shutDownAll();
  threads.start(b8);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});


ui.b16.click(function(){
  launch("com.wemomo.matchmaker");//运行APP
  threads.shutDownAll();
  threads.start(b16);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

function b4(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "心遇自动.js"
  var scriptPath=downloadScript(scriptName)
  log('开始执行下载的文件')
  engines.execScriptFile(scriptPath);
  log('结束执行下载的文件')
  function downloadScript(scriptName) {
    // 查找指定名字脚本的下载链接
    var scriptUrl = util.format('https://n2y09qsw.api.lncld.net/1.1/classes/_File?where={"name":"%s"}', scriptName)
    var url = encodeURI(scriptUrl)
    var r = http.get(url, {
      headers: {
        "X-LC-Id": config.appId,
        "X-LC-Key": config.appKey,
        "Content-Type": "application/json"
      }
    }).body.json()
    console.log(r)
    if (r.results && r.results.length > 0 && r.results[0].name === scriptName) {
      toast("获取成功 已启动")
      console.log(r.results[0].url)
      var scriptPath = downloadScript(r.results[0].url)
      console.log('下载完毕, scriptPath=', scriptPath)
      return scriptPath
    } else {
      log("没获取到脚本 请联系作者")
    }
    // 这是知道了下载链接,下载脚本
    function downloadScript(scriptUrl) {
      var r = http.get(scriptUrl).body.bytes()
      var scriptPath = './' + scriptName
      files.writeBytes(scriptPath, r)
      return scriptPath
    }
  }
  
};

function b9(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "翻页巧遇.js"
  var scriptPath=downloadScript(scriptName)
  log('开始执行下载的文件')
  engines.execScriptFile(scriptPath);
  log('结束执行下载的文件')
  function downloadScript(scriptName) {
    // 查找指定名字脚本的下载链接
    var scriptUrl = util.format('https://n2y09qsw.api.lncld.net/1.1/classes/_File?where={"name":"%s"}', scriptName)
    var url = encodeURI(scriptUrl)
    var r = http.get(url, {
      headers: {
        "X-LC-Id": config.appId,
        "X-LC-Key": config.appKey,
        "Content-Type": "application/json"
      }
    }).body.json()
    console.log(r)
    if (r.results && r.results.length > 0 && r.results[0].name === scriptName) {
      toast("获取成功 已启动")
      console.log(r.results[0].url)
      var scriptPath = downloadScript(r.results[0].url)
      console.log('下载完毕, scriptPath=', scriptPath)
      return scriptPath
    } else {
      log("没获取到脚本 请联系作者")
    }
    // 这是知道了下载链接,下载脚本
    function downloadScript(scriptUrl) {
      var r = http.get(scriptUrl).body.bytes()
      var scriptPath = './' + scriptName
      files.writeBytes(scriptPath, r)
      return scriptPath
    }
  }
  
};


function b8(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "翻页心遇.js"
  var scriptPath=downloadScript(scriptName)
  log('开始执行下载的文件')
  engines.execScriptFile(scriptPath);
  log('结束执行下载的文件')
  function downloadScript(scriptName) {
    // 查找指定名字脚本的下载链接
    var scriptUrl = util.format('https://n2y09qsw.api.lncld.net/1.1/classes/_File?where={"name":"%s"}', scriptName)
    var url = encodeURI(scriptUrl)
    var r = http.get(url, {
      headers: {
        "X-LC-Id": config.appId,
        "X-LC-Key": config.appKey,
        "Content-Type": "application/json"
      }
    }).body.json()
    console.log(r)
    if (r.results && r.results.length > 0 && r.results[0].name === scriptName) {
      toast("获取成功 已启动")
      console.log(r.results[0].url)
      var scriptPath = downloadScript(r.results[0].url)
      console.log('下载完毕, scriptPath=', scriptPath)
      return scriptPath
    } else {
      log("没获取到脚本 请联系作者")
    }
    // 这是知道了下载链接,下载脚本
    function downloadScript(scriptUrl) {
      var r = http.get(scriptUrl).body.bytes()
      var scriptPath = './' + scriptName
      files.writeBytes(scriptPath, r)
      return scriptPath
    }
  }
  
};

function b16(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "巧遇自动.js"
  var scriptPath=downloadScript(scriptName)
  log('开始执行下载的文件')
  engines.execScriptFile(scriptPath);
  log('结束执行下载的文件')
  function downloadScript(scriptName) {
    // 查找指定名字脚本的下载链接
    var scriptUrl = util.format('https://n2y09qsw.api.lncld.net/1.1/classes/_File?where={"name":"%s"}', scriptName)
    var url = encodeURI(scriptUrl)
    var r = http.get(url, {
      headers: {
        "X-LC-Id": config.appId,
        "X-LC-Key": config.appKey,
        "Content-Type": "application/json"
      }
    }).body.json()
    console.log(r)
    if (r.results && r.results.length > 0 && r.results[0].name === scriptName) {
      toast("获取成功 已启动")
      console.log(r.results[0].url)
      var scriptPath = downloadScript(r.results[0].url)
      console.log('下载完毕, scriptPath=', scriptPath)
      return scriptPath
    } else {
      log("没获取到脚本 请联系作者")
    }
    // 这是知道了下载链接,下载脚本
    function downloadScript(scriptUrl) {
      var r = http.get(scriptUrl).body.bytes()
      var scriptPath = './' + scriptName
      files.writeBytes(scriptPath, r)
      return scriptPath
    }
  }
  
};

function b1(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "巧遇轰炸.js"
  var scriptPath=downloadScript(scriptName)
  log('开始执行下载的文件')
  engines.execScriptFile(scriptPath);
  log('结束执行下载的文件')
  function downloadScript(scriptName) {
    // 查找指定名字脚本的下载链接
    var scriptUrl = util.format('https://n2y09qsw.api.lncld.net/1.1/classes/_File?where={"name":"%s"}', scriptName)
    var url = encodeURI(scriptUrl)
    var r = http.get(url, {
      headers: {
        "X-LC-Id": config.appId,
        "X-LC-Key": config.appKey,
        "Content-Type": "application/json"
      }
    }).body.json()
    console.log(r)
    if (r.results && r.results.length > 0 && r.results[0].name === scriptName) {
      toast("获取成功 已启动")
      console.log(r.results[0].url)
      var scriptPath = downloadScript(r.results[0].url)
      console.log('下载完毕, scriptPath=', scriptPath)
      return scriptPath
    } else {
      log("没获取到脚本 请联系作者")
    }
    // 这是知道了下载链接,下载脚本
    function downloadScript(scriptUrl) {
      var r = http.get(scriptUrl).body.bytes()
      var scriptPath = './' + scriptName
      files.writeBytes(scriptPath, r)
      return scriptPath
    }
  }
  
};

function b2(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "心遇轰炸.js"
  var scriptPath=downloadScript(scriptName)
  log('开始执行下载的文件')
  engines.execScriptFile(scriptPath);
  log('结束执行下载的文件')
  function downloadScript(scriptName) {
    // 查找指定名字脚本的下载链接
    var scriptUrl = util.format('https://n2y09qsw.api.lncld.net/1.1/classes/_File?where={"name":"%s"}', scriptName)
    var url = encodeURI(scriptUrl)
    var r = http.get(url, {
      headers: {
        "X-LC-Id": config.appId,
        "X-LC-Key": config.appKey,
        "Content-Type": "application/json"
      }
    }).body.json()
    console.log(r)
    if (r.results && r.results.length > 0 && r.results[0].name === scriptName) {
      toast("获取成功 已启动")
      console.log(r.results[0].url)
      var scriptPath = downloadScript(r.results[0].url)
      console.log('下载完毕, scriptPath=', scriptPath)
      return scriptPath
    } else {
      log("没获取到脚本 请联系作者")
    }
    // 这是知道了下载链接,下载脚本
    function downloadScript(scriptUrl) {
      var r = http.get(scriptUrl).body.bytes()
      var scriptPath = './' + scriptName
      files.writeBytes(scriptPath, r)
      return scriptPath
    }
  }
  
};
