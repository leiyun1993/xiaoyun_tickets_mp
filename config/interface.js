"use strict";

export default {
    INTERFACE_POST_LOGIN: "/user/login", //登录
    INTERFACE_GET_USER_INFO: "/user/getInfo", //获取用户信息
    INTERFACE_POST_USER_INFO: "/user/editInfo", //编辑用户信息
    INTERFACE_POST_UPLOAD: "/user/upload", //上传图片

    INTERFACE_GET_BANNER_LIST: "/common/bannerList", //广告位列表
    INTERFACE_GET_BANNER_DETAIL: "/common/bannerDetail", //广告位详情

    INTERFACE_POST_TICKETS_ADD: "/tickets/add", //创建入场券
    INTERFACE_GET_TICKETS_LIST: "/tickets/list", //列表
    INTERFACE_POST_EDIT_STOCK: "/tickets/setStock", //调整库存
    INTERFACE_GET_TICKETS_RECEIVED_LOG: "/tickets/receivedLog", //核销记录
}