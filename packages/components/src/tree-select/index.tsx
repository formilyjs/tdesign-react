import { connect, mapReadPretty, mapProps } from '@formily/react'
import { TreeSelect as TdTreeSelect } from 'tdesign-react'
import { PreviewText } from '../preview-text'

export const TreeSelect = connect(
  TdTreeSelect,
  mapProps(
    {
      dataSource: 'data',
    },
    (props, field) => {
      return {
        ...props,
        loading: field?.['loading'] || field?.['validating'],
      }
    }
  ),
  mapReadPretty(PreviewText.TreeSelect)
)

export default TreeSelect
