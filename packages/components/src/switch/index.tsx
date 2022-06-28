import { Switch as TdSwitch } from 'tdesign-react'
import { connect, mapProps } from '@formily/react'

export const Switch = connect(
  TdSwitch,
  mapProps((props, field) => {
    return {
      ...props,
      loading: field?.['loading'] || field?.['validating'],
    }
  })
)

export default Switch
