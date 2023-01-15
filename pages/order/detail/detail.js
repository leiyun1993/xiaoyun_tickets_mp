// pages/order/detail/detail.js
import orderApi from "../../../api/orderApi.js";
import dayjs from "dayjs";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let arr = options.scene.split("_")
    this.data.id = arr;
    this.setData({
      id: arr[0],
      type: arr[1] || 0,
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
    this.getDetail();
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
  async getDetail() {
    let params = {
      id: this.data.id
    }
    try {
      let res = await orderApi.IGetDetail(params);
      for (let item of res.data.goods_list) {
        item.img_url = `https://image.lieshubuluo.cn/${item.face_imgs}`
      }
      res.data.add_time_str = dayjs(res.data.add_time * 1000).format("YYYY-MM-DD HH:mm:ss")
      this.setData({
        detail: res.data
      })
    } catch (e) {

    }
  }
})