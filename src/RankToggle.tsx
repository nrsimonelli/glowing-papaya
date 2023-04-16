import { useState } from 'react'
import { Toggle, ToggleOption } from './components/Toggle'
import { STAT_KEY } from './constants'

export const RankToggle = ({ statList, setStatList }) => {
  const isFull = statList.length === 3

  const handleValueChange = (value: string[]) => {
    console.log(value)
    if (!value) {
      return
    }
    setStatList(value)
  }

  const isSelected = (val: string) => statList.includes(val)

  return (
    <Toggle
      type={'multiple'}
      value={statList}
      onValueChange={(value) => handleValueChange(value)}
    >
      {STAT_KEY.map((key) => (
        <ToggleOption value={key} disabled={isFull && !isSelected(key)}>
          {key}
        </ToggleOption>
      ))}
    </Toggle>
  )
}
