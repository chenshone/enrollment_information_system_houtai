import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/user/b/login",
    method: "post",
    data: { ishoutai: true, ...data },
  });
}

export function getInfo(token) {
  return request({
    url: "/user/b/login_token",
    method: "post",
    data: { myToken: token, ishoutai: true },
  });
}
