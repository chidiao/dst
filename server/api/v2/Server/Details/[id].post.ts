import type { DetailsResType } from '~/types/http'

export default defineEventHandler(async (event): Promise<DetailsResType> => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { apiBase } = useRuntimeConfig(event)

  return await $fetch<DetailsResType>(`${apiBase}/api/v2/Server/Details/${id}`, {
    method: 'POST',
    body,
    timeout: 20000
  })
})