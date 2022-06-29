import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { RangeInput as TdRangeInput, RangeInputProps } from 'tdesign-react'
import PreviewText from '../preview-text'

type ComposedInput = React.FC<RangeInputProps>

export const RangeInput: ComposedInput = connect(
  TdRangeInput,
  mapProps((props) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export default RangeInput
