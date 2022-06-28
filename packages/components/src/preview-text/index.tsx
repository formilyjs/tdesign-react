import React, { createContext, useContext } from 'react'
import { isArr, isValid } from '@formily/shared'
import { Field } from '@formily/core'
import { observer, useField } from '@formily/react'
import cls from 'classnames'
import { formatMomentValue, usePrefixCls } from '../__builtins__'
import { InputProps } from 'tdesign-react/es/input'
import { Space } from 'tdesign-react'

const PlaceholderContext = createContext<React.ReactNode>('N/A')

const Placeholder = PlaceholderContext.Provider

const usePlaceholder = (value?: any) => {
  const placeholder = useContext(PlaceholderContext) || 'N/A'
  return isValid(value) && value !== '' ? value : placeholder
}

interface IGetValueByValue {
  (
    array: any[],
    inputValue: any,
    keyMap?: { inputKey?: string; outputKey?: string; childrenKey?: string },
    path?: any[]
  ): any
}

const getValueByValue: IGetValueByValue = (
  array,
  inputValue,
  keyMap,
  path = []
) => {
  const {
    inputKey = 'value',
    outputKey = 'label',
    childrenKey = 'children',
  } = keyMap || {}
  let outputValue: any
  if (isArr(array)) {
    if (isArr(inputValue)) {
      outputValue = inputValue.map((v) =>
        getValueByValue(array, v, keyMap, path)
      )
    } else {
      array.forEach((obj) => {
        if (outputValue === undefined) {
          const currentPath = [...path, obj?.[outputKey]]
          if (obj?.[inputKey] === inputValue) {
            outputValue = {
              leaf: obj?.[outputKey],
              whole: currentPath,
            }
          } else if (obj?.[childrenKey]?.length) {
            outputValue = getValueByValue(
              obj?.[childrenKey],
              inputValue,
              keyMap,
              currentPath
            )
          }
        }
      })
    }
    return outputValue
  }
  return undefined
}

const Input: React.FC<InputProps> = (props) => {
  const prefixCls = usePrefixCls('form-text', props)
  return (
    <Space className={cls(prefixCls, props.className)} style={props.style}>
      {props.addonBefore}
      {props.prefix}
      {usePlaceholder(props.value)}
      {props.suffix}
      {props.addonAfter}
    </Space>
  )
}


const Text = (props: React.PropsWithChildren<any>) => {
  const prefixCls = usePrefixCls('form-text', props)

  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {usePlaceholder(props.value)}
    </div>
  )
}

Text.Input = Input

export const PreviewText = Text

export default PreviewText
