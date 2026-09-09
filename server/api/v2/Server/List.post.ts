import type { ResType } from '~/types/http'

export default defineEventHandler(async (event): Promise<ResType> => {
  const body = await readBody(event)
  const { apiBase } = useRuntimeConfig(event)

  return await $fetch<ResType>(`${apiBase}/api/v2/Server/List`, {
    method: 'POST',
    body,
    timeout: 15000
  })
})