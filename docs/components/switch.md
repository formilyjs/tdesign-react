# Switch

## 案例

```tsx
import React from 'react'
import {
  Switch,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/tdesign-react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Switch,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Boolean
        name="input"
        title="input box"
        x-decorator="FormItem"
        x-component="Switch"
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

参考 https://tdesign.tencent.com/react/components/switch
