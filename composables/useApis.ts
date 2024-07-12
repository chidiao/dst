export const useApis = () => {
  const { $api } = useNuxtApp()

  return {
    serverApi: {
      list: (name: string) =>
        $api.post('/api/v2/Server/List', {
          ServerName: name
        }),
      details: (id: number | string) =>
        $api.post('/api/v2/Server/Details/' + id, {
          forceUpdate: true
        })
    }
  }
}
