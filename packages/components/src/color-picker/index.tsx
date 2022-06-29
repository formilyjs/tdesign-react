import moment from 'moment'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { ColorPicker as TdColorPicker, ColorPickerProps } from 'tdesign-react'

import { PreviewText } from '../preview-text'

type ComposedColorPicker = React.FC<ColorPickerProps>

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
