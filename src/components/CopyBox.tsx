import { useDebounceFn, useUpdateEffect } from "ahooks"
import { message } from "antd"
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
    wait: 50
  })

  function onCopy() {
    copyToClipboard(content)
  }

  return (
    <div
      className="truncate cursor-pointer select-none border border-solid border-[#e5e5e5] rounded-md p-2 hover:bg-[#f2f2f2]"
      onClick={run}>
      {content}
    </div>
  )
}

export default CopyBox
