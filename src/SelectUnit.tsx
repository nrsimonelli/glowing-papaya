import { Select, SelectItem } from './components/Select'

interface SelectUnitProps {
  value: string
  onValueChange: React.Dispatch<React.SetStateAction<string>>
}
export const SelectUnit = ({ value, onValueChange }: SelectUnitProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectItem value={'default'}>{'Select a character'}</SelectItem>
      {/* Map Units... */}
    </Select>
  )
}
