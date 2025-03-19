import { Card } from "antd"
import { useEffect, useState } from "react"

import "./tailwind.css"

import { useRequest, useSetState } from "ahooks"

import { getDefaultThemeInfo, getThemeLibInfo, getTokens } from "./apis/theme"
import CopyBox from "./components/CopyBox"
import { getSomeCookie, getTabCookies, getTabOrigin } from "./utils/cookies"

interface TabInfo {
  origin: string
  awesomev2: string
  defaultThemeId: string
  firstThemeId: string
  firstToken: string
}

export default function Popup() {
  const [tabInfo, setTabInfo] = useSetState<TabInfo>({
    origin: "",
    awesomev2: "",
    defaultThemeId: "",
    firstThemeId: "",
    firstToken: ""
  })

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const origin = await getTabOrigin()
    const cookies = await getTabCookies()
    setTabInfo({
      origin,
      awesomev2: getSomeCookie(cookies, "awesomev2")
    })
  }

  useRequest(getDefaultThemeInfo, {
    onSuccess: (data) => {
      setTabInfo({
        defaultThemeId: data.data.id
      })
    }
  })

  useRequest(getThemeLibInfo, {
    onSuccess: (data) => {
      setTabInfo({
        firstThemeId: data.data.themes[0].id
      })
    }
  })

  useRequest(getTokens, {
    onSuccess: (data) => {
      setTabInfo({
        firstToken: data.apps[0].access_token
      })
    }
  })

  const list = [
    {
      title: "origin",
      value: tabInfo.origin
    },
    {
      title: "awesomev2",
      value: "awesomev2=" + tabInfo.awesomev2
    },
    {
      title: "线上主题 id",
      value: tabInfo.defaultThemeId
    },
    {
      title: "主题库第一个主题 id",
      value: tabInfo.firstThemeId
    },
    {
      title: "第一个 token",
      value: tabInfo.firstToken
    }
  ]

  return (
    <Card
      className="w-96 text-sm rounded-none"
      title="复制当前网站信息（点击复制）">
      <div className="flex flex-col gap-2">
        {list.map((item, index) => (
          <div key={index}>
            <div className="text-base select-none mb-0.5">{item.title}</div>
            <CopyBox content={item.value} />
          </div>
        ))}
      </div>
    </Card>
  )
}
