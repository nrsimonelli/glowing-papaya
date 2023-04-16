import { SelectGroup, SelectLabel } from '@radix-ui/react-select'
import { Select, SelectItem } from './components/Select'
import { JOB_NAME, JOB_GROUP, UNIT_NAME } from './constants'
import { UnitName, objectEntries } from './utils/types'

interface SelectJobProps {
  value: string
  onValueChange: React.Dispatch<React.SetStateAction<string>>
  selectedUnit: string
}
export const SelectJob = ({
  value,
  onValueChange,
  selectedUnit,
}: SelectJobProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectItem value={'default'}>{'Select a class'}</SelectItem>
      {/* Map Jobs... */}
      {objectEntries(JOB_GROUP).map(([group, jobList]) => (
        <SelectGroup key={group}>
          <SelectLabel className={'select-label'}>{group}</SelectLabel>
          {objectEntries(jobList).map(([key, { isExclusive }]) => {
            if (
              !isExclusive ||
              isExclusive === UNIT_NAME[selectedUnit as UnitName]
            ) {
              return (
                <SelectItem key={key} value={key}>
                  {JOB_NAME[key]}
                </SelectItem>
              )
            }
          })}
        </SelectGroup>
      ))}
    </Select>
  )
}
