// pages/list/edit/stock.js
import Api from "../../../api/ticketsApi";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    form: {
      total: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.id = options.id;
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
  onChange(event) {
    console.log(event);
    let value = event.detail;
    let key = event.currentTarget.dataset.key;
    let {
      form
    } = this.data;

    if (key == "instruction") {
      form[key] = event.detail.value;
    } else {
      form[key] = value;
    }
    console.log("form", form);
    this.setData({
      form: form
    })
  },
  async submitTap() {
    let params = {
      id: this.data.id,
      total: this.data.form.total
    }
    if (!params.total) {
      wx.$toast("请输入调整后的数量！");
      return false;
    }
    try {
      wx.showLoading({
        title: '提交中...',
      })
      let res = await Api.IPostEditStock(params);
      wx.$toast("设置成功！");
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 1500);
    } catch (e) {
      console.log(e);
      wx.$toast(e.msg || "设置失败！");
    }
  }
})