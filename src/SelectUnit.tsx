import { Select, SelectItem } from './components/Select'
import { UNIT_NAME } from './constants'
import { UnitName, objectEntries } from './utils/types'

interface SelectUnitProps {
  value: string
  onValueChange: React.Dispatch<React.SetStateAction<UnitName | 'default'>>
}
export const SelectUnit = ({ value, onValueChange }: SelectUnitProps) => {
  return (
    <Select
      value={value}
      onValueChange={(value) => onValueChange(value as UnitName)}
    >
      <SelectItem value={'default'}>{'Select a character'}</SelectItem>
      {objectEntries(UNIT_NAME).map(([unitKey, displayName]) => (
        <SelectItem key={unitKey} value={unitKey}>
          {displayName}
        </SelectItem>
      ))}
    </Select>
  )
}
