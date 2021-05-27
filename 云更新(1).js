

"ui";
ui.layout(
    <vertical >
    <appbar>
    <toolbar title="仅供学习交流 切勿用于非法用途 " />
    <tabs id="tabs"/>
    </appbar>
    <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" />
    <vertical>
    <button id="b1" text="A号聊欢"/>
    <button id="b2" text="B号聊欢"/>
    <button id="b3" text="C号聊欢"/>
    <button id="b4" text="D号聊欢"/>
    <button id="b5" text="A号对对"/>
    <button id="b6" text="B号对对"/>
    <button id="b7" text="C号对对"/>
    <button id="b8" text="D号对对"/>
    </vertical>
    <vertical>
    <button id="b9" text="A号配配"/>
    <button id="b10" text="B号配配"/>
    <button id="b11" text="C号爱聊"/>
    <button id="b12" text="D号爱聊"/>
    <button id="b13" text="A号翻页对对"/>
    <button id="b14" text="B号翻页对对"/>
    <button id="b15" text="C号翻页对对"/>
    <button id="b16" text="D号翻页对对"/>
    <horizontal>
    </horizontal>
    </vertical>
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
  threads.start(程序);   
  toast("联网获取脚本中……");
  device.setMusicVolume(0);
 
});

ui.b2.click(function(){
  threads.shutDownAll();
  threads.start(好好);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

ui.b3.click(function(){
  threads.shutDownAll();
  threads.start(b3);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

ui.b4.click(function(){
  threads.shutDownAll();
  threads.start(b4);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

ui.b5.click(function(){
  launch("com.wemomo.matchmaker");//运行APP
  threads.shutDownAll();
  threads.start(b5);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});


ui.b6.click(function(){
  launch("com.wemomo.matchmaker");//运行APP
  threads.shutDownAll();
  threads.start(b6);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

ui.b7.click(function(){
  launch("com.wemomo.matchmaker");//运行APP
  threads.shutDownAll();
  threads.start(b7);
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

ui.b9.click(function(){
  threads.shutDownAll();
  threads.start(b9);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

ui.b10.click(function(){
  threads.shutDownAll();
  threads.start(b10);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

ui.b11.click(function(){
  threads.shutDownAll();
  threads.start(b11);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

ui.b12.click(function(){
  threads.shutDownAll();
  threads.start(b12);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

ui.b13.click(function(){
  launch("com.wemomo.matchmaker");//运行APP
  threads.shutDownAll();
  threads.start(b13);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

ui.b14.click(function(){
  launch("com.wemomo.matchmaker");//运行APP
  threads.shutDownAll();
  threads.start(b14);
 toast("联网获取脚本中……");
 device.setMusicVolume(0);
});

ui.b15.click(function(){
  launch("com.wemomo.matchmaker");//运行APP
  threads.shutDownAll();
  threads.start(b15);
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

function 好好(){
    var config = {
        appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
        appKey: 'azC3Dy0z6dobXClvdlen0MGo',
      }
    var scriptName = "b号聊欢.js"
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
        toast("没获取到脚本 请联系作者 ")
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

function 程序(){
    var config = {
        appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
        appKey: 'azC3Dy0z6dobXClvdlen0MGo',
      }
    var scriptName = "a号聊欢.js"
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


function b3(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "c号聊欢.js"
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

function b4(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "d号聊欢.js"
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
function b5(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "a号对对.js"
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
function b6(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "b号对对.js"
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
function b7(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "c号对对.js"
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
  var scriptName = "d号对对.js"
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
  var scriptName = "a号配配.js"
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
function b10(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "b号配配.js"
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
function b11(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "c号爱聊.js"
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
function b12(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "d号爱聊.js"
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
function b13(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "a号翻页对对.js"
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
function b14(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "b号翻页对对.js"
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
function b15(){
  var config = {
      appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
      appKey: 'azC3Dy0z6dobXClvdlen0MGo',
    }
  var scriptName = "c号翻页对对.js"
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
  var scriptName = "d号翻页对对.js"
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
