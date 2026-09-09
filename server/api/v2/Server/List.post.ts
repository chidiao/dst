export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { apiBase } = useRuntimeConfig(event)

  return await $fetch(`${apiBase}/api/v2/Server/List`, {
    method: 'POST',
    body,
    timeout: 15000
  })
})