"use strict";

import config from "../config/config.js";
import * as util from "../utils/util.js";
import userApi from "./userApi.js";

let request = (url, data) =>
    new Promise((resolve, reject) => {
        let params = {};

        let contentType = "application/x-www-form-urlencoded;charset=UTF-8";
        let token = wx.getStorageSync('token');

        let header = {
            "content-type": data.contentType || contentType,
            "Authorization": `Bearer ${token}`,
        }
        params = {
            ...params,
            ...data
        };
        // console.log("请求Url",url)
        // console.log("请求参数",params)
        wx.request({
            url: url,
            method: "POST",
            header: header,
            data: params,
            success: async (res) => {
                console.log("request，成功", res);
                if (res.data.code === 0) {
                    resolve(res.data);
                } else {
                    let type = typeof res.data;
                    if (type == "string") {
                        let temp = res.data;
                        res.data = {
                            code: -1,
                            data: temp,
                            msg: "网络开小差了，请稍后再试！"
                        };
                    } else {
                        let data = res.data;
                        if (data.code == 1009) {
                            await userApi.ILogin();
                        } else {
                            //OTHER
                        }
                    }
                    reject(res.data);
                }

            },
            fail: err => {
                console.log("request，失败", err);
                //钉钉数据上报
                reject({
                    code: 404,
                    msg: "网络环境异常，请检查网络后重试！" //err.errMsg,
                });
            }
        });
    });

module.exports = {
    request
};