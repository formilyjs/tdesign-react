import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  TimePicker as TdTimePicker,
  TimePickerProps,
  TimeRangePickerProps,
} from 'tdesign-react'

import { PreviewText } from '../preview-text'

const { TimeRangePicker } = TdTimePicker

type ComposedTimePicker = React.FC<TimePickerProps> & {
  RangePicker?: React.FC<TimeRangePickerProps>
}

const mapTimeFormat = function () {
  return (props: any) => {
    return {
      ...props,
    }
  }
}

export const TimePicker: ComposedTimePicker = connect(
  TdTimePicker,
  mapProps(mapTimeFormat()),
  mapReadPretty(PreviewText.TimePicker)
)

TimePicker.RangePicker = connect(
  TimeRangePicker,
  mapProps(mapTimeFormat()),
  mapReadPretty(PreviewText.TimeRangePicker)
)

export default TimePicker
