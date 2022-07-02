import React from 'react'
import { connect, mapProps } from '@formily/react'
import { Upload as TdUpload, UploadProps } from 'tdesign-react'

export type IUploadProps = Omit<UploadProps, 'onChange'>

type ComposedUpload = React.FC<IUploadProps>

export const Upload: ComposedUpload = connect(
  TdUpload,
  mapProps((props) => {
    return {
      ...props,
      files: props.value || [],
    }
  })
)

export default Upload
