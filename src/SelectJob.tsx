import { Select, SelectItem } from './components/Select'

interface SelectJobProps {
  value: string
  onValueChange: React.Dispatch<React.SetStateAction<string>>
}
export const SelectJob = ({ value, onValueChange }: SelectJobProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectItem value={'default'}>{'Select a class'}</SelectItem>
      {/* Map Units... */}
    </Select>
  )
}
