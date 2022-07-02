# Upload

```tsx
import React from 'react'
import {
  Upload,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/tdesign-react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Upload,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Array
        name="files"
        title="文件"
        x-decorator="FormItem"
        x-component="Upload"
        x-component-props={{
          tips: '文件大小在5M之内',
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```
