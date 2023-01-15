import baseAPI from "./baseApi.js";
import config from "../config/config.js";
import interfaces from "../config/interface.js";
import * as util from "../utils/util.js";
export default {
    IPostAddCartGoods(params) {
        const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_POST_ORDER_CART_GOODS, params);
        return result;
    },
    IPostDelCartGoods(params) {
        const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_POST_ORDER_DEL_CART_GOODS, params);
        return result;
    },
    IGetCartInfo(params) {
        const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_GET_ORDER_CART_INFO, params);
        return result;
    },
    IPostCreate(params) {
        const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_POST_ORDER_CART_CREATE, params);
        return result;
    },
    IGetList(params) {
        const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_GET_ORDER_LIST, params);
        return result;
    },
    IPostDel(params) {
        const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_POST_ORDER_DEL, params);
        return result;
    },
    IPostSetPaid(params) {
        const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_POST_ORDER_SET_PAID, params);
        return result;
    },
    IGetDetail(params) {
        const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_GET_ORDER_DETAIL, params);
        return result;
    },
    IGetMyStat(params) {
        const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_GET_ORDER_MY_STAT, params);
        return result;
    },
    
}