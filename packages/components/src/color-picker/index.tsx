import { connect, mapProps, mapReadPretty } from '@formily/react'
import { ColorPicker as TdColorPicker } from 'tdesign-react'

import { PreviewText } from '../preview-text'

export const ColorPicker = connect(
  TdColorPicker,
  mapProps((props) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export default ColorPicker
