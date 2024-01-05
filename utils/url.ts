export const URL = {
  STEAM_MOD: 'https://steamcommunity.com/sharedfiles/filedetails/?id=',
  STEAM_PLAYER: 'https://steamcommunity.com/profiles/'
}

export const toModPage = (id?: number) => {
  if (!id) return
  window.open(URL.STEAM_MOD + id)
}

export const toPlayerPage = (id?: number) => {
  if (!id) return
  window.open(URL.STEAM_PLAYER + id)
}
