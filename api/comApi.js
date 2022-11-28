import baseAPI from "./baseApi.js";
import config from "../config/config.js";
import interfaces from "../config/interface.js";
import * as util from "../utils/util.js";
export default {
    IGetBannerList(params) {
        const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_GET_BANNER_LIST, params);
        return result;
    },
    IGetBannerDetail(params) {
        const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_GET_BANNER_DETAIL, params);
        return result;
    },
    
}