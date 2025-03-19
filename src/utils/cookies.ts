// 获取指定域名的 Cookie
export const getCookies = async (
  domain: string
): Promise<chrome.cookies.Cookie[]> => {
  return new Promise((resolve, reject) => {
    chrome.cookies.getAll({ domain }, (cookies) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve(cookies)
      }
    })
  })
}

export async function getTabCookies() {
  const tab = await getTabInfo()
  if (!tab.url) return
  const url = new URL(tab.url)
  const cookies = await getCookies(url.hostname)
  return cookies
}

export function getSomeCookie(cookies: chrome.cookies.Cookie[], name: string) {
  return cookies.find((cookie) => cookie.name === name)?.value || ""
}

export async function getTabOrigin() {
  const tab = await getTabInfo()
  if (!tab.url) return
  const url = new URL(tab.url)
  return url.origin
}

async function getTabInfo() {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })
    return tab
  } catch (error) {
    console.error("Error getting tab info:", error)
  }
}
