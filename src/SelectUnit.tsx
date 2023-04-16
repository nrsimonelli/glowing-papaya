import { Select, SelectItem } from './components/Select'
import { UNIT_NAME } from './constants'
import { objectEntries } from './utils/types'

interface SelectUnitProps {
  value: string
  onValueChange: React.Dispatch<React.SetStateAction<string>>
}
export const SelectUnit = ({ value, onValueChange }: SelectUnitProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectItem value={'default'}>{'Select a character'}</SelectItem>
      {/* Map Units... */}
      {objectEntries(UNIT_NAME).map(([unitKey, displayName]) => (
        <SelectItem key={unitKey} value={unitKey}>
          {displayName}
        </SelectItem>
      ))}
    </Select>
  )
}
