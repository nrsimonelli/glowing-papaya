import { useState } from 'react'
import { Toggle, ToggleOption } from './components/Toggle'
import { STAT_KEY } from './constants'

export const OverviewMode = () => {
  const [value, setValue] = useState('Growth')
  return (
    <Toggle
      type={'single'}
      defaultValue={value}
      onValueChange={(value) => {
        if (value) setValue(value)
      }}
    >
      <ToggleOption value={'Growth'}>{'Growth Rate'}</ToggleOption>
      <ToggleOption value={'Max'}>{'Stat Maximum'}</ToggleOption>
      <ToggleOption value={'All'}>{'Combined'}</ToggleOption>
    </Toggle>
  )
}
