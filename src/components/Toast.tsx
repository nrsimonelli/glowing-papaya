import React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'

interface ToastProps {
  children: React.ReactNode
}

export interface ToastRef {
  publish: (info: { type: 'add' | 'remove'; payload: string }) => void
}

export const Toast = React.forwardRef<ToastRef, ToastProps>(
  (props, forwardedRef) => {
    const { children, ...toastProps } = props
    const [count, setCount] = React.useState<
      { type: 'add' | 'remove'; payload: string }[]
    >([])

    React.useImperativeHandle(forwardedRef, () => ({
      publish: (info) => setCount((count) => [...count, info]),
    }))

    return (
      <>
        {count.map(({ type, payload }, index) => (
          <ToastPrimitive.Root
            duration={3000}
            className={`ToastRoot ${type}`}
            key={index}
            {...toastProps}
          >
            <ToastPrimitive.Description className={`ToastDescription`}>
              {payload}
              {type === 'add' ? ' added to ' : ' removed from '}
              {children}
            </ToastPrimitive.Description>
            <ToastPrimitive.Close className='ToastAction'>
              <span aria-hidden>×</span>
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
      </>
    )
  }
)
