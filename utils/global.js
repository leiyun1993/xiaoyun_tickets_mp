/**
 * 全局toast方法
 * @param {*} msg 
 */
wx.$toast = function (msg) {
    wx.showToast({
        title: msg,
        icon: "none"
    })
}

wx.$user = function () {
    return wx.getStorageSync('userInfo')
}

wx.$setUser = function (userInfo) {
    wx.setStorageSync('userInfo', userInfo);
    wx.setStorageSync('token', userInfo.token);
    wx.setStorageSync('last_login_time', Date.now());
}

wx.$isLogin = function () {
    let token = wx.getStorageSync('token');
    if (!token) {
        return false;
    }
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
        return false;
    }
    let lastLoginTime = wx.getStorageSync('last_login_time') || 0;
    if (!lastLoginTime) {
        return false;
    }

    let diff = Date.now() - lastLoginTime;
    if ((diff / 1000) > 20 * 3600) {
        return false;
    }
    return true;
}