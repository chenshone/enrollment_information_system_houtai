import request from "@/utils/request";

export function getCommentsById(page) {
  return request({
    url: "/comment/b",
    method: "get",
    params: { page },
  });
}

export function upReply(data) {
  return request({
    url: "/reply",
    method: "post",
    data,
  });
}

export function updateReply(data) {
  return request({
    url: "/reply",
    method: "put",
    data,
  });
}

export function delReply(data) {
  return request({
    method: "delete",
    url: "/reply",
    params: { ...data },
  });
}

export function delContent(data) {
  return request({
    method: "delete",
    url: "/comment",
    params: { ...data },
  });
}
