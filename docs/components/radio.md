# Radio

> Text input box

## Markup Schema example

```tsx
import React from 'react'
import {
  Radio,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/tdesign-react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Radio,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="input"
        title="input box"
        x-decorator="FormItem"
        enum={[
          {
            label: 'Option 1',
            value: 1,
          },
          {
            label: 'Option 2',
            value: 2,
          },
        ]}
        x-component="Radio.Group"
        required
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

参考 https://tdesign.tencent.com/react/components/radio
