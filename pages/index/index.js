// pages/index/index.js
import comApi from "../../api/comApi.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [],
        configList: [{
            value: 1,
            icon: "../../images/ic_add_ticket.png",
            label: "创建活动",
            color: "#FF515A",
        }, {
            value: 2,
            icon: "../../images/ic_scan.png",
            label: "扫码核销",
            color: "#555555",
        }, {
            value: 3,
            icon: "../../images/ic_hx.png",
            label: "设置核销员",
            color: "#07c160",
        }, {
            value: 4,
            icon: "../../images/ic_info.png",
            label: "工具说明",
            color: "#ff976a",
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getBannerList()
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
    async getBannerList() {
        let params = {};
        try {
            let res = await comApi.IGetBannerList(params);
            this.setData({
                bannerList: res.data.list
            })
        } catch (e) {
            console.log(e);
        }
    },
    onItemClick(event) {
        
        const item = event.currentTarget.dataset.item;
        console.log(item);
        switch (Number(item.value)) {
            case 1:
                wx.navigateTo({
                    url: `/pages/list/add/add`,
                })
                break;
        }
    }
})