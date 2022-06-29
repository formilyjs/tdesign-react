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
  mapReadPretty(PreviewText.Input)
)

DatePicker.RangePicker = connect(
  DateRangePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.Input)
)

export default DatePicker
