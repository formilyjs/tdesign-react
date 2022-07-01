import React from 'react'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
import './index.less'
const Empty = () => {
  const prefix = usePrefixCls('empty')
  return (
    <div className={cls(prefix)}>
      <div>暂无数据</div>
    </div>
  )
}

export default Empty
