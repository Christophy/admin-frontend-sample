const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    username: '@name'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/user/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
