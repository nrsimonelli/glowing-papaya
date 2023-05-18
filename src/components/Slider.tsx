import * as SliderPrimitive from '@radix-ui/react-slider'
import React from 'react'

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ ...props }, forwardedRef) => {
  const value = props.value || props.defaultValue

  return (
    <SliderPrimitive.Slider
      className={'SliderRoot'}
      {...props}
      ref={forwardedRef}
    >
      <SliderPrimitive.Track className={'SliderTrack'}>
        <SliderPrimitive.Range className={'SliderRange'} />
      </SliderPrimitive.Track>
      {value?.map((_, i) => (
        <SliderPrimitive.SliderThumb className={`SliderThumb`} key={i}>
          {props.children}
        </SliderPrimitive.SliderThumb>
      ))}
    </SliderPrimitive.Slider>
  )
})
