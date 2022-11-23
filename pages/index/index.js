// pages/index/index.js
import * as DICTION from "../../utils/diction";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        steps: [{
                desc: '描述信息',
            },
            {
                desc: '描述信息',
            },
            {
                desc: '描述信息',
            },
            {
                desc: '描述信息',
            },
            {
                desc: '描述信息',
            },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let steps = [];
         new Array(5).fill(0).forEach((it, index) => {
            steps.push({
                desc: `${index+1}0题`
            })
        })
        console.log(steps);
        this.setData({
            list: DICTION.GRADE1_1,
            steps: steps
        })
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
    onChange(event) {
        this.setData({
            activeNames: event.detail,
        });
    },
    /**
     * 打印
     */
    printTap(event){
        wx.navigateTo({
          url: `/pages/print/view`,
        })
    }
})