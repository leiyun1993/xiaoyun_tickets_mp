"use strict";

import config from "../config/config";
/**
 * 生成随机整数
 * @param {*} max 
 */
const ranInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 比较
 * @param {*} max 
 */
export const compareFunc = function (max) {

    let arg1 = ranInt(1, max);
    let arg2 = ranInt(1, max);
    let result = "";
    if (arg1 > arg2) {
        result = ">";
    } else if (arg1 < arg2) {
        result = "<";
    } else {
        result = "=";
    }

    return {
        arg1: arg1,
        arg2: arg2,
        result: result,
        formula: `${arg1} ◯ ${arg2}`
    }
}


/**
 * 加法
 */
export const addFunc = function (max, parentheses = false) {
    let arg1 = ranInt(1, max);
    let arg2 = ranInt(1, max - arg1);

    if (arg1 + arg2 > max) {
        return addFunc(max);
    }

    let flag = 1;
    if (parentheses) {
        flag = Math.random();
    }
    if (flag > 0.666) {
        return {
            arg1: arg1,
            arg2: arg2,
            result: arg1 + arg2,
            formula: `${arg1} + ${arg2} = `
        }
    } else if (flag > 0.333) {
        return {
            arg1: arg1,
            arg2: arg2,
            result: arg1,
            formula: `(   ) + ${arg2} = ${arg1 + arg2}`
        }
    } else {
        return {
            arg1: arg1,
            arg2: arg2,
            result: arg2,
            formula: `${arg1} + (   ) = ${arg1 + arg2}`
        }
    }
}

/**
 * 减法
 */
export const subtractFunc = function (max, parentheses = false) {
    let arg1 = ranInt(2, max);
    let arg2 = ranInt(1, arg1 - 1);

    if (arg1 - arg2 <= 0) {
        return subtractFunc(max);
    }

    let flag = 1;
    if (parentheses) {
        flag = Math.random();
    }
    if (flag > 0.666) {
        return {
            arg1: arg1,
            arg2: arg2,
            result: arg1 - arg2,
            formula: `${arg1} - ${arg2} = `
        }
    } else if (flag > 0.333) {
        return {
            arg1: arg1,
            arg2: arg2,
            result: arg1,
            formula: `(   ) - ${arg2} = ${arg1 - arg2}`
        }
    } else {
        return {
            arg1: arg1,
            arg2: arg2,
            result: arg2,
            formula: `${arg1} - (   ) = ${arg1 - arg2}`
        }
    }
}

/**
 * 随机产生加法或者减法
 */
export const addOrSubtractFunc = function (max, parentheses = false) {
    let random = Math.random();
    if (random >= 0.5) {
        return addFunc(max, parentheses);
    } else {
        return subtractFunc(max, parentheses);
    }
}


/**
 * 获取列表json
 * @param {*} list 
 */
export const getJsonList = function (list) {
    let h = 3508 - 420 - 400;
    let itemH = h / Math.floor(list.length / 5);
    let itemW = 496;
    let jsonList = [];
    list.forEach((item, index) => {
        let col = index % 5;
        let row = Math.floor(index / 5);
        let itemJson = {
            type: 'text',
            text: item.formula,
            css: {
                top: `${itemH*row+500}px`,
                left: `${itemW*col+66}px`,
                width: `${itemW}px`,
                height: "66px",
                color: "#333333",
                fontSize: "66px",
                textAlign: 'left',
            }
        };
        jsonList.push(itemJson);
    })
    return jsonList;
}

export const uploadFile = function (path) {
    return new Promise((resolve, reject) => {
        let token = wx.getStorageSync('token');
        let header = {
            "Authorization": `Bearer ${token}`,
        }
        wx.uploadFile({
            filePath: path,
            name: 'file',
            url: `${config.BASE_URL}/user/upload`,
            header: header,
            success: (res) => {
                if (res.statusCode == 200) {
                    let data = JSON.parse(res.data);
                    if (data.code == 0) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                } else {
                    reject({
                        code: 1000,
                        msg: "上传失败！"
                    });
                }
            },
            fail: (e) => {
                reject(e);
            }
        })
    })
}