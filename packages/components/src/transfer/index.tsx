import { connect, mapProps } from '@formily/react'
import { Transfer as TdTransfer, TransferProps } from 'tdesign-react'
import { isVoidField } from '@formily/core'

export const Transfer: React.FC<TransferProps> = connect(
  TdTransfer,
  mapProps(
    {
      dataSource: 'data',
    },
    (props, field) => {
      if (isVoidField(field)) return props
      return {
        ...props,
        dataSource:
          field.dataSource?.map((item) => {
            return {
              ...item,
              title: item.title || item.label,
              key: item.key || item.value,
            }
          }) || [],
      }
    }
  )
)

export default Transfer
