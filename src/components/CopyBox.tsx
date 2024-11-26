import { CopyOutlined } from "@ant-design/icons"
import { useDebounceFn, useUpdateEffect } from "ahooks"
import { message, Popover } from "antd"
import { useCopyToClipboard } from "react-use"

const CopyBox = (props: { content: string }) => {
  const { content } = props
  const [state, copyToClipboard] = useCopyToClipboard()

  useUpdateEffect(() => {
    message.destroy()
    if (state.error) {
      message.error("复制失败")
    } else {
      message.success("复制成功")
    }
  }, [state])

  const { run } = useDebounceFn(onCopy, {
    wait: 200
  })

  function onCopy() {
    copyToClipboard(content)
  }

  return (
    <Popover content="复制">
      <span className="cursor-pointer" onClick={run}>
        <CopyOutlined style={{ fontSize: 16 }} />
      </span>
    </Popover>
  )
}

export default CopyBox
