import { connect, mapProps, mapReadPretty } from '@formily/react'
import React from 'react'
import {
  InputAdornment as TdInputAdornment,
  InputAdornmentProps,
} from 'tdesign-react'
import PreviewText from '../preview-text'

export const InputAdornment: React.FC<InputAdornmentProps> = connect(
  TdInputAdornment,
  mapProps((props) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export default InputAdornment
