import * as SliderPrimitive from '@radix-ui/react-slider'
import React from 'react'

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ ...props }, forwardedRef) => {
  const value = props.value || props.defaultValue

  return (
    <SliderPrimitive.Slider
      className={'slider-root'}
      {...props}
      ref={forwardedRef}
    >
      <SliderPrimitive.Track className={'slider-track'}>
        <SliderPrimitive.Range className={'slider-range'} />
      </SliderPrimitive.Track>
      {value?.map((_, i) => (
        <SliderPrimitive.SliderThumb
          className={`slider-thumb ${i === 0 ? 'base' : 'invest'}`}
          key={i}
        >
          {i === 1 && props.children}
        </SliderPrimitive.SliderThumb>
      ))}
    </SliderPrimitive.Slider>
  )
})
