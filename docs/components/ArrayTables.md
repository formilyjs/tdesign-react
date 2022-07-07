# ArrayTable

> 自增表格，对于数据量超大的场景比较适合使用该组件，虽然数据量大到一定程度会有些许卡顿，但是不会影响基本操作
>
> 注意：该组件只适用于 Schema 场景，且只能是对象数组

## 自增主键处理

> 由于目前 tdesign 的 table 暂时不支持设置 rowKey 为一个函数，所以需要为数据制定一个唯一的 key， 这个 key 不能是表单项的 name, table 内部会用数据项的 index 作为 key 的值。

```tsx | pure
<SchemaField.Array
  name="array"
  x-decorator="FormItem"
  x-component="ArrayTable"
  x-component-props={{
   rowKey: 'rowKey',
  }}
>
```

## 排序

> 制定 Column 的 dataIndex 字段为 drag, ArrayTable.SortHandle 只是一个默认图标，可以替换

```tsx | pure
<SchemaField.Void
  x-component="ArrayTable.Column"
  x-component-props={{
    width: 80,
    title: 'Sort',
    dataIndex: 'drag',
    align: 'center',
  }}
>
  <SchemaField.Void
    x-decorator="FormItem"
    required
    x-component="ArrayTable.SortHandle"
  />
</SchemaField.Void>
```

## Markup Schema 案例

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  ArrayTable,
  Editable,
  FormButtonGroup,
  Submit,
} from '@formily/tdesign-react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Button, Alert } from 'tdesign-react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    Input,
    ArrayTable,
  },
})

const form = createForm()

const range = (count: number) => Array.from(new Array(count))

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="array"
          x-decorator="FormItem"
          x-component="ArrayTable"
          x-component-props={{
            rowKey: 'rowKey',
          }}
        >
          <SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{
                width: 80,
                title: 'Sort',
                dataIndex: 'drag',
                align: 'center',
              }}
            >
              <SchemaField.Void
                x-decorator="FormItem"
                required
                x-component="ArrayTable.SortHandle"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{
                width: 80,
                title: 'Index',
                align: 'center',
                dataIndex: 'index',
              }}
            >
              <SchemaField.Void
                x-decorator="FormItem"
                required
                x-component="ArrayTable.Index"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: 'A1', width: 200, dataIndex: 'a1' }}
            >
              <SchemaField.String
                name="aaa"
                x-decorator="Editable"
                required
                x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: 'A2', width: 200 }}
            >
              <SchemaField.String
                x-decorator="FormItem"
                name="a2"
                x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: 'A3', width: 200 }}
            >
              <SchemaField.String
                x-decorator="FormItem"
                name="a3"
                x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{
                title: 'Operations',
                dataIndex: 'operations',
                width: 200,
                fixed: 'right',
              }}
            >
              <SchemaField.Void x-component="FormItem">
                <SchemaField.Void x-component="ArrayTable.Remove" />
                <SchemaField.Void x-component="ArrayTable.MoveDown" />
                <SchemaField.Void x-component="ArrayTable.MoveUp" />
              </SchemaField.Void>
            </SchemaField.Void>
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayTable.Addition"
            title="添加条目"
          />
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
        <Button
          block
          onClick={() => {
            form.setValues({
              array: range(10000),
            })
          }}
        >
          加载10W条超大数据
        </Button>
      </FormButtonGroup>
      <Alert
        style={{ marginTop: 10 }}
        message="注意：开启formily插件的页面，因为后台有数据通信，会占用浏览器算力，最好在无痕模式(无formily插件)下测试"
      />
    </FormProvider>
  )
}
```
