import { Card } from "antd"
import { useEffect, useState } from "react"

import "./tailwind.css"

import CopyBox from "./components/CopyBox"

interface TabInfo {
  origin: string
  awesomev2: string
}

export default function IndexPopup() {
  const [tabInfo, setTabInfo] = useState<TabInfo>({
    origin: "",
    awesomev2: ""
  })

  useEffect(() => {
    // 获取当前活动标签页信息
    getCurrentTab()
  }, [])

  const getCurrentTab = async () => {
    try {
      // 获取当前标签页
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      })
      if (tab.url) {
        const url = new URL(tab.url)
        const origin = url.origin
        const cookies = await getCookies(url.hostname)
        setTabInfo({
          origin: origin,
          awesomev2:
            cookies.find((cookie) => cookie.name === "awesomev2")?.value || ""
        })
      }
    } catch (error) {
      console.error("Error getting tab info:", error)
    }
  }

  const list = [
    {
      title: "网址",
      value: tabInfo.origin
    },
    {
      title: "awesomev2",
      value: "awesomev2=" + tabInfo.awesomev2
    }
  ]

  return (
    <Card className="w-96 text-sm rounded-none" title="复制当前网站信息">
      <div className="flex flex-col gap-3">
        {list.map((item, index) => (
          <div key={index}>
            <div className="text-base select-none">{item.title}</div>
            <div className="flex items-center justify-between gap-3 mt-1 border border-solid border-[#e5e5e5] rounded-md p-3">
              <span className="truncate">{item.value}</span>
              <CopyBox content={item.value} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// 获取指定域名的 Cookie
const getCookies = async (domain: string): Promise<chrome.cookies.Cookie[]> => {
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
