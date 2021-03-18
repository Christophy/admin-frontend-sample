import request from '@/utils/request'

export function getDetail(id) {
  return request({
    url: '/article/' + id,
    method: 'get'
  })
}
export function getList(params) {
  return request({
    url: '/article',
    method: 'get',
    params
  })
}

export function insertArticle(data) {
  return request({
    url: '/article',
    method: 'post',
    data
  })
}

export function deleteArticle(id) {
  return request({
    url: '/article/' + id,
    method: 'delete'
  })
}

