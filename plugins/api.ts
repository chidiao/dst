export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: 'https://api.dstserverlist.top'
  })

  return {
    provide: {
      api: {
        post: (request: string, body?: any, opts?: any) =>
          api(request, {
            method: 'POST',
            body: body,
            ...opts
          })
      }
    }
  }
})
