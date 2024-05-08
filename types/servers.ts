export interface Server {
  Name?: string
  Address?: ServerAddress
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
  Secondaries?: ServerSecondary[]
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

export interface ServerAddress {
  IP?: string
  IsoCode?: string
}

export interface ServerSecondary {
  Address?: string
  Port?: number
  Id?: string
  SteamId?: string
}
