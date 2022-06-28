import React from 'react'
import { connect, mapReadPretty, mapProps } from '@formily/react'
import { Cascader as TdCascader, CascaderProps } from 'tdesign-react'
import { PreviewText } from '../preview-text'

interface CascaderRef {
  focus: () => void
  blur: () => void
}

type FixAntdCascaderType = React.ForwardRefExoticComponent<
  CascaderProps &
    React.RefAttributes<CascaderRef> & {
      suffixIcon?: React.ReactNode
    }
>

export const Cascader = connect(
  TdCascader as FixAntdCascaderType,
  mapProps(
    {
      dataSource: 'options',
    },
    (props, field) => {
      return {
        ...props,
        loading: field?.['loading'] || field?.['validating']
      }
    }
  ),
  mapReadPretty(PreviewText.Input)
)

export default Cascader
