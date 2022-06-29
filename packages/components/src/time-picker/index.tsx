import moment from 'moment'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  TimePicker as TdTimePicker,
  // TimeRangePicker as TdTimeRangePicker,
  TimePickerProps,
  TimeRangePickerProps,
} from 'tdesign-react'

import { PreviewText } from '../preview-text'
import { formatMomentValue, momentable } from '../__builtins__'

const { TimeRangePicker } = TdTimePicker

type ComposedTimePicker = React.FC<TimePickerProps> & {
  RangePicker?: React.FC<TimeRangePickerProps>
}

const mapTimeFormat = function () {
  return (props: any) => {
    const format = props['format'] || 'HH:mm:ss'
    const onChange = props.onChange
    return {
      ...props,
      format,
      value: momentable(props.value, format),
      onChange: (value: moment.Moment | moment.Moment[]) => {
        if (onChange) {
          onChange(formatMomentValue(value, format))
        }
      },
    }
  }
}

export const TimePicker: ComposedTimePicker = connect(
  TdTimePicker,
  mapProps(mapTimeFormat()),
  mapReadPretty(PreviewText.Input)
)

TimePicker.RangePicker = connect(
  TimeRangePicker,
  mapProps(mapTimeFormat()),
  mapReadPretty(PreviewText.Input)
)

export default TimePicker
