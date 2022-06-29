import React from 'react'
import { Space as TdSpace, SpaceProps } from 'tdesign-react'
import { useFormLayout } from '../form-layout'

export const Space: React.FC<SpaceProps> = (props) => {
  const layout = useFormLayout()
  return React.createElement(TdSpace, {
    size: props.size ?? layout?.spaceGap,
    ...props,
  })
}

export default Space
