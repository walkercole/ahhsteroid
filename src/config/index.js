'use strict'

const isProd = process.env.NODE_ENV === 'production'

const USER_KEY = process.env.USER_KEY

const baseApiUrl = isProd ? 'http://localhost:8080' : 'https://api.nasa.gov/neo/rest/v1/feed?' 

const key = process.env.VUE_APP_KEY 

export default {
  service: {
    url: '/',
    method: 'get',
    baseURL: baseApiUrl,
    api_key: key,
    start_date: '',
    endDate: '',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json'
    },
    timeout: 120000,
    responseType: 'json'
  },
  storage: {
    userKey: USER_KEY,
    userLikeKey: 'USER_LIKE_KEY'
  }
}
