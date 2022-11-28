import baseAPI from "./baseApi.js";
import config from "../config/config.js";
import interfaces from "../config/interface.js";
import * as util from "../utils/util.js";

export default {
  ILogin() {
    return new Promise(async (resolve, reject) => {
      try {
        let wxLoginInfo = await wx.login({
          timeout: 10000
        });
        let params = {
          code: wxLoginInfo.code
        }
        const result = await baseAPI.request(config.BASE_URL + interfaces.INTERFACE_POST_LOGIN, params);
        wx.$setUser(result.data);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    })
  },
  IGetUserInfo(params) {
    const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_GET_USER_INFO, params);
    return result;
  },
  IPostEditUserInfo(params) {
    const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_POST_USER_INFO, params);
    return result;
  },
  IUpload(params) {
    const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_POST_UPLOAD, params);
    return result;
  },
}