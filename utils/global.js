
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