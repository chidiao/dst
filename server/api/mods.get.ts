export interface ModFile {
  name: string
}

// 与 public/files/mods/ 下的文件保持一致，新增/删除配置文件时同步修改这里
const MOD_FILE_NAMES = [
  '基础四件套.lua',
  '多层世界.lua',
  '多层世界7.lua',
  '质量四件套.lua'
] as const

export default defineEventHandler((): { list: ModFile[] } => ({
  list: MOD_FILE_NAMES.map((name) => ({ name }))
}))