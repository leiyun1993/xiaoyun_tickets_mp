// pages/index/index.js
import orderApi from "../../api/orderApi.js";
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
    this.getCartInfo()
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
    this.getMyStat();
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
  async getCartInfo() {
    let params = {};
    try {
      let res = await orderApi.IGetCartInfo(params);
      let length = res.data.goods_list.length;
      if (length > 0) {
        wx.setTabBarBadge({
          index: 1,
          text: `${length}`,
        })
      } else {
        wx.removeTabBarBadge({
          index: 1,
        })
      }
    } catch (e) {
      console.log(e);
    }
  },
  onItemClick(event) {
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        console.log("res", res);
        if (res.result) {
          this.addGoodsCart(res.result);
        }
      },
      fail: (e) => {
        console.log("e", e);
        wx.$toast("识别失败，请重试！")
      }
    })
  },
  async addGoodsCart(isbn) {
    let params = {
      goods_isbn: isbn
    }
    try {
      let res = await orderApi.IPostAddCartGoods(params);
      this.getCartInfo();
      wx.$toast("添加成功！")
    } catch (e) {
      console.log(e);
      wx.$toast(e.msg || "添加失败！")
    }
  },
  async getMyStat() {
    let params = {};
    try {
      let res = await orderApi.IGetMyStat(params);
      this.setData({
        myStat: res.data
      })
    } catch (e) {
      console.log(e);
    }
  }
})