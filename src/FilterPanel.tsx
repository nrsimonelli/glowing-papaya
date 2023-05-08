import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon, MinusIcon } from '@radix-ui/react-icons'
import { ReactNode, useState } from 'react'
import React from 'react'

export const FilterPanel = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Filters</button>
      <div data-state={isOpen ? 'expanded' : 'collapsed'}>{children}</div>
    </div>
  )
}

export const FilterItem = React.forwardRef<
  React.ElementRef<typeof Checkbox.Root>,
  React.ComponentPropsWithoutRef<typeof Checkbox.Root>
>(({ title, children, ...props }, forwardedRef) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
      <Checkbox.Root
        id={title}
        className='CheckboxRoot'
        ref={forwardedRef}
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
