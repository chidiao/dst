type FetchType = typeof $fetch
type FetchRequest = Parameters<FetchType>[0]
type FetchOptions = Parameters<FetchType>[1]

const $apiFetch = <T>(request: FetchRequest, opts?: FetchOptions) => {
  return $fetch<T>(request, {
    baseURL: 'https://api.dstserverlist.top',
    ...opts
  })
}

const post = <T>(request: FetchRequest, body?: any, opts?: FetchOptions) => {
  return $apiFetch<T>(request, {
    method: 'POST',
    body: body,
    ...opts
  })
}

export const $http = {
  post: post
}
