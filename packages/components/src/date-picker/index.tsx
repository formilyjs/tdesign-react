import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  DatePicker as TdDatePicker,
  DateRangePicker,
  DatePickerProps as TdDatePickerProps,
  DateRangePickerProps,
} from 'tdesign-react'

import { PreviewText } from '../preview-text'

type ComposedDatePicker = React.FC<TdDatePickerProps> & {
  RangePicker?: React.FC<DateRangePickerProps>
}

const mapDateFormat = function () {
  return (props: any) => {
    return {
      ...props,
    }
  }
}

export const DatePicker: ComposedDatePicker = connect(
  TdDatePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.DatePicker)
)

DatePicker.RangePicker = connect(
  DateRangePicker,
  mapProps((props, field) => {
    return {
      ...props,
      // 处理 date-picker 值为 undefined 时报错的问题
      value: props.value ? props.value : [],
    }
  }),
  mapReadPretty(PreviewText.DateRangePicker)
)

export default DatePicker
