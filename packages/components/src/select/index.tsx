import React from 'react'
import { connect, mapReadPretty, mapProps } from '@formily/react'
import { Select as TdSelect, SelectProps } from 'tdesign-react'
import { PreviewText } from '../preview-text'

export const Select: React.FC<SelectProps> = connect(
  TdSelect,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
    },
    (props, field) => {
      return {
        ...props,
        loading: field?.['loading'] || field?.['validating'],
      }
    }
  ),
  mapReadPretty(PreviewText.Input)
)

export default Select
