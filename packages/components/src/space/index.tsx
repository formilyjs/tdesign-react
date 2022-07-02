import React from 'react'
import { Space as TdSpace, SpaceProps } from 'tdesign-react'
import { useFormLayout } from '../form-layout'
import toArray from 'rc-util/lib/Children/toArray'

export const Space: React.FC<SpaceProps> = (props) => {
  const layout = useFormLayout()
  // eslint-disable-next-line react/no-children-prop
  return React.createElement(TdSpace, {
    size: props.size ?? layout?.spaceGap,
    ...props,
    // https://github.com/Tencent/tdesign-react/pull/1009
    children: toArray(props.children),
  })
}

export default Space
