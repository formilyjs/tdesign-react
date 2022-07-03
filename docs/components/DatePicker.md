# DatePicker

> 日期选择器

## Markup Schema 案例

```tsx
import React from 'react'
import {
  DatePicker,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/tdesign-react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    DatePicker,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="date"
        required
        title="普通日期"
        x-decorator="FormItem"
        x-component="DatePicker"
      />
      <SchemaField.String
        name="week"
        title="周选择"
        x-decorator="FormItem"
        x-component="DatePicker"
        x-component-props={{
          picker: 'week',
        }}
      />
      <SchemaField.String
        name="month"
        title="月选择"
        x-decorator="FormItem"
        x-component="DatePicker"
        x-component-props={{
          picker: 'month',
        }}
      />
      <SchemaField.String
        name="quarter"
        title="财年选择"
        x-decorator="FormItem"
        x-component="DatePicker"
        x-component-props={{
          picker: 'quarter',
        }}
      />
      <SchemaField.String
        name="year"
        title="年选择"
        x-decorator="FormItem"
        x-component="DatePicker"
        x-component-props={{
          picker: 'year',
        }}
      />
      <SchemaField.Array
        name="[startDate,endDate]"
        title="日期范围"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          showTime: true,
        }}
      />
      <SchemaField.String
        name="range_week"
        title="周范围选择"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          picker: 'week',
        }}
      />
      <SchemaField.Array
        name="range_month"
        title="月范围选择"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          picker: 'month',
        }}
      />
      <SchemaField.Array
        name="range_quarter"
        title="财年范围选择"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          picker: 'quarter',
        }}
      />
      <SchemaField.Array
        name="range_year"
        title="年范围选择"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          picker: 'year',
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema 案例

```tsx
import React from 'react'
import {
  DatePicker,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/tdesign-react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    DatePicker,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    date: {
      title: '普通日期',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      type: 'string',
    },
    week: {
      title: '周选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'week',
      },
      type: 'string',
    },
    month: {
      title: '月选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'month',
      },
      type: 'string',
    },
    quarter: {
      title: '财年选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'quarter',
      },
      type: 'string',
    },
    year: {
      title: '年选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'year',
      },
      type: 'string',
    },
    '[startDate,endDate]': {
      title: '日期范围',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        showTime: true,
      },
      type: 'array',
    },
    range_week: {
      title: '周范围选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        picker: 'week',
      },
      type: 'array',
    },
    range_month: {
      title: '月范围选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        picker: 'month',
      },
      type: 'array',
    },
    range_quarter: {
      title: '财年范围选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        picker: 'quarter',
      },
      type: 'array',
    },
    range_year: {
      name: 'range_year',
      title: '年范围选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        picker: 'year',
      },
      type: 'array',
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## 纯 JSX 案例

```tsx
import React from 'react'
import {
  DatePicker,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/tdesign-react'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="date"
      title="日期选择"
      decorator={[FormItem]}
      component={[DatePicker]}
    />
    <Field
      name="week"
      title="周选择"
      decorator={[FormItem]}
      component={[
        DatePicker,
        {
          picker: 'week',
        },
      ]}
    />
    <Field
      name="quarter"
      title="财年选择"
      decorator={[FormItem]}
      component={[
        DatePicker,
        {
          picker: 'month',
        },
      ]}
    />
    <Field
      name="year"
      title="年选择"
      decorator={[FormItem]}
      component={[
        DatePicker,
        {
          picker: 'year',
        },
      ]}
    />
    <Field
      name="[startDate,endDate]"
      title="日期范围选择"
      decorator={[FormItem]}
      component={[DatePicker.RangePicker]}
    />
    <Field
      name="range_week"
      type="array"
      title="周范围选择"
      decorator={[FormItem]}
      component={[
        DatePicker.RangePicker,
        {
          picker: 'week',
        },
      ]}
    />
    <Field
      name="range_month"
      title="月范围选择"
      type="array"
      decorator={[FormItem]}
      component={[
        DatePicker.RangePicker,
        {
          picker: 'month',
        },
      ]}
    />
    <Field
      name="range_quarter"
      title="财年范围选择"
      decorator={[FormItem]}
      component={[
        DatePicker.RangePicker,
        {
          picker: 'quarter',
        },
      ]}
    />
    <Field
      name="range_year"
      title="年范围选择"
      decorator={[FormItem]}
      component={[
        DatePicker.RangePicker,
        {
          picker: 'year',
        },
      ]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

参考 https://tdesign.tencent.com/react/components/date-picker?tab=api
