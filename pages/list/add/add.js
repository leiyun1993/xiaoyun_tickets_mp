// pages/list/add/add.js
import * as util from "../../../utils/util";
import Api from "../../../api/ticketsApi";

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
            instruction: "",
        },
        descList: []
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
        wx.chooseLocation({
            success: (result) => {
                console.log(result)

                let {
                    form
                } = this.data;
                form.address = result.address;
                form.lat = result.latitude;
                form.lng = result.longitude;
                this.setData({
                    form
                })
            },
        })
    },
    onTimeTap() {
        wx.navigateTo({
            url: `/pages/list/add/time`,
            events: {
                timeEvent: (data) => {
                    console.log("timeEvent", data);
                    let {
                        form
                    } = this.data;
                    this.setData({
                        form: {
                            ...form,
                            ...data
                        }
                    })
                }
            }
        })
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
    onAddDescTap() {
        const {
            descList
        } = this.data;
        if (descList.length > 5) {
            wx.$toast("图文介绍最多5组！");
            return false;
        }
        descList.push({
            img: "",
            text: ""
        })
        this.setData({
            descList
        })
    },
    onDelDescTap(event) {
        let index = event.currentTarget.dataset.index;
        const {
            descList
        } = this.data;
        descList.splice(index, 1);
        this.setData({
            descList
        })
    },
    async onUploadTap(event) {
        let index = event.currentTarget.dataset.index;
        try {
            let res = await wx.chooseMedia({
                count: 1,
                mediaType: ["image"],
                sourceType: ['album', 'camera'],
                sizeType: ["compressed"]
            })
            console.log(res);
            let path = res.tempFiles[0].tempFilePath;
            wx.showLoading({
                title: '上传中...',
                mask: true
            })
            let res2 = await util.uploadFile(path);
            console.log(res2);
            const {
                descList
            } = this.data;
            descList[index].img = res2.data.url;
            this.setData({
                descList
            })
            wx.hideLoading();
        } catch (e) {
            console.log("e", e);
            wx.$toast(e.msg || "上传失败！");
        }
    },
    onDescChange(event) {
        let index = event.currentTarget.dataset.index;
        const {
            descList
        } = this.data;
        descList[index].text = event.detail.value;

        console.log(event);
    },
    async submitTap() {
        const {
            form,
            descList
        } = this.data;
        let params = {
            ...form
        }
        if (!params.name) {
            wx.$toast("请输入活动名称！");
            return false;
        }
        if (!params.address) {
            wx.$toast("请选择活动地址！");
            return false;
        }
        if (!params.address_desc) {
            wx.$toast("请输入详细地址！");
            return false;
        }
        if (!params.total) {
            wx.$toast("请输入发券总量！");
            return false;
        }
        if (!params.active_time) {
            wx.$toast("请设置活动时间！");
            return false;
        }
        if (!params.contact) {
            wx.$toast("请输入联系电话！");
            return false;
        }

        if (descList.length > 0) {
            for (let item of descList) {
                let index = descList.indexOf(item);
                if (!item.img) {
                    wx.$toast(`请上传图文介绍${index+1}的图片！`);
                    return false;
                }
                if (!item.text) {
                    wx.$toast(`请输入图文介绍${index+1}的文字描述！`);
                    return false;
                }
            }
        }
        params.desc = JSON.stringify(descList);
        try {
            wx.showLoading({
                title: '创建中...',
                mask: true
            })
            let res = await Api.IPostAdd(params);
            wx.$toast("创建成功！");
            setTimeout(() => {
                wx.switchTab({
                    url: `/pages/list/index/index`,
                })
            }, 1500);
        } catch (e) {
            console.log(e);
            wx.$toast(e.msg || "创建失败，请重试！");
        }
    }
})