// pages/print/view.js
import * as util from "../../utils/util";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        A4: {
            w: 2480,
            h: 3508
        },
        list: [],
        painterJson: {},
        img: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            list: this.getList(50)
        })


        this.getPainterJson();
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
    /**
     * 获取要加载的列表
     * @param {*} count 
     */
    getList(count) {
        let i = 0;
        let list = [];
        do {
            list.push(util.addOrSubtractFunc(10,true))
            i++;
        } while (i < count)
        return list;
    },
    /**
     * 获取打印的json
     */
    getPainterJson() {
        let jsonList = util.getJsonList(this.data.list);

        console.log("jsonList", jsonList);
        let painterJson = {
            width: `${this.data.A4.w}px`,
            height: `${this.data.A4.h}px`,
            background: "#ffffff",
            views: [{
                    type: 'image',
                    url: "/images/ic_calc.png",
                    css: {
                        top: "66px",
                        left: "66px",
                        width: "100px",
                        height: "100px",
                    }
                },
                {
                    id: "title",
                    type: 'text',
                    text: "小云口算",
                    css: {
                        top: "66px",
                        left: "200px",
                        height: "100px",
                        fontSize: "90px",
                        textAlign: 'left',
                        fontWight: "bold",
                        lineHeight: "100px"
                    }
                },
                {
                    id: "testName",
                    type: 'text',
                    text: "口算练习 - 1-5的大小比较",
                    css: {
                        top: "calc(title.bottom + 30px)",
                        left: "66px",
                        height: "50px",
                        fontSize: "50px",
                        textAlign: 'left',
                        lineHeight: "50px"
                    }
                },
                {
                    id: "testCount",
                    type: 'text',
                    text: "总题数：50题",
                    css: {
                        top: "calc(testName.bottom + 30px)",
                        left: "66px",
                        height: "50px",
                        fontSize: "50px",
                        textAlign: 'left',
                        lineHeight: "50px"
                    }
                },
                {
                    type: 'text',
                    text: "姓名：_______________   得分：_______________",
                    css: {
                        top: "calc(title.bottom - 50px)",
                        right: "66px",
                        height: "50px",
                        fontSize: "50px",
                        textAlign: 'left',
                        lineHeight: "50px"
                    }
                },
                {
                    type: 'text',
                    text: "班级：_______________   用时：_______________",
                    css: {
                        top: "calc(testCount.top + 0px)",
                        right: "66px",
                        height: "50px",
                        fontSize: "50px",
                        textAlign: 'left',
                        lineHeight: "50px"
                    }
                },
                {
                    id: "line",
                    type: 'rect',
                    css: {
                        top: "calc(testCount.bottom + 50px)",
                        left: "66px",
                        width: `${this.data.A4.w - 132}px`,
                        height: "8px",
                        color: "#b4bac6",
                    }
                },
                {
                    id: "line2",
                    type: 'rect',
                    css: {
                        bottom: "300px",
                        left: "66px",
                        width: `${this.data.A4.w - 132}px`,
                        height: "8px",
                        color: "#b4bac6",
                    }
                },
                {
                    id:"qrcode",
                    type: 'image',
                    url: "/images/ic_qrcode.png",
                    css: {
                        top: "calc(line2.bottom + 40px)",
                        left: "66px",
                        width: "200px",
                        height: "200px",
                    }
                },
                {
                    type: 'text',
                    text: "扫描二维码查答案",
                    css: {
                        top: "calc(qrcode.top + 75px)",
                        right: "66px",
                        height: "50px",
                        fontSize: "50px",
                        textAlign: 'right',
                        lineHeight: "50px"
                    }
                },
                ...jsonList
            ]
        }

        this.setData({
            painterJson
        })
    },
    /**
     * 生成图片成功
     * @param {*} event 
     */
    onImgOK(event) {
        console.log("onImgOK", event);
        this.setData({
            img: event.detail.path
        })
    },
    /**
     * 生成图片失败
     * @param {*} event 
     */
    onImgErr(event) {
        console.log("onImgErr", event);
    },
    /**
     * 保存图片
     * @param {*} event 
     */
    saveTap(event) {
        wx.saveImageToPhotosAlbum({
            filePath: this.data.img,
            success: (res) => {
                wx.$toast("保存成功！");
            }
        })
    }
})