# Input

> Text input box

## Markup Schema example

```tsx
import React from 'react'
import {
  Input,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/tdesign-react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
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
        x-component="Input"
        x-validator={[
          {
            validator: async (value) => {
              await new Promise((resolve) => {
                setTimeout(() => {
                  resolve(value)
                }, 1000)
              })
              return value
            },
          },
        ]}
        required
        x-component-props={{
          style: {
            width: 240,
          },
        }}
      />
      <SchemaField.String
        name="textarea"
        title="text box"
        x-decorator="FormItem"
        required
        x-validator={[
          {
            validator: async (value) => {
              await new Promise((resolve) => {
                setTimeout(() => {
                  resolve(value)
                }, 1000)
              })
              return value
            },
          },
        ]}
        x-component="Input.TextArea"
        x-component-props={{
          style: {
            width: 400,
          },
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

参考 https://tdesign.tencent.com/react/components/input
