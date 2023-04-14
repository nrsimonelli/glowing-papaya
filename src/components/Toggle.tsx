import React, { ReactNode } from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle-group'

export const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ children, ...props }, forwardedRef) => {
  return (
    <TogglePrimitive.Root
      className={'toggle-root'}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </TogglePrimitive.Root>
  )
})

export const ToggleOption = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Item>
>(({ children, ...props }, forwardedRef) => {
  return (
    <TogglePrimitive.Item
      className={'toggle-item'}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </TogglePrimitive.Item>
  )
})
