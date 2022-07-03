import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  Checkbox as TdCheckbox,
  CheckboxGroupProps,
  CheckboxProps,
} from 'tdesign-react'
import { PreviewText } from '../preview-text'

type ComposedCheckbox = React.FC<CheckboxProps> & {
  Group?: React.FC<CheckboxGroupProps>
}

export const Checkbox: ComposedCheckbox = connect(
  TdCheckbox,
  mapProps({
    value: 'checked',
  })
)

Checkbox.Group = connect(
  TdCheckbox.Group,
  mapProps({
    dataSource: 'options',
  }),
  mapReadPretty(PreviewText.Select)
)

export default Checkbox
