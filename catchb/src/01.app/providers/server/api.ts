import { initializeKakaoSDK } from "@react-native-kakao/core";
import NaverLogin from "@react-native-seoul/naver-login";
import axios from "axios";

export async function initialize() {
  try {
    const response = await axios.get("/v1/initialize/", {
      timeout: 3000,
    });

    if (response.status === 200 && response.data) {
      initializeKakaoSDK(response.data.KAKAO_APP_KEY);
      NaverLogin.initialize({
        appName: "Catch B",
        consumerKey: response.data.NAVER_CONSUMER_KEY,
        consumerSecret: response.data.NAVER_CONSUMER_SECRET,
        serviceUrlSchemeIOS: "catchb",
      });

      return "SUCCESS";
    }
    return "FAILURE";
  } catch {
    return "FAILURE";
  }
}
