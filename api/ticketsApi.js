import baseAPI from "./baseApi.js";
import config from "../config/config.js";
import interfaces from "../config/interface.js";
import * as util from "../utils/util.js";
export default {
    IPostAdd(params) {
        const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_POST_TICKETS_ADD, params);
        return result;
    },
    IGetList(params) {
        const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_GET_TICKETS_LIST, params);
        return result;
    },

}