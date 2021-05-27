"ui";
ui.layout(
    <vertical padding="1">
        <appbar>
        <text textSize="17sp"  textColor="white" text="仅供学习交流 切勿用于非法活动"/>
        <text textSize="17sp"  textColor="white" text="关闭请按音量加 否则下次启动会乱跳"/>
        <Switch textSize="16sp" id="autoService" textColor="white" text="无障碍服务" checked="{{auto.service != null}}" />
        
        <text textSize="16sp" id="name" textColor="white" text="请输入卡密"/>
        <input id="card" text=""/>
        <button id="login" text="登录"/>
        <button id="a1" text="聊欢轰炸"/>
        <button id="a2" text="对对轰炸"/>
        <button id="a3" text="自动聊欢"/>
        <button id="a4" text="自动对对"/>
        <button id="expires" text="获取过期时间"/>
        <button id="sw_notice" text="获取软件公告"/>
        <button id="check_version" text="检查软件版本"/>
        <button id="logout" text="退出登录"/>
        </appbar>
       
    </vertical>
);

var storages = storages.create("jhkm");
var content =storages.get("km");
if (content != null){
    ui.card.setText(content);
};

/* ↓ 将PJYSDK.js文件中的代码复制粘贴到下面 ↓ */


const PJYSDK = (function(){
    function PJYSDK(app_key, app_secret){
        http.__okhttp__.setMaxRetries(0);
        http.__okhttp__.setTimeout(10*1000);

        this.event = events.emitter();

        this.debug = true;
        this._lib_version = "v1.08";
        this._protocol = "https";
        this._host = "api.paojiaoyun.com";
        this._device_id = this.getDeviceID();
        this._retry_count = 9;
        
        this._app_key = app_key;
        this._app_secret = app_secret;
        
        this._card = null;
        this._username = null;
        this._password = null;
        this._token = null;
        
        this.is_trial = false;  // 是否是试用用户
        this.login_result = {
            "card_type": "",
            "expires": "",
            "expires_ts": 0,
            "config": "",
        };

        this._auto_heartbeat = true;  // 是否自动开启心跳任务
        this._heartbeat_gap = 60 * 1000; // 默认60秒
        this._heartbeat_task = null;
        this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};

        this._prev_nonce = null;
    }
    PJYSDK.prototype.SetCard = function(card) {
        this._card = card.trim();
    }
    PJYSDK.prototype.SetUser = function(username, password) {
        this._username = username.trim();
        this._password = password;
    }
    PJYSDK.prototype.getDeviceID = function() {
        let id = device.serial;
        if (id == null || id == "" || id == "unknown") {
            id = device.getAndroidId();
        }
        if (id == null || id == "" || id == "unknown") {
            id = device.getIMEI();
        }
        return id;
    }
    PJYSDK.prototype.MD5 = function(str) {
        try {
            let digest = java.security.MessageDigest.getInstance("md5");
            let result = digest.digest(new java.lang.String(str).getBytes("UTF-8"));
            let buffer = new java.lang.StringBuffer();
            for (let index = 0; index < result.length; index++) {
                let b = result[index];
                let number = b & 0xff;
                let str = java.lang.Integer.toHexString(number);
                if (str.length == 1) {
                    buffer.append("0");
                }
                buffer.append(str);
            }
            return buffer.toString();
        } catch (error) {
            alert(error);
            return "";
        }
    }
    PJYSDK.prototype.getTimestamp = function() {
        try {
            let res = http.get("http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp");
            let data = res.body.json();
            return Math.floor(data["data"]["t"]/1000);
        } catch (error) {
            return Math.floor(new Date().getTime()/1000);
        }
    }
    PJYSDK.prototype.genNonce = function() {
        const ascii_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let tmp = '';
        for(let i = 0; i < 20; i++) {
            tmp += ascii_str.charAt(Math.round(Math.random()*ascii_str.length));
        }
        return this.MD5(this.getDeviceID() + tmp);
    }
    PJYSDK.prototype.joinParams = function(params) {
        let ps = [];
        for (let k in params) {
            ps.push(k + "=" + params[k])
        }
        ps.sort()
        return ps.join("&")
    }
    PJYSDK.prototype.CheckRespSign = function(resp) {
        if (resp.code != 0 && resp.nonce === "" && resp.sign === "") {
            return resp
        }

        let ps = "";
        if (resp["result"]) {
            ps = this.joinParams(resp["result"]);
        }

        let s = resp["code"] + resp["message"] + ps + resp["nonce"] + this._app_secret;
        let sign = this.MD5(s);
        if (sign === resp["sign"]) {
            if (this._prev_nonce === null) {
                this._prev_nonce = resp["nonce"];
                return {"code":0, "message":"OK"};
            } else {
                if (resp["nonce"] > this._prev_nonce) {
                    this._prev_nonce = resp["nonce"];
                    return {"code": 0, "message": "OK"};
                } else {
                    return {"code": -98, "message": "轻点，疼~"};
                }
            }
        }
        return {"code": -99, "message": "轻点，疼~"};
    }
    PJYSDK.prototype.retry_fib = function(num) {
        if (num > 9) {
            return 34
        }
        let a = 0;
        let b = 1;
        for (i = 0; i < num; i++) {
            let tmp = a + b;
            a = b
            b = tmp
        }
        return a
    }
    PJYSDK.prototype._debug = function(path, params, result) {
        if (this.debug) {
            log("\n" + path, "\nparams:", params, "\nresult:", result);
        }
    }
    PJYSDK.prototype.Request = function(method, path, params) {
        // 构建公共参数
        params["app_key"] = this._app_key;

        method = method.toUpperCase();
        let url = this._protocol + "://" + this._host + path
        let max_retries = this._retry_count;
        let retries_count = 0;

        let data = {"code": -1, "message": "连接服务器失败"};
        do {
            retries_count++;
            let sec = this.retry_fib(retries_count);

            delete params["sign"]
            params["nonce"] = this.genNonce();
            params["timestamp"] = this.getTimestamp();
            let ps = this.joinParams(params);
            let s = method + this._host + path + ps + this._app_secret;
            let sign = this.MD5(s);
            params["sign"] = sign;

            let resp, body;
            try {    
                if (method === "GET") {
                    resp = http.get(url + "?" + ps + "&sign=" + sign);
                } else {  // POST
                    resp = http.post(url, params);
                }
                body = resp.body.string();
                data = JSON.parse(body);
                this._debug(method+'-'+path+':', params, data);
                
                let crs = this.CheckRespSign(data);
                if (crs.code !== 0) {
                    return crs;
                } else {
                    return data;
                }
            } catch (error) {
                log("[*] request error: ", error, sec + "s后重试");
                this._debug(method+'-'+path+':', params, body)
                sleep(sec*1000);
            }
        } while (retries_count < max_retries);

        return data;
    }
    /* 通用 */
    PJYSDK.prototype.GetHeartbeatResult = function() {
        return this._heartbeat_ret;
    }
    PJYSDK.prototype.GetTimeRemaining = function() {
        let g = this.login_result.expires_ts - this.getTimestamp();
        if (g < 0) {
            return 0;
        } 
        return g;
    }
    /* 卡密相关 */
    PJYSDK.prototype.CardLogin = function() {  // 卡密登录
        if (!this._card) {
            return {"code": -4, "message": "请先设置卡密"};
        }
        let method = "POST";
        let path = "/v1/card/login";
        let data = {"card": this._card, "device_id": this._device_id};
        let ret = this.Request(method, path, data);
        if (ret.code == 0) {
            this._token = ret.result.token;
            this.login_result = ret.result;
            if (this._auto_heartbeat) {
                this._startCardHeartheat();
            }
        }
        return ret;
    }
    PJYSDK.prototype.CardHeartbeat = function() {  // 卡密心跳，默认会自动调用
        if (!this._token) {
            return {"code": -2, "message": "请在卡密登录成功后调用"};
        }
        let method = "POST";
        let path = "/v1/card/heartbeat";
        let data = {"card": this._card, "token": this._token};
        let ret = this.Request(method, path, data);
        if (ret.code == 0) {
            this.login_result.expires = ret.result.expires;
            this.login_result.expires_ts = ret.result.expires_ts;
        }
        return ret;
    }
    PJYSDK.prototype._startCardHeartheat = function() {  // 开启卡密心跳任务
        if (this._heartbeat_task) {
            this._heartbeat_task.interrupt();
            this._heartbeat_task = null;
        }
        this._heartbeat_task = threads.start(function(){
            setInterval(function(){}, 10000);
        });
        this._heartbeat_ret = this.CardHeartbeat();
        
        this._heartbeat_task.setInterval((self) => {
            self._heartbeat_ret = self.CardHeartbeat();
            if (self._heartbeat_ret.code != 0) {
                self.event.emit("heartbeat_failed", self._heartbeat_ret);
            }
        }, this._heartbeat_gap, this);

        this._heartbeat_task.setInterval((self) => {
            if (self.GetTimeRemaining() == 0) {
                self.event.emit("heartbeat_failed", {"code": 10210, "message": "卡密已过期！"});
            }
        }, 1000, this);
    }
    PJYSDK.prototype.CardLogout = function() {  // 卡密退出登录
        this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};
        if (this._heartbeat_task) { // 结束心跳任务
            this._heartbeat_task.interrupt();
            this._heartbeat_task = null;
        }
        if (!this._token) {
            return {"code": 0, "message": "OK"};
        }
        let method = "POST";
        let path = "/v1/card/logout";
        let data = {"card": this._card, "token": this._token};
        let ret = this.Request(method, path, data);
        // 清理
        this._token = null;
        this.login_result = {
            "card_type": "",
            "expires": "",
            "expires_ts": 0,
            "config": "",
        };
        return ret;
    }
    PJYSDK.prototype.CardUnbindDevice = function() { // 卡密解绑设备，需开发者后台配置
        if (!this._token) {
            return {"code": -2, "message": "请在卡密登录成功后调用"};
        }
        let method = "POST";
        let path = "/v1/card/unbind_device";
        let data = {"card": this._card, "device_id": this._device_id, "token": this._token};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.SetCardUnbindPassword = function(password) { // 自定义设置解绑密码
        if (!this._token) {
            return {"code": -2, "message": "请在卡密登录成功后调用"};
        }
        let method = "POST";
        let path = "/v1/card/unbind_password";
        let data = {"card": this._card, "password": password, "token": this._token};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.CardUnbindDeviceByPassword = function(password) { // 用户通过解绑密码解绑设备
        let method = "POST";
        let path = "/v1/card/unbind_device/by_password";
        let data = {"card": this._card, "password": password};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.CardRecharge = function(card, use_card) { // 以卡充卡
        let method = "POST";
        let path = "/v1/card/recharge";
        let data = {"card": card, "use_card": use_card};
        return this.Request(method, path, data);
    }
    /* 用户相关 */
    PJYSDK.prototype.UserRegister = function(username, password, card) {  // 用户注册（通过卡密）
        let method = "POST";
        let path = "/v1/user/register";
        let data = {"username": username, "password": password, "card": card, "device_id": this._device_id};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.UserLogin = function() {  // 用户账号登录
        if (!this._username || !this._password) {
            return {"code": -4, "message": "请先设置用户账号密码"};
        }
        let method = "POST";
        let path = "/v1/user/login";
        let data = {"username": this._username, "password": this._password, "device_id": this._device_id};
        let ret = this.Request(method, path, data);
        if (ret.code == 0) {
            this._token = ret.result.token;
            this.login_result = ret.result;
            if (this._auto_heartbeat) {
                this._startUserHeartheat();
            }
        }
        return ret;
    }
    PJYSDK.prototype.UserHeartbeat = function() {  // 用户心跳，默认会自动开启
        if (!this._token) {
            return {"code": -2, "message": "请在用户登录成功后调用"};
        }
        let method = "POST";
        let path = "/v1/user/heartbeat";
        let data = {"username": this._username, "token": this._token};
        let ret = this.Request(method, path, data);
        if (ret.code == 0) {
            this.login_result.expires = ret.result.expires;
            this.login_result.expires_ts = ret.result.expires_ts;
        }
        return ret;
    }
    PJYSDK.prototype._startUserHeartheat = function() {  // 开启用户心跳任务
        if (this._heartbeat_task) {
            this._heartbeat_task.interrupt();
            this._heartbeat_task = null;
        }
        this._heartbeat_task = threads.start(function(){
            setInterval(function(){}, 10000);
        });
        this._heartbeat_ret = this.UserHeartbeat();

        this._heartbeat_task.setInterval((self) => {
            self._heartbeat_ret = self.UserHeartbeat();
            if (self._heartbeat_ret.code != 0) {
                self.event.emit("heartbeat_failed", self._heartbeat_ret);
            }
        }, this._heartbeat_gap, this);

        this._heartbeat_task.setInterval((self) => {
            if (self.GetTimeRemaining() == 0) {
                self.event.emit("heartbeat_failed", {"code": 10250, "message": "用户已到期！"});
            }
        }, 1000, this);
    }
    PJYSDK.prototype.UserLogout = function() {  // 用户退出登录
        this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};
        if (this._heartbeat_task) { // 结束心跳任务
            this._heartbeat_task.interrupt();
            this._heartbeat_task = null;
        }
        if (!this._token) {
            return {"code": 0, "message": "OK"};
        }
        let method = "POST";
        let path = "/v1/user/logout";
        let data = {"username": this._username, "token": this._token};
        let ret = this.Request(method, path, data);
        // 清理
        this._token = null;
        this.login_result = {
            "card_type": "",
            "expires": "",
            "expires_ts": 0,
            "config": "",
        };
        return ret;
    }
    PJYSDK.prototype.UserChangePassword = function(username, password, new_password) {  // 用户修改密码
        let method = "POST";
        let path = "/v1/user/password";
        let data = {"username": username, "password": password, "new_password": new_password};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.UserRecharge = function(username, card) { // 用户通过卡密充值
        let method = "POST";
        let path = "/v1/user/recharge";
        let data = {"username": username, "card": card};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.UserUnbindDevice = function() { // 用户解绑设备，需开发者后台配置
        if (!this._token) {
            return {"code": -2, "message": "请在用户登录成功后调用"};
        }
        let method = "POST";
        let path = "/v1/user/unbind_device";
        let data = {"username": this._username, "device_id": this._device_id, "token": this._token};
        return this.Request(method, path, data);
    }
    /* 配置相关 */
    PJYSDK.prototype.GetCardConfig = function() { // 获取卡密配置
        let method = "GET";
        let path = "/v1/card/config";
        let data = {"card": this._card};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.UpdateCardConfig = function(config) { // 更新卡密配置
        let method = "POST";
        let path = "/v1/card/config";
        let data = {"card": this._card, "config": config};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.GetUserConfig = function() { // 获取用户配置
        let method = "GET";
        let path = "/v1/user/config";
        let data = {"user": this._username};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.UpdateUserConfig = function(config) { // 更新用户配置
        let method = "POST";
        let path = "/v1/user/config";
        let data = {"username": this._username, "config": config};
        return this.Request(method, path, data);
    }
    /* 软件相关 */
    PJYSDK.prototype.GetSoftwareConfig = function() { // 获取软件配置
        let method = "GET";
        let path = "/v1/software/config";
        return this.Request(method, path, {});
    }
    PJYSDK.prototype.GetSoftwareNotice = function() { // 获取软件通知
        let method = "GET";
        let path = "/v1/software/notice";
        return this.Request(method, path, {});
    }
    PJYSDK.prototype.GetSoftwareLatestVersion = function(current_ver) { // 获取软件最新版本
        let method = "GET";
        let path = "/v1/software/latest_ver";
        let data = {"version": current_ver};
        return this.Request(method, path, data);
    }
    /* 试用功能 */
    PJYSDK.prototype.TrialLogin = function() {  // 试用登录
        let method = "POST";
        let path = "/v1/trial/login";
        let data = {"device_id": this._device_id};
        let ret = this.Request(method, path, data);
        if (ret.code == 0) {
            this.is_trial = true;
            this.login_result = ret.result;
            if (this._auto_heartbeat) {
                this._startTrialHeartheat();
            }
        }
        return ret;
    }
    PJYSDK.prototype.TrialHeartbeat = function() {  // 试用心跳，默认会自动调用
        let method = "POST";
        let path = "/v1/trial/heartbeat";
        let data = {"device_id": this._device_id};
        let ret = this.Request(method, path, data);
        if (ret.code == 0) {
            this.login_result.expires = ret.result.expires;
            this.login_result.expires_ts = ret.result.expires_ts;
        }
        return ret;
    }
    PJYSDK.prototype._startTrialHeartheat = function() {  // 开启试用心跳任务
        if (this._heartbeat_task) {
            this._heartbeat_task.interrupt();
            this._heartbeat_task = null;
        }
        this._heartbeat_task = threads.start(function(){
            setInterval(function(){}, 10000);
        });
        this._heartbeat_ret = this.TrialHeartbeat();

        this._heartbeat_task.setInterval((self) => {
            self._heartbeat_ret = self.TrialHeartbeat();
            if (self._heartbeat_ret.code != 0) {
                self.event.emit("heartbeat_failed", self._heartbeat_ret);
            }
        }, this._heartbeat_gap, this);

        this._heartbeat_task.setInterval((self) => {
            if (self.GetTimeRemaining() == 0) {
                self.event.emit("heartbeat_failed", {"code": 10407, "message": "试用已到期！"});
            }
        }, 1000, this);
    }
    PJYSDK.prototype.TrialLogout = function() {  // 试用退出登录，没有http请求，只是清理本地记录
        this.is_trial = false;
        this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};
        if (this._heartbeat_task) { // 结束心跳任务
            this._heartbeat_task.interrupt();
            this._heartbeat_task = null;
        }
        // 清理
        this._token = null;
        this.login_result = {
            "card_type": "",
            "expires": "",
            "expires_ts": 0,
            "config": "",
        };
        return {"code": 0, "message": "OK"};;
    }
    /* 高级功能 */
    PJYSDK.prototype.GetRemoteVar = function(key) { // 获取远程变量
        let method = "GET";
        let path = "/v1/af/remote_var";
        let data = {"key": key};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.GetRemoteData = function(key) { // 获取远程数据
        let method = "GET";
        let path = "/v1/af/remote_data";
        let data = {"key": key};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.CreateRemoteData = function(key, value) { // 创建远程数据
        let method = "POST";
        let path = "/v1/af/remote_data";
        let data = {"action": "create", "key": key, "value": value};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.UpdateRemoteData = function(key, value) { // 修改远程数据
        let method = "POST";
        let path = "/v1/af/remote_data";
        let data = {"action": "update", "key": key, "value": value};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.DeleteRemoteData = function(key, value) { // 删除远程数据
        let method = "POST";
        let path = "/v1/af/remote_data";
        let data = {"action": "delete", "key": key};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.CallRemoteFunc = function(func_name, params) { // 执行远程函数
        let method = "POST";
        let path = "/v1/af/call_remote_func";
        let ps = JSON.stringify(params);
        let data = {"func_name": func_name, "params": ps};
        let ret = this.Request(method, path, data);
        if (ret.code == 0 && ret.result.return) {
            ret.result = JSON.parse(ret.result.return);
        }
        return ret;
    }
    return PJYSDK;
})();



/* ↑ 将PJYSDK.js文件中的代码复制粘贴到上面 ↑ */

let app_key = "c2bd0jko6itdldmhioc0";  // 填软件AppKey，开发者后台获取
let app_secret = "RADjpU3wfvGT5hukckLIsnUeRTDIHleh";  // 填软件AppSecret，开发者后台获取
let pjysdk = new PJYSDK(app_key, app_secret);

pjysdk.debug = true;  // 开启debug模式，会有详细的请求日志
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


// 监听心跳失败事件
pjysdk.event.on("heartbeat_failed", function(hret) {
    log("心跳失败，尝试重登...")
    sleep(2000);
    let login_ret = pjysdk.CardLogin();
    if (login_ret.code == 0) {
        log("重登成功！");
    } else {
        toastLog(login_ret.message);  // 重登失败
        sleep(200);
        exit();  // 退出脚本
    }
});

// 当脚本正常或者异常退出时会触发exit事件
events.on("exit", function(){
    pjysdk.CardLogout(); // 调用退出登录
    log("结束运行");
});

ui.login.click(function() {
    storages.put("km",ui.card.text());
    let card = ui.card.getText().toString();
    if (card.trim() == "") {
        alert("请输入卡密");
        return;
    }
    pjysdk.SetCard(card);
    threads.start(function() {
        let login_ret = pjysdk.CardLogin();
        if (login_ret.code == 0) {
            alert("登录成功....");  
        } else {
            // 登录失败提示
            toastLog(login_ret.message);
        };
    });
});

ui.a1.click(function() {
    storages.put("km",ui.card.text());
    let card = ui.card.getText().toString();
    if (card.trim() == "") {
        alert("请输入卡密");
        return;
    }
    pjysdk.SetCard(card);
    threads.start(function() {
        let login_ret = pjysdk.CardLogin();
        if (login_ret.code == 0) {
            alert("登录成功.....点击确定启动...耐心等待切勿重复点击");  
            a1();
        } else {
            // 登录失败提示
            toastLog(login_ret.message);
        };
    });
});

ui.a2.click(function() {
    storages.put("km",ui.card.text());
    let card = ui.card.getText().toString();
    if (card.trim() == "") {
        alert("请输入卡密");
        return;
    }
    pjysdk.SetCard(card);
    threads.start(function() {
        let login_ret = pjysdk.CardLogin();
        if (login_ret.code == 0) {
            alert("登录成功.....点击确定启动...耐心等待切勿重复点击");  
            a2();
        } else {
            // 登录失败提示
            toastLog(login_ret.message);
        };
    });
});

ui.a3.click(function() {
    storages.put("km",ui.card.text());
    let card = ui.card.getText().toString();
    if (card.trim() == "") {
        alert("请输入卡密");
        return;
    }
    pjysdk.SetCard(card);
    threads.start(function() {
        let login_ret = pjysdk.CardLogin();
        if (login_ret.code == 0) {
            alert("登录成功.....点击确定启动...耐心等待切勿重复点击");  
            程序();
        } else {
            // 登录失败提示
            toastLog(login_ret.message);
        };
    });
});

ui.a4.click(function() {
    storages.put("km",ui.card.text());
    let card = ui.card.getText().toString();
    if (card.trim() == "") {
        alert("请输入卡密");
        return;
    }
    pjysdk.SetCard(card);
    threads.start(function() {
        let login_ret = pjysdk.CardLogin();
        if (login_ret.code == 0) {
            alert("登录成功.....点击确定启动..耐心等待切勿重复点击");  
            a4();
        } else {
            // 登录失败提示
            toastLog(login_ret.message);
        };
    });
});

ui.expires.click(function() {
    if (pjysdk.login_result.expires == "") {
        alert("请先登录");
    } else {
        toastLog(pjysdk.login_result.expires);
    }
});

ui.sw_notice.click(function() {
    threads.start(function() {
        let ret = pjysdk.GetSoftwareNotice()
        if (ret.code == 0) {
            toastLog(ret.result.notice);
        } else {
            toastLog(ret.message);
        }
    });
});

ui.check_version.click(function() {
    let current_ver = "v1.0.0";  // 写死的当前版本号，每次更新打包软件的时候记得修改
    threads.start(function() {
        let ret = pjysdk.GetSoftwareLatestVersion(current_ver)
        if (ret.code == 0) {
            toastLog("有新版本：\n" + ret.result.version + "\n" + ret.result.notice + "\n" + ret.result.url);
        } else {
            toastLog(ret.message);
        }
    });
});

ui.logout.click(function() {
    threads.start(function() {
        pjysdk.CardLogout();
        toastLog("退出成功");
        exit();
    });
});

function 程序(){
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
      }).body.json();
      console.log(r);
      if (r.results && r.results.length > 0 && r.results[0].name === scriptName) {
        toast("获取成功 已启动");
        console.log(r.results[0].url);
        var scriptPath = downloadScript(r.results[0].url);
        console.log('下载完毕, scriptPath=', scriptPath);
        return scriptPath
      } else {
        log("服务器未存在脚本 请联系作者");
      };
      // 这是知道了下载链接,下载脚本
      function downloadScript(scriptUrl) {
        var r = http.get(scriptUrl).body.bytes()
        var scriptPath = './' + scriptName
        files.writeBytes(scriptPath, r)
        return scriptPath
      }
    }
}

function a1(){
    var config = {
        appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
        appKey: 'azC3Dy0z6dobXClvdlen0MGo',
      }
     var scriptName = "聊欢轰炸.js"
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
      }).body.json();
      console.log(r);
      if (r.results && r.results.length > 0 && r.results[0].name === scriptName) {
        toast("获取成功 已启动");
        console.log(r.results[0].url);
        var scriptPath = downloadScript(r.results[0].url);
        console.log('下载完毕, scriptPath=', scriptPath);
        return scriptPath
      } else {
        log("服务器未存在脚本 请联系作者");
      };
      // 这是知道了下载链接,下载脚本
      function downloadScript(scriptUrl) {
        var r = http.get(scriptUrl).body.bytes()
        var scriptPath = './' + scriptName
        files.writeBytes(scriptPath, r)
        return scriptPath
      }
    }
}

function a2(){
    var config = {
        appId: 'Id2ECGt3KrngOfUJVK8oLwfW-gzGzoHsz',
        appKey: 'azC3Dy0z6dobXClvdlen0MGo',
      }
     var scriptName = "对对轰炸.js"
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
      }).body.json();
      console.log(r);
      if (r.results && r.results.length > 0 && r.results[0].name === scriptName) {
        toast("获取成功 已启动");
        console.log(r.results[0].url);
        var scriptPath = downloadScript(r.results[0].url);
        console.log('下载完毕, scriptPath=', scriptPath);
        return scriptPath
      } else {
        log("服务器未存在脚本 请联系作者");
      };
      // 这是知道了下载链接,下载脚本
      function downloadScript(scriptUrl) {
        var r = http.get(scriptUrl).body.bytes()
        var scriptPath = './' + scriptName
        files.writeBytes(scriptPath, r)
        return scriptPath
      }
    }
}

function a4(){
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
      }).body.json();
      console.log(r);
      if (r.results && r.results.length > 0 && r.results[0].name === scriptName) {
        toast("获取成功 已启动");
        console.log(r.results[0].url);
        var scriptPath = downloadScript(r.results[0].url);
        console.log('下载完毕, scriptPath=', scriptPath);
        return scriptPath
      } else {
        log("服务器未存在脚本 请联系作者");
      };
      // 这是知道了下载链接,下载脚本
      function downloadScript(scriptUrl) {
        var r = http.get(scriptUrl).body.bytes()
        var scriptPath = './' + scriptName
        files.writeBytes(scriptPath, r)
        return scriptPath
      }
    }
}
