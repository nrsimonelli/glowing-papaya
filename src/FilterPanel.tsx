import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon, MinusIcon } from '@radix-ui/react-icons'
import { ReactNode, useState } from 'react'
import React from 'react'

export const FilterPanel = ({
  isOpen,
  children,
}: {
  isOpen: boolean
  children: ReactNode
}) => {
  return (
    <div className='filter-container'>
      <div
        className={'filter-content'}
        data-state={isOpen ? 'expanded' : 'collapsed'}
      >
        {children}
      </div>
    </div>
  )
}

export const FilterItem = React.forwardRef<
  React.ElementRef<typeof Checkbox.Root>,
  React.ComponentPropsWithoutRef<typeof Checkbox.Root>
>(({ title, children, ...props }, forwardedRef) => {
  return (
    <div className='filter-item'>
      <Checkbox.Root
        id={title}
        ref={forwardedRef}
        className='CheckboxRoot'
        {...props}
      >
        <Checkbox.Indicator className='CheckboxIndicator'>
          {props.checked === true && <CheckIcon />}
          {props.checked === 'indeterminate' && <MinusIcon />}
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className='Label' htmlFor={title}>
        {children}
      </label>
    </div>
  )
})
