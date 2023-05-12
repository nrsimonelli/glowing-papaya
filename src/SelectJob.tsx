import { SelectGroup, SelectLabel } from '@radix-ui/react-select'
import { Select, SelectItem } from './components/Select'
import { JOB_GROUP, UNIT_NAME } from './constants'
import { JobName, UnitName, objectEntries } from './utils/types'
import { getDisplayName } from './utils/getDisplayName'

interface SelectJobProps {
  value: string
  onValueChange: React.Dispatch<React.SetStateAction<JobName | 'default'>>
  selectedUnit?: string
}
export const SelectJob = ({
  value,
  onValueChange,
  selectedUnit,
}: SelectJobProps) => {
  return (
    <Select
      value={value}
      onValueChange={(val) => onValueChange(val as JobName)}
    >
      <SelectItem value={'default'}>{'Select a class'}</SelectItem>
      {/* Map Jobs... */}
      {objectEntries(JOB_GROUP).map(([group, jobList]) => (
        <SelectGroup key={group}>
          <SelectLabel className={'select-label'}>{group}</SelectLabel>
          {objectEntries(jobList).map(([key, { isExclusive }]) => {
            if (!isExclusive) {
              return (
                <SelectItem key={key} value={key}>
                  {getDisplayName(key)}
                </SelectItem>
              )
            }
            if (
              selectedUnit &&
              isExclusive === UNIT_NAME[selectedUnit as UnitName]
            ) {
              return (
                <SelectItem key={key} value={key}>
                  {getDisplayName(key)}
                </SelectItem>
              )
            }
          })}
        </SelectGroup>
      ))}
    </Select>
  )
}
