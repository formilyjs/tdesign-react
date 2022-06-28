import { message } from "tdesign-react"

export const loading = async (
  title = 'Loading...',
  processor: () => Promise<any>
) => {
  let hide = null
  let loading = setTimeout(() => {
    hide = message.loading(title)
  }, 100)
  try {
    return await processor()
  } finally {
    hide?.()
    clearTimeout(loading)
  }
}
