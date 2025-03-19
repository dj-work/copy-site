import { getTabOrigin } from "~src/utils/cookies"

import { get } from "./request"

export async function getDefaultThemeInfo(url) {
  const origin = await getTabOrigin()
  const data = await get(origin + "/admin/api/themes/default-theme")
  return data
}

export async function getThemeLibInfo() {
  const origin = await getTabOrigin()
  const data = await get(origin + "/admin/api/themes?page=1&per_page=5")
  return data
}

export async function getTokens() {
  const origin = await getTabOrigin()
  const data = await get(
    origin + "/admin/api/admin/private_apps?page=1&per_page=10"
  )
  return data
}
