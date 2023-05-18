import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './components/Dropdown'
import { JobName, UnitName, objectEntries, objectKeys } from './utils/types'
import { JOB_GROUP } from './constants'
import { getDisplayName } from './utils/getDisplayName'

export const JobChangeDropdown = ({
  unit,
  mapAdvanced,
  disabled,
  isMaxed,
  handleJobChange,
}: {
  unit: UnitName
  mapAdvanced: boolean
  disabled: boolean
  isMaxed: boolean
  handleJobChange: (arg: JobName) => void
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={'DropdownTrigger'}
        disabled={disabled}
        data-animate={isMaxed}
      >
        Change Class
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'DropdownMenuContent'}>
        {objectKeys(JOB_GROUP).map((jobGroupKey) => {
          if (mapAdvanced || jobGroupKey !== 'ADVANCED') {
            return objectEntries(JOB_GROUP[jobGroupKey]).map(
              ([key, { isExclusive }]) => {
                if (!isExclusive || isExclusive === getDisplayName(unit)) {
                  return (
                    <DropdownMenuItem
                      key={key}
                      className={'DropdownMenuItem'}
                      onSelect={() => handleJobChange(key)}
                    >
                      {getDisplayName(key)}
                    </DropdownMenuItem>
                  )
                }
              }
            )
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
