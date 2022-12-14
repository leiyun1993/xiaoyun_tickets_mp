// pages/list/index/index.js
import * as util from "../../../utils/util";
import Api from "../../../api/ticketsApi";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: "1",
    pager: {
      page_no: 1,
      page_size: 12
    },
    list: []
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
    this.getList()
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
    this.setData({
      "pager.page_no": 1
    })
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    let {
      loading,
      pager
    } = this.data;
    if (!loading && pager.page_no < pager.total_pages) {
      this.setData({
        "pager.page_no": pager.page_no + 1
      })
      this.getList();
    }
  },
  onTabChange(event) {
    console.log(event);
    this.data.active = event.detail.name;
    this.setData({
      "pager.page_no": 1
    })
    this.getList();
  },
  async getList() {
    let params = {
      status: this.data.active,
      ...this.data.pager
    }
    try {
      this.setData({
        loading: true
      })
      let res = await Api.IGetList(params);
      this.setData({
        list: res.data.list,
        pager: res.data.pager,
        loading: false
      })
    } catch (e) {
      console.log(e);
    } finally {
      this.setData({
        loading: false
      })
    }
  },
  onItemChildTap(event) {
    let item = event.currentTarget.dataset.item;
    let key = event.currentTarget.dataset.key;
    if (key == "stock") {
      wx.navigateTo({
        url: `/pages/list/edit/stock?id=${item.id}`,
      })
    } else if (key == "record") {
      wx.navigateTo({
        url: `/pages/list/record/record?id=${item.id}`,
      })
    }
  }
})