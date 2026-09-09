import { promises as fs, existsSync } from 'node:fs'
import path from 'node:path'

export interface ModFile {
  name: string
  code: string
}

export default defineEventHandler(async (): Promise<{ list: ModFile[] }> => {
  const candidates = [
    path.join(process.cwd(), 'public/mods'),
    path.join(process.cwd(), '.output/public/mods')
  ]
  const dir = candidates.find((candidate) => existsSync(candidate))
  if (!dir) return { list: [] }

  const names = (await fs.readdir(dir))
    .filter((name) => name.endsWith('.lua'))
    .sort((a, b) => a.localeCompare(b, 'zh'))

  const list: ModFile[] = []
  for (const name of names) {
    try {
      const code = await fs.readFile(path.join(dir, name), 'utf-8')
      list.push({ name, code })
    } catch {
      // skip unreadable file
    }
  }
  return { list }
})