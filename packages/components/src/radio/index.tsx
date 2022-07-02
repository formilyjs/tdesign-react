import { connect, mapProps, mapReadPretty } from '@formily/react'
import { PreviewText } from '../preview-text'
import { Radio as TdRadio, RadioGroupProps, RadioProps } from 'tdesign-react'

type ComposedRadio = React.FC<RadioProps> & {
  Group?: React.FC<RadioGroupProps>
}

export const Radio: ComposedRadio = connect(
  TdRadio,
  mapProps({
    value: 'checked',
    onInput: 'onChange',
  })
)

Radio.Group = connect(
  TdRadio.Group,
  mapProps({
    dataSource: 'options',
  }),
  mapReadPretty(PreviewText.Select)
)

export default Radio
