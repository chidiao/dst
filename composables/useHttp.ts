const BASE_URL = 'https://api.dstserverlist.top/api'

const fetch = (url: any, opts?: any) => {
  return useFetch(url, {
    onRequest({ options }) {
      options.baseURL = BASE_URL
    },
    onResponse({ response }) {
      return response
    },
    ...opts
  })
}

export const useHttp = {
  post: (url: any, body?: any, opts?: any) => {
    return fetch(url, {
      method: 'post',
      body: body,
      ...opts
    })
  }
}
