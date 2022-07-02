import React, { Fragment, useState, useRef, useEffect } from 'react'
import {
  Table,
  Pagination,
  Space,
  Select,
  Badge,
  PaginationProps,
  TableProps,
  SelectProps,
  PrimaryTableCol,
} from 'tdesign-react'
import cls from 'classnames'
import { GeneralField, FieldDisplayTypes, ArrayField } from '@formily/core'
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField,
} from '@formily/react'
import { isArr, isBool } from '@formily/shared'
import { Schema } from '@formily/json-schema'
import { usePrefixCls } from '../__builtins__'
import { ArrayBase, ArrayBaseMixins } from '../array-base'

interface ObservableColumnSource {
  field: GeneralField
  columnProps: ColumnProps<any>
  schema: Schema
  display: FieldDisplayTypes
  name: string
}
interface IArrayTablePaginationProps extends PaginationProps {
  data?: any[]
  children?: (data: any[], pagination: React.ReactNode) => React.ReactElement
}

interface IStatusSelectProps extends SelectProps {
  pageSize?: number
  options?: {
    label: string
    value: number
  }[]
}

type ComposedArrayTable = React.FC<TableProps> &
  ArrayBaseMixins & {
    Column?: React.FC<ColumnProps<any>>
  }
const { Option } = Select

const isColumnComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Column') > -1
}

const isOperationsComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Operations') > -1
}

/**
 *
 * @param schema
 * @returns
 */
const isAdditionComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

const useArrayTableSources = () => {
  const arrayField = useField()
  const schema = useFieldSchema()
  const parseSources = (schema: Schema): ObservableColumnSource[] => {
    if (
      isColumnComponent(schema) ||
      isOperationsComponent(schema) ||
      isAdditionComponent(schema)
    ) {
      if (!schema['x-component-props']?.['dataIndex'] && !schema['name'])
        return []
      const name = schema['x-component-props']?.['dataIndex'] || schema['name']
      const field = arrayField.query(arrayField.address.concat(name)).take()
      const columnProps =
        field?.component?.[1] || schema['x-component-props'] || {}
      const display = field?.display || schema['x-display']
      return [
        {
          name,
          display,
          field,
          schema,
          columnProps,
        },
      ]
    } else if (schema.properties) {
      return schema.reduceProperties((buf, schema) => {
        return buf.concat(parseSources(schema))
      }, [])
    }
  }

  const parseArrayItems = (schema: Schema['items']) => {
    if (!schema) return []
    const sources: ObservableColumnSource[] = []
    const items = isArr(schema) ? schema : [schema]
    return items.reduce((columns, schema) => {
      const item = parseSources(schema)
      if (item) {
        return columns.concat(item)
      }
      return columns
    }, sources)
  }

  if (!schema) throw new Error('can not found schema object')

  return parseArrayItems(schema.items)
}

const useArrayTableColumns = (
  data: any[],
  sources: ObservableColumnSource[]
): Array<PrimaryTableCol<any>> => {
  return sources.reduce((buf, { name, columnProps, schema, display }, key) => {
    if (display !== 'visible') return buf
    if (!isColumnComponent(schema)) return buf
    return buf.concat({
      ...columnProps,
      key,
      title: columnProps.title,
      colKey: name,
      cell: ({ row }) => {
        const index = data.indexOf(row)
        const children = (
          <ArrayBase.Item index={index} record={row}>
            <RecursionField schema={schema} name={index} onlyRenderProperties />
          </ArrayBase.Item>
        )
        return children
      },
    })
  }, [])
}

const useAddition = () => {
  const schema = useFieldSchema()
  return schema.reduceProperties((addition, schema, key) => {
    if (isAdditionComponent(schema)) {
      return <RecursionField schema={schema} name={key} />
    }
    return addition
  }, null)
}

const schedulerRequest = {
  request: null,
}

const StatusSelect: React.FC<IStatusSelectProps> = observer(
  (props) => {
    const field = useField<ArrayField>()
    const prefixCls = usePrefixCls('formily-array-table')
    const errors = field.errors
    const parseIndex = (address: string) => {
      return Number(
        address
          .slice(address.indexOf(field.address.toString()) + 1)
          .match(/(\d+)/)?.[1]
      )
    }
    const options = props.options?.map((option) => {
      const { label, value } = option
      const hasError = errors.some(({ address }) => {
        const currentIndex = parseIndex(address)
        const startIndex = (value - 1) * props.pageSize
        const endIndex = value * props.pageSize
        return currentIndex >= startIndex && currentIndex <= endIndex
      })
      return {
        label: hasError ? (
          <Badge dot count={1}>
            {label}
          </Badge>
        ) : (
          label
        ),
        value,
      }
    })

    const width = String(options?.length).length * 15
    return (
      <Select
        value={props.value}
        onChange={props.onChange}
        style={{
          width: width < 60 ? 60 : width,
        }}
        className={cls(`${prefixCls}-status-select`, {
          'has-error': errors?.length,
        })}
      >
        {options.map((item) => (
          <Option value={item.value} key={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    )
  },
  {
    scheduler: (update) => {
      clearTimeout(schedulerRequest.request)
      schedulerRequest.request = setTimeout(() => {
        update()
      }, 100)
    },
  }
)

const ArrayTablePagination: React.FC<IArrayTablePaginationProps> = (props) => {
  const [current, setCurrent] = useState(1)
  const prefixCls = usePrefixCls('formily-array-table')
  const pageSize = props.pageSize || 10
  // const size = props.size || 'default'
  const data = props.data || []
  const startIndex = (current - 1) * pageSize
  const endIndex = startIndex + pageSize - 1
  const total = data?.length || 0
  const totalPage = Math.ceil(total / pageSize)
  const pages = Array.from(new Array(totalPage)).map((_, index) => {
    const page = index + 1
    return {
      label: `${page}`,
      value: page,
    }
  })
  const handleChange = (current: number) => {
    setCurrent(current)
  }

  useEffect(() => {
    if (totalPage > 0 && totalPage < current) {
      handleChange(totalPage)
    }
  }, [totalPage, current])

  const renderPagination = () => {
    if (totalPage <= 1) return
    return (
      <div className={`${prefixCls}-pagination`}>
        <Space>
          <StatusSelect
            value={current}
            pageSize={pageSize}
            onChange={handleChange}
            options={pages}
          />
          <Pagination
            {...props}
            pageSize={pageSize}
            current={current}
            total={data.length}
            showPageNumber={false}
            onChange={(pageInfo) => {
              handleChange(pageInfo.current)
            }}
          />
        </Space>
      </div>
    )
  }

  return (
    <Fragment>
      {props.children?.(
        data?.slice(startIndex, endIndex + 1),
        renderPagination()
      )}
    </Fragment>
  )
}

export const ArrayTable: ComposedArrayTable = observer((props: TableProps) => {
  const ref = useRef<HTMLDivElement>()
  const field = useField<ArrayField>()
  const prefixCls = usePrefixCls('formily-array-table')
  const data = Array.isArray(field.value) ? field.value.slice() : []
  const sources = useArrayTableSources()
  const columns = useArrayTableColumns(data, sources)
  const pagination = isBool(props.pagination) ? {} : props.pagination
  const addition = useAddition()
  // const defaultRowKey = (record: any) => {
  //   return data.indexOf(record)
  // }

  return (
    <ArrayTablePagination {...pagination} data={data}>
      {(_data, pager) => (
        <div ref={ref} className={prefixCls}>
          <ArrayBase>
            <Table
              size="medium"
              // tableLayout="fixed"
              // verticalAlign="middle"
              // size="small"
              rowKey="rowKey"
              disableDataPage={false}
              columns={columns}
              data={_data}
              dragSort="row-handler"
              onDragSort={({ currentIndex, targetIndex }) => {
                field.move(currentIndex, targetIndex)
              }}
              {...props}
            />
            <div style={{ marginTop: 5, marginBottom: 5 }}>{pager}</div>

            {sources.map((column, key) => {
              //专门用来承接对Column的状态管理
              if (!isColumnComponent(column.schema)) return
              return React.createElement(RecursionField, {
                name: column.name,
                schema: column.schema,
                onlyRenderSelf: true,
                key,
              })
            })}
            {addition}
          </ArrayBase>
        </div>
      )}
    </ArrayTablePagination>
  )
})

ArrayTable.displayName = 'ArrayTable'

ArrayTable.Column = () => {
  return <Fragment />
}

ArrayBase.mixin(ArrayTable)

export default ArrayTable
