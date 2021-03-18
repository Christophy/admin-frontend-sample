const Mock = require('mockjs')

const data = Mock.mock(
  {
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: '@name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)',
    content: '@sentence(100, 300)'
  }
)

module.exports = [
  {
    url: '/vue-admin-template/article/:id',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: data
      }
    }
  }
]
