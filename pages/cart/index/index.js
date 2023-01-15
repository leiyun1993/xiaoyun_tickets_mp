// pages/cart/index.js
import orderApi from "../../../api/orderApi.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {
      original_price: 0.00,
      discount_price: 0.00,
      price: 0.00,
    },
    postLoading: false,
    is_paid: false,
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
    this.getCartInfo();
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
      for (let item of res.data.goods_list) {
        item.img_url = `https://image.lieshubuluo.cn/${item.face_imgs}`
      }
      this.setData({
        detail: res.data
      })
    } catch (e) {
      console.log(e);
    }
  },
  itemDelTap(event) {
    let item = event.currentTarget.dataset.item;
    wx.showModal({
      title: "温馨提示",
      content: "是否确定移除该书籍？",
      confirmText: "确定",
      success: (res) => {
        if (res.confirm) {
          this.delCartGoods(item.id);
        }
      }
    })
  },
  async delCartGoods(id) {
    let params = {
      id: id
    }
    try {
      let res = await orderApi.IPostDelCartGoods(params);
      wx.$toast("删除成功！");
      this.getCartInfo();
    } catch (e) {
      console.log(e);
      wx.$toast(e.msg || "失败！")
    }
  },
  onStatusChange(event) {
    console.log(event);
    this.setData({
      is_paid: event.detail
    })
  },
  onOrderSubmit() {
    if (this.data.detail.goods_list.length == 0) {
      wx.$toast("购物车空空如也！");
      return false;
    }
    wx.showModal({
      title: "温馨提示",
      content: "是否确认创建这个订单？",
      confirmText: "确定",
      success: (res) => {
        if (res.confirm) {
          this.createOrder();
        }
      }
    })
  },
  async createOrder() {
    let params = {
      is_paid: this.data.is_paid ? 1 : 0
    }
    try {
      wx.showLoading({
        title: '创建中...',
        mask: true
      })
      this.setData({
        postLoading: true
      })
      let res = await orderApi.IPostCreate(params);
      wx.$toast("创建成功！");
      this.getCartInfo();
      wx.navigateTo({
        url: `/pages/order/detail/detail?scene=${res.data.id}_0`,
      })
    } catch (e) {
      console.log(e);
      wx.$toast(e.msg || "创建失败！");
    } finally {
      this.setData({
        postLoading: false
      })
    }
  }
})