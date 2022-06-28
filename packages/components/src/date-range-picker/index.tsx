import moment from 'moment'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  DateRangePicker as TdDateRangePicker,
  DateRangePickerProps as TdDateRangePickerProps,
} from 'tdesign-react'

import { PreviewText } from '../preview-text'
import { formatMomentValue, momentable } from '../__builtins__'

type DatePickerProps<DatePickerProps> = Exclude<
  DatePickerProps,
  'value' | 'onChange'
> & {
  value: string
  onChange: (value: string | string[]) => void
}

type ComposedDatePicker = React.FC<TdDateRangePickerProps> & {
  RangePicker?: React.FC<TdDateRangePickerProps>
}

const mapDateFormat = function () {
  const getDefaultFormat = (props: DatePickerProps<TdDateRangePickerProps>) => {
    if (props['picker'] === 'month') {
      return 'YYYY-MM'
    } else if (props['picker'] === 'quarter') {
      return 'YYYY-\\QQ'
    } else if (props['picker'] === 'year') {
      return 'YYYY'
    } else if (props['picker'] === 'week') {
      return 'gggg-wo'
    }
    return props['showTime'] ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  }
  return (props: any) => {
    const format = props['format'] || getDefaultFormat(props)
    const onChange = props.onChange
    return {
      ...props,
      format: format,
      value: momentable(props.value, format === 'gggg-wo' ? 'gggg-ww' : format),
      onChange: (value: moment.Moment | moment.Moment[]) => {
        if (onChange) {
          onChange(formatMomentValue(value, format))
        }
      },
    }
  }
}

export const DateRangePicker: ComposedDatePicker = connect(
  TdDateRangePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.Input)
)

// DatePicker.RangePicker = connect(
//   TdDatePickerProps.RangePicker,
//   mapProps(mapDateFormat()),
//   mapReadPretty(PreviewText.DateRangePicker)
// )

export default DateRangePicker
