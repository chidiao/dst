import type { DetailsResType, ResType } from '@/types/http'

export const useApis = () => {
  const serverApi = {
    list: (name: string) =>
      $fetch<ResType>('/api/v2/Server/List', {
        method: 'POST',
        body: { ServerName: name }
      }),
    details: (id: number | string) =>
      $fetch<DetailsResType>(`/api/v2/Server/Details/${id}`, {
        method: 'POST',
        body: { forceUpdate: true }
      })
  }

  return { serverApi }
}