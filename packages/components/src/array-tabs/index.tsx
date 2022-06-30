import React, { useState } from 'react'
import { Tabs, Badge, TabsProps, TabValue } from 'tdesign-react'
import { ArrayField } from '@formily/core'
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField,
} from '@formily/react'

export const ArrayTabs: React.FC<TabsProps> = observer((props) => {
  const field = useField<ArrayField>()
  const schema = useFieldSchema()
  const [activeKey, setActiveKey] = useState<TabValue>('tab-0')
  const value = Array.isArray(field.value) ? field.value : []
  const dataSource = value?.length ? value : [{}]
  const onAdd = () => {
    const id = dataSource.length
    if (field?.value?.length) {
      field.push(null)
    } else {
      field.push(null, null)
    }
    setActiveKey(`tab-${id}`)
  }
  const onRemove = ({ index }) => {
    if (index - 1 > -1) {
      setActiveKey(`tab-${index - 1}`)
    }
    field.remove(index)
  }
  const badgedTab = (index: number) => {
    const tab = `${field.title || 'Untitled'} ${index + 1}`
    const errors = field.errors
    if (errors.length) {
      return (
        <Badge size="small" className="errors-badge" count={errors.length}>
          {tab}
        </Badge>
      )
    }
    return tab
  }
  return (
    <Tabs
      theme={'card'}
      {...props}
      value={activeKey}
      onChange={(key) => {
        setActiveKey(key)
      }}
      addable
      onAdd={onAdd}
      onRemove={onRemove}
    >
      {dataSource?.map((item, index) => {
        const items = Array.isArray(schema.items)
          ? schema.items[index]
          : schema.items
        const key = `tab-${index}`
        return (
          <Tabs.TabPanel
            key={key}
            value={key}
            destroyOnHide={false}
            removable={index !== 0}
            label={badgedTab(index)}
          >
            <RecursionField schema={items} name={index} />
          </Tabs.TabPanel>
        )
      })}
    </Tabs>
  )
})

export default ArrayTabs
