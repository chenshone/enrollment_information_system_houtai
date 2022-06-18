import request from "@/utils/request";

export function upArticle(data) {
  return request({
    url: "/article",
    method: "post",
    data,
  });
}

export function getArticleByPageAndTopic(data) {
  return request({
    url: "/article",
    method: "get",
    params: {
      page: data.page,
      topics: data.topics,
    },
  });
}

export function getArticleById(id) {
  return request({
    url: "/article/one",
    method: "get",
    params: {
      id,
    },
  });
}

export function deleteArticle(id) {
  return request({
    url: "/article",
    method: "delete",
    params: { id },
  });
}

export function updateArticle(data) {
  return request({
    url: "/article",
    method: "put",
    data,
  });
}
