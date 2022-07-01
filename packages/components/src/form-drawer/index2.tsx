import React, { Fragment, useRef, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { createForm, IFormProps, Form } from '@formily/core'
import { toJS } from '@formily/reactive'
import { FormProvider, Observer, observer } from '@formily/react'
import {
  isNum,
  isStr,
  isBool,
  isFn,
  applyMiddleware,
  IMiddleware,
} from '@formily/shared'
import { Drawer, DrawerProps } from 'tdesign-react'
import {
  usePrefixCls,
  loading,
  createPortalProvider,
  createPortalRoot,
} from '../__builtins__'

type FormDrawerRenderer =
  | React.ReactElement
  | ((form: Form) => React.ReactElement)

type ModalTitle = string | number | React.ReactElement

const isModalTitle = (props: any): props is ModalTitle => {
  return (
    isNum(props) || isStr(props) || isBool(props) || React.isValidElement(props)
  )
}

const getModelProps = (props: any): IDrawerProps => {
  if (isModalTitle(props)) {
    return {
      header: props,
    }
  } else {
    return props
  }
}

export interface IFormDrawer {
  forOpen(middleware: IMiddleware<IFormProps>): IFormDrawer
  forConfirm(middleware: IMiddleware<Form>): IFormDrawer
  forCancel(middleware: IMiddleware<Form>): IFormDrawer
  open(props?: IFormProps): Promise<any>
  close(): void
}

export interface IDrawerProps extends DrawerProps {
  onConfirm?: (context) => void | boolean
  onCancel?: (context) => void | boolean
  loadingText?: string
  confirmText?: string
}

export function FormDrawer(
  title: IDrawerProps,
  id: string,
  renderer: FormDrawerRenderer
): IFormDrawer
export function FormDrawer(
  title: IDrawerProps,
  renderer: FormDrawerRenderer
): IFormDrawer
export function FormDrawer(
  title: ModalTitle,
  id: string,
  renderer: FormDrawerRenderer
): IFormDrawer
export function FormDrawer(
  title: ModalTitle,
  renderer: FormDrawerRenderer
): IFormDrawer
export function FormDrawer(title: any, id: any, renderer?: any): IFormDrawer {
  if (isFn(id) || React.isValidElement(id)) {
    renderer = id
    id = 'form-drawer'
  }
  const env = {
    host: document.createElement('div'),
    form: null,
    promise: null,
    openMiddlewares: [],
    confirmMiddlewares: [],
    cancelMiddlewares: [],
  }
  const root = createPortalRoot(env.host, id)
  const props = getModelProps(title)
  const drawer = {
    ...props,
    onClose: (e) => {
      props?.onClose?.(e)
      root.unmount()
    },
  }
  const DrawerContent = observer(() => {
    return (
      <Fragment>{isFn(renderer) ? renderer(env?.form) : renderer}</Fragment>
    )
  })
  const renderDrawer = (
    visible = true,
    resolve?: () => any,
    reject?: () => any
  ) => {
    return (
      <Observer>
        {() => (
          <Drawer
            {...drawer}
            visible={visible}
            confirmBtn={{
              loading: env.form.submitting,
              content: drawer.confirmText || '确认',
            }}
            onCancel={(e) => {
              if (drawer?.onCancel?.(e) !== false) {
                reject()
              }
            }}
            onClose={(e) => {
              if (drawer?.onCancel?.(e) !== false) {
                reject()
              }
            }}
            onConfirm={async (e) => {
              if (drawer?.onConfirm?.(e) !== false) {
                resolve()
              }
            }}
          >
            <FormProvider form={env.form}>
              <DrawerContent />
            </FormProvider>
          </Drawer>
        )}
      </Observer>
    )
  }

  document.body.appendChild(env.host)
  const formDrawer = {
    forOpen: (middleware: IMiddleware<IFormProps>) => {
      if (isFn(middleware)) {
        env.openMiddlewares.push(middleware)
      }
      return formDrawer
    },
    forConfirm: (middleware: IMiddleware<Form>) => {
      if (isFn(middleware)) {
        env.confirmMiddlewares.push(middleware)
      }
      return formDrawer
    },
    forCancel: (middleware: IMiddleware<Form>) => {
      if (isFn(middleware)) {
        env.cancelMiddlewares.push(middleware)
      }
      return formDrawer
    },
    open: async (props: IFormProps) => {
      if (env.promise) return env.promise
      env.promise = new Promise(async (resolve, reject) => {
        try {
          props = await loading(drawer.loadingText, () =>
            applyMiddleware(props, env.openMiddlewares)
          )
          env.form = env.form || createForm(props)
        } catch (e) {
          reject(e)
        }
        root.render(() =>
          renderDrawer(
            true,
            () => {
              env.form
                .submit(async () => {
                  await applyMiddleware(env.form, env.confirmMiddlewares)
                  resolve(toJS(env.form.values))
                  formDrawer.close()
                })
                .catch(() => {})
            },
            async () => {
              await loading(drawer.loadingText, () =>
                applyMiddleware(env.form, env.cancelMiddlewares)
              )
              formDrawer.close()
            }
          )
        )
      })
      return env.promise
    },
    close: () => {
      if (!env.host) return
      root.render(() => renderDrawer(false))
    },
  }
  return formDrawer
}

const DrawerFooter: React.FC = (props) => {
  const ref = useRef<HTMLDivElement>()
  const [footer, setFooter] = useState<HTMLDivElement>()
  const footerRef = useRef<HTMLDivElement>()
  const prefixCls = usePrefixCls('drawer')
  useLayoutEffect(() => {
    const content = ref.current?.closest(`.${prefixCls}-content`)
    if (content) {
      if (!footerRef.current) {
        footerRef.current = content.querySelector(`.${prefixCls}-footer`)
        if (!footerRef.current) {
          footerRef.current = document.createElement('div')
          footerRef.current.classList.add(`${prefixCls}-footer`)
          content.appendChild(footerRef.current)
        }
      }
      setFooter(footerRef.current)
    }
  })

  footerRef.current = footer

  return (
    <div ref={ref} style={{ display: 'none' }}>
      {footer && createPortal(props.children, footer)}
    </div>
  )
}

FormDrawer.Footer = DrawerFooter

FormDrawer.Portal = createPortalProvider('form-drawer')

export default FormDrawer
