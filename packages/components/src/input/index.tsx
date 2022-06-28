import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  Input as TdInput,
  InputProps,
  Textarea,
  TextareaProps,
} from 'tdesign-react'
import PreviewText from '../preview-text'
import { LoadingIcon } from 'tdesign-icons-react'

type ComposedInput = React.FC<InputProps> & {
  TextArea?: React.ForwardRefExoticComponent<TextareaProps>
}

export const Input: ComposedInput = connect(
  TdInput,
  mapProps((props, field) => {
    return {
      ...props,
      suffix: (
        <span>
          {field?.['loading'] || field?.['validating'] ? (
            <LoadingIcon />
          ) : (
            props.suffix
          )}
        </span>
      ),
    }
  }),
  mapReadPretty(PreviewText.Input)
)

Input.TextArea = connect(Textarea, mapReadPretty(PreviewText.Input))

export default Input
