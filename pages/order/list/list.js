// pages/order/list/list.js
import orderApi from "../../../api/orderApi.js";
import dayjs from "dayjs";
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
    list: [],
    isFinish: false,
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
    let length = this.data.pager.page_size * this.data.pager.page_no;
    this.setData({
      "pager.page_no": 1,
      "pager.page_size": length
    })
    this.getList();
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
      pager,
      isFinish
    } = this.data;
    if (!loading && !isFinish) {
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
      ...this.data.pager,
      status: this.data.active
    }
    try {
      let res = await orderApi.IGetList(params);
      for (let item of res.data.list) {
        item.add_time_str = dayjs(item.add_time * 1000).format("YYYY-MM-DD HH:mm:ss");
        item.status_name = item.status == 1 ? "已支付" : "未支付";
        item.count = item.goods_ids.split(",").length;
      }
      let list = [];
      if (params.page_no == 1) {
        list = res.data.list;
      } else {
        list = this.data.list.concat(res.data.list);
      }
      let page_size = 12;
      let page_no = Math.ceil(list.length / page_size);
      let isFinish = res.data.pager.page_no >= res.data.pager.total_pages;
      this.setData({
        list: list,
        pager: {
          page_size,
          page_no
        },
        isFinish: isFinish,
        loading: false,
      })
    } catch (e) {
      console.log(e);
      this.setData({
        loading: false,
      })
    }
  },
  onSetPaidTap(event) {
    let item = event.currentTarget.dataset.item;
    wx.showModal({
      title: "温馨提示",
      content: "如果已使用其他方式收款，请确定。",
      success: async (res) => {
        let params = {
          id: item.id
        }
        try {
          let res = await orderApi.IPostSetPaid(params);
          wx.$toast("操作成功！");
          this.getList();
        } catch (e) {
          wx.$toast(e.msg||"操作失败！");
        }
      }
    })
  },
  onDelTap(event){
    let item = event.currentTarget.dataset.item;
    wx.showModal({
      title: "温馨提示",
      content: "是否确认删除？",
      success: async (res) => {
        let params = {
          id: item.id
        }
        try {
          let res = await orderApi.IPostDel(params);
          wx.$toast("操作成功！");
          this.getList();
        } catch (e) {
          wx.$toast(e.msg||"操作失败！");
        }
      }
    })
  },
  onItemTap(event) {
    console.log(event);
    let item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/order/detail/detail?scene=${item.id}_0`,
    })
  }
})