import React from 'react'
import { connect, mapProps } from '@formily/react'
import { Upload as TdUpload, UploadProps } from 'tdesign-react'

export type IUploadProps = Omit<UploadProps, 'onChange'>

type ComposedUpload = React.FC<IUploadProps>

export const Upload: ComposedUpload = connect(
  (props: React.PropsWithChildren<IUploadProps>) => {
    return <TdUpload {...props} />
  },
  mapProps({
    // value: 'files',
  })
)

export default Upload
