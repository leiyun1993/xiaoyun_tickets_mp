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


    INTERFACE_POST_ORDER_CART_GOODS: "/order/addCartGoods", //添加购物车
    INTERFACE_POST_ORDER_DEL_CART_GOODS: "/order/delCartGoods", //删除购物车
    INTERFACE_GET_ORDER_CART_INFO: "/order/getCart", //获取购物车数据
    INTERFACE_POST_ORDER_CART_CREATE: "/order/create", //创建订单
    INTERFACE_GET_ORDER_LIST: "/order/list", //订单
    INTERFACE_POST_ORDER_DEL: "/order/del", //删除
    INTERFACE_POST_ORDER_SET_PAID: "/order/setPaid", //设置为支付
    INTERFACE_GET_ORDER_DETAIL: "/order/detail", //详情
    INTERFACE_GET_ORDER_MY_STAT: "/order/myStat", //我的统计
}