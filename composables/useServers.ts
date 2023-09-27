export interface Server {
  Name?: string
  Address?: string
  Port?: number
  RowId?: string
  Connected?: number
  Dedicated?: boolean
  Host?: string
  Intent?: string
  MaxConnections?: number
  Mode?: string
  Mods?: boolean
  Password?: boolean
  Platform?: string
  Season?: string
  PVP?: boolean
  Version?: number
  Session?: string
  Country?: string
}

export interface ServerDetails {
  LastPing?: number
  SteamClanId?: null
  Slaves?: null
  Secondaries?: null
  ClanOnly?: boolean
  Fo?: boolean
  Guid?: string
  ClientHosted?: boolean
  OwnerNetId?: null
  Tags?: string[]
  LanOnly?: boolean
  Desc?: string
  Tick?: number
  ClientModsOff?: boolean
  Nat?: number
  AllowNewPlayers?: boolean
  Event?: boolean
  ValveCloudServer?: boolean
  ValvePopId?: null
  ValveRoutingInfo?: null
  KleiOfficial?: boolean
  ServerPaused?: boolean
  DaysInfo?: DaysInfo
  WorldGen?: null
  SteamId?: string
  SteamRoom?: string
  Users?: null
  ModsInfo?: ModsInfo[]
  Players?: any[]
  Name?: string
  Address?: string
  Port?: number
  RowId?: string
  Connected?: number
  Dedicated?: boolean
  Host?: string
  Intent?: string
  MaxConnections?: number
  Mode?: string
  Mods?: boolean
  Password?: boolean
  Platform?: string
  Season?: string
  PVP?: boolean
  Version?: number
  Session?: string
  Country?: string
}

export interface DaysInfo {
  Day?: number
  DaysElapsedInSeason?: number
  DaysLeftInSeason?: number
}

export interface ModsInfo {
  Id?: number
  Name?: string
  CurrentVersion?: string
  NewVersion?: string
  IsClientDownload?: boolean
}

export const getServer = (serverId?: string) => {
  return useHttp.post(`/details/${serverId}`)
}

export default function (keyword: string) {
  const servers = ref<Server[]>([])

  const getServers = async () => {
    const { data } = await useHttp.post(`/list?name=${keyword}&pageCount=100&page=0`)
    servers.value = data.value.List
  }

  return { servers, getServers }
}
