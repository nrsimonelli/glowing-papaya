import { Select, SelectItem } from './components/Select'

export const SelectJob = () => {
  return (
    <Select value={''} onValueChange={() => console.log('valueChange')}>
      <SelectItem value={''}>{'Select a class'}</SelectItem>
      {/* Map Units... */}
    </Select>
  )
}
