export interface Server {
  Name?: string
  Address?: Address
  Port?: number
  RowId?: string
  Connected?: number
  IsDedicated?: boolean
  Host?: string
  Intent?: string
  MaxConnections?: number
  Mode?: string
  IsMods?: boolean
  IsPassword?: boolean
  Platform?: string
  Season?: string
  IsPvp?: boolean
  Version?: number
  Session?: string
  IsClanOnly?: boolean
  IsFriendsOnly?: boolean
  Slaves?: null
  IsAllowNewPlayers?: boolean
  IsServerPaused?: boolean
  SteamId?: string
  SteamRoom?: string
  Tags?: string[]
  Guid?: string
  IsClientHosted?: boolean
  SteamClanId?: null
  OwnerNetId?: null
  IsLanOnly?: boolean
}

export interface ServerDetails {
  Players?: any[]
  LastPing?: null
  Description?: string
  Tick?: number
  IsClientModsOff?: boolean
  Nat?: number
  IsEvent?: boolean
  IsValveCloudServer?: boolean
  ValvePopId?: null
  ValveRoutingInfo?: null
  IsKleiOfficial?: boolean
  DaysInfo?: DaysInfo
  WorldGen?: null
  Users?: null
  ModsInfo?: ModsInfo[]
  Name?: string
  Address?: Address
  Port?: number
  RowId?: string
  Connected?: number
  IsDedicated?: boolean
  Host?: string
  Intent?: string
  MaxConnections?: number
  Mode?: string
  IsMods?: boolean
  IsPassword?: boolean
  Platform?: string
  Season?: string
  IsPvp?: boolean
  Version?: number
  Session?: string
  IsClanOnly?: boolean
  IsFriendsOnly?: boolean
  Slaves?: null
  IsAllowNewPlayers?: boolean
  IsServerPaused?: boolean
  SteamId?: string
  SteamRoom?: string
  Tags?: string[]
  Guid?: string
  IsClientHosted?: boolean
  SteamClanId?: null
  OwnerNetId?: null
  IsLanOnly?: boolean
}

export interface Address {
  IP?: string
  IsoCode?: string
}

export interface DaysInfo {
  Day?: number
  DaysElapsedInSeason?: number
  DaysLeftInSeason?: number
  TotalDaysSeason?: number
}

export interface ModsInfo {
  Id?: number
  Name?: string
  CurrentVersion?: string
  NewVersion?: string
  IsClientDownload?: boolean
}

export default function (keyword?: string) {
  const servers = ref<Server[]>([])
  const version = useState<number>('version', () => 0)

  const getServers = async () => {
    const { data } = await useHttp.post(API.SERVER_LIST, {
      ServerName: keyword
    })
    servers.value = data.value.List
  }

  const getVersion = async () => {
    const { data } = await useHttp.post(API.SERVER_VERSION)
    version.value = data.value.version
  }

  return { servers, getServers, version, getVersion }
}
