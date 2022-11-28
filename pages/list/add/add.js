// pages/list/add/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        form: {
            name: "",
            address: "",
            lat: "",
            lng: "",
            address_desc: "",
            total: "",
            active_time: "",
            contact: "",
            end_time: "",
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    onAddressTap(event) {
        console.log(event);
        // wx.chooseAddress({
        //     success: (result) => {
        //         console.log(result)
        //     },
        // })
        wx.chooseLocation({
            success: (result) => {
                console.log(result)
            },
        })
    },
    onChange(event) {
        console.log(event);
        let value = event.detail;
        let key = event.currentTarget.dataset.key;
        let {
            form
        } = this.data;
        form[key] = value;
        console.log("form", form);
        this.setData({
            form: form
        })
    }
})