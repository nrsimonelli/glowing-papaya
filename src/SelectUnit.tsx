import { Select, SelectItem } from './components/Select'

export const SelectUnit = () => {
  return (
    <Select value={''} onValueChange={() => console.log('valueChange')}>
      <SelectItem value={''}>{'Select a character'}</SelectItem>
      {/* Map Units... */}
    </Select>
  )
}
