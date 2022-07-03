import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { InputNumber as TdInputNumber, InputNumberProps } from 'tdesign-react'
import PreviewText from '../preview-text'

type ComposedInput = React.FC<InputNumberProps>

export const InputNumber: ComposedInput = connect(
  TdInputNumber,
  mapProps((props) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export default InputNumber
