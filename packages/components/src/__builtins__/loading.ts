import { MessagePlugin } from 'tdesign-react'

export const loading = async (
  title = 'Loading...',
  processor: () => Promise<any>
) => {
  let ins = null
  let loading = setTimeout(() => {
    ins = MessagePlugin.loading(title)
  }, 100)
  try {
    return await processor()
  } finally {
    MessagePlugin.close(ins)
    clearTimeout(loading)
  }
}
