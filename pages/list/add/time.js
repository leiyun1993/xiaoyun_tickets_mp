// pages/list/add/time.js
import dayjs from "dayjs";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        form: {
            active_time: "",
            end_time: "",
        }
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

    async saveTap() {
        let params = {
            ...this.data.form
        }
        if (!params.active_time) {
            wx.$toast("请输入活动时间！");
            return false;
        }
        if (!params.end_time) {
            wx.$toast("请选择结束时间！");
            return false;
        }
        let curr = dayjs().unix();
        let time = dayjs(params.end_time, "YYYY-MM-DD").endOf("d").unix();
        if (time < curr) {
            wx.$toast("结束时间不能小于当前时间！");
            return false;
        }
        const eventChannel = this.getOpenerEventChannel();
        params.end_time = time;
        eventChannel.emit('timeEvent', params);
        wx.navigateBack({
            delta: 1,
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
    },
    onDateChange(event) {
        console.log(event);
        this.setData({
            "form.end_time": event.detail.value
        })
    }
})