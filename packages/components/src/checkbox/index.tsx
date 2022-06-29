import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  Checkbox as TdCheckbox,
  CheckboxGroupProps,
  CheckboxProps,
} from 'tdesign-react'
import { PreviewText } from '../preview-text'

type ComposedCheckbox = React.FC<CheckboxProps> & {
  Group?: React.FC<CheckboxGroupProps>
  __ANT_CHECKBOX?: boolean
}

export const Checkbox: ComposedCheckbox = connect(
  TdCheckbox,
  mapProps({
    value: 'checked',
    onInput: 'onChange',
  })
)

Checkbox.Group = connect(
  TdCheckbox.Group,
  mapProps({
    dataSource: 'options',
  }),
  mapReadPretty(PreviewText.Input)
)

export default Checkbox
