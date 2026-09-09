export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { apiBase } = useRuntimeConfig(event)

  return await $fetch(`${apiBase}/api/v2/Server/Details/${id}`, {
    method: 'POST',
    body,
    timeout: 20000
  })
})