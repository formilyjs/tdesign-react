# PreviewText

> 阅读态组件，主要用来实现类 Input，类 DatePicker 这些组件的阅读态

## 简单用例

```tsx
import React from 'react'
import {
  PreviewText,
  FormItem,
  FormLayout,
  Input,
  Select,
  ArrayCards,
  ArrayCollapse,
  ArrayItems,
  ArrayTable,
  ArrayTabs,
  Card,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Editable,
  InputNumber,
  Radio,
  RangeInput,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormButtonGroup,
  Submit,
  Reset,
} from '@formily/tdesign-react'
import { Button } from 'tdesign-react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
    PreviewText,
    ArrayCards,
    ArrayCollapse,
    ArrayItems,
    ArrayTable,
    ArrayTabs,
    Card,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Editable,
    InputNumber,
    Radio,
    RangeInput,
    Switch,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    FormButtonGroup,
  },
})

const form = createForm({
  initialValues: {
    rangeInput: ['1', '3'],
    select: ['123', '222'],
    treeSelect: ['123', '222'],
    CheckboxGroup: ['上海'],
    timeRangePicker: ['16:11:55', '16:11:55'],
    dateRangePicker: ['2022-07-26', '2022-08-30'],
    transfer: ['1', '2', '3'],
    datePicker: '2022-07-06',
    input: '1',
    inputNumber: 2,
    cascader: 'yuhang',
    checkbox: true,
    radio: true,
    radioGroup: 'hangzhou',
    switch: true,
    timePicker: '16:11:51',
  },
})

export default () => {
  return (
    <FormLayout labelCol={6}>
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.String
            x-decorator="FormItem"
            title="Input"
            name="input"
            x-component="Input"
          />
          <SchemaField.Boolean
            x-decorator="FormItem"
            title="InputNumber"
            name="inputNumber"
            x-component="InputNumber"
          />
          <SchemaField.Array
            x-decorator="FormItem"
            title="RangeInput"
            name="rangeInput"
            x-component="RangeInput"
          />
          <SchemaField.Array
            x-decorator="FormItem"
            title="Select"
            name="select"
            x-component="Select"
            x-component-props={{
              multiple: true,
            }}
            enum={[
              { label: 'A111', value: '123' },
              { label: 'A222', value: '222' },
            ]}
          />
          <SchemaField.Array
            x-decorator="FormItem"
            title="TreeSelect"
            name="treeSelect"
            x-component="TreeSelect"
            x-component-props={{
              multiple: true,
            }}
            enum={[
              { label: 'A111', value: '123' },
              { label: 'A222', value: '222' },
            ]}
          />
          <SchemaField.String
            x-decorator="FormItem"
            title="Cascader"
            name="cascader"
            x-component="Cascader"
            enum={[
              {
                label: '杭州',
                value: 'hangzhou',
              },
              {
                label: '余杭',
                value: 'yuhang',
              },
            ]}
          />
          <SchemaField.Boolean
            x-decorator="FormItem"
            title="CheckBox"
            name="checkbox"
            x-component="Checkbox"
          />
          <SchemaField.Array
            x-decorator="FormItem"
            title="CheckBoxGroup"
            name="CheckboxGroup"
            enum={[
              {
                value: '北京',
                label: 1,
              },
              {
                value: '上海',
                label: 2,
              },
              {
                label: '全选',
                checkAll: true,
              },
            ]}
            x-component="Checkbox.Group"
          />
          <SchemaField.Boolean
            x-decorator="FormItem"
            title="Radio"
            name="radio"
            x-component="Radio"
          />
          <SchemaField.String
            x-decorator="FormItem"
            title="RadioGroup"
            name="radioGroup"
            x-component="Radio.Group"
            enum={[
              {
                label: '杭州',
                value: 'hangzhou',
              },
              {
                label: '余杭',
                value: 'yuhang',
              },
            ]}
          />
          <SchemaField.Boolean
            x-decorator="FormItem"
            title="Switch"
            name="switch"
            x-component="Switch"
          />
          <SchemaField.String
            x-decorator="FormItem"
            title="TimePicker"
            name="timePicker"
            x-component="TimePicker"
          />
          <SchemaField.Array
            x-decorator="FormItem"
            title="TimeRangePicker"
            name="timeRangePicker"
            x-component="TimePicker.RangePicker"
          />
          <SchemaField.String
            x-decorator="FormItem"
            title="DatePicker"
            name="datePicker"
            x-component="DatePicker"
          />
          <SchemaField.Array
            x-decorator="FormItem"
            title="DateRangePicker"
            name="dateRangePicker"
            x-component="DatePicker.RangePicker"
          />
          <SchemaField.Array
            x-decorator="FormItem"
            title="Transfer"
            name="transfer"
            enum={[
              {
                disabled: true,
                label: '内容0',
                value: '0',
              },
              {
                disabled: false,
                label: '内容1',
                value: '1',
              },
              {
                disabled: false,
                label: '内容2',
                value: '2',
              },
              {
                disabled: false,
                label: '内容3',
                value: '3',
              },
              {
                disabled: true,
                label: '内容4',
                value: '4',
              },
            ]}
            x-component="Transfer"
          />
        </SchemaField>
        <FormButtonGroup>
          <Submit onSubmit={console.log}>提交</Submit>
          <Reset>重置</Reset>
          <Button
            onClick={() => {
              form.setState((state) => {
                state.editable = !state.editable
              })
            }}
          >
            切换阅读态
          </Button>
        </FormButtonGroup>
      </FormProvider>
    </FormLayout>
  )
}
```

## API

### PreviewText.Placeholder

| 属性名 | 类型   | 描述       | 默认值 |
| ------ | ------ | ---------- | ------ |
| value  | stirng | 缺省占位符 | N/A    |

### PreviewText.usePlaceholder

```ts pure
interface usePlaceholder {
  (): string
}
```
