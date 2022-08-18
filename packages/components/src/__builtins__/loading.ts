import { MessagePlugin } from 'tdesign-react'

export const loading = async (
  title = 'Loading...',
  processor: () => Promise<any>
) => {
  let ins = null
  ins = MessagePlugin.loading(title)
  try {
    return await processor()
  } finally {
    MessagePlugin.close(ins)
  }
}
