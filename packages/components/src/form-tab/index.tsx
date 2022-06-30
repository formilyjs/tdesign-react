import React, { Fragment, useMemo } from 'react'
import { Tabs, Badge, TabPanelProps, TabsProps, TabValue } from 'tdesign-react'
import { model, markRaw } from '@formily/reactive'
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField,
} from '@formily/react'
import { Schema, SchemaKey } from '@formily/json-schema'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
export interface IFormTab {
  activeKey: TabValue
  setActiveKey(key: TabValue): void
}

export interface IFormTabProps extends TabsProps {
  formTab?: IFormTab
}

export interface IFormTabPaneProps extends TabPanelProps {
  key: TabValue
  style?: React.CSSProperties
}

type ComposedFormTab = React.FC<IFormTabProps> & {
  TabPanel?: React.FC<IFormTabPaneProps>
  createFormTab?: (defaultActiveKey?: TabValue) => IFormTab
}

const useTabs = () => {
  const tabsField = useField()
  const schema = useFieldSchema()
  const tabs: { name: SchemaKey; props: any; schema: Schema }[] = []
  schema.mapProperties((schema, name) => {
    const field = tabsField.query(tabsField.address.concat(name)).take()
    if (field?.display === 'none' || field?.display === 'hidden') return
    if (schema['x-component']?.indexOf('TabPane') > -1) {
      tabs.push({
        name,
        props: {
          key: schema?.['x-component-props']?.key || name,
          ...schema?.['x-component-props'],
        },
        schema,
      })
    }
  })
  return tabs
}

const createFormTab = (defaultActiveKey?: TabValue) => {
  const formTab = model({
    activeKey: defaultActiveKey,
    setActiveKey(key: TabValue) {
      formTab.activeKey = key
    },
  })
  return markRaw(formTab)
}

export const FormTab: ComposedFormTab = observer(({ formTab, ...props }) => {
  const field = useField()
  const tabs = useTabs()
  const _formTab = useMemo(() => {
    return formTab ? formTab : createFormTab()
  }, [])
  const prefixCls = usePrefixCls('formily-tab')
  const activeKey = props.value || _formTab?.activeKey

  const badgedTab = (key: SchemaKey, props: any) => {
    const errors = field.form.queryFeedbacks({
      type: 'error',
      address: `${field.address.concat(key)}.*`,
    })
    if (errors.length) {
      return (
        <Badge size="small" className="errors-badge" count={errors.length}>
          {props.tab}
        </Badge>
      )
    }
    return props.tab
  }
  return (
    <Tabs
      {...props}
      className={cls(prefixCls, props.className)}
      value={activeKey}
      onChange={(key) => {
        props.onChange?.(key)
        formTab?.setActiveKey?.(key)
      }}
    >
      {tabs.map(({ props, schema, name }, key) => (
        <Tabs.TabPanel
          key={key}
          value={name}
          className={cls({
            [`${prefixCls}-panel`]: true,
          })}
          destroyOnHide={false}
          {...props}
          label={badgedTab(name, props)}
        >
          <RecursionField schema={schema} name={name} />
        </Tabs.TabPanel>
      ))}
    </Tabs>
  )
})

const TabPanel: React.FC<IFormTabPaneProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

FormTab.TabPanel = TabPanel
FormTab.createFormTab = createFormTab

export default FormTab
