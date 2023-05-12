import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './components/Dropdown'
import { JobName, UnitName, objectEntries, objectKeys } from './utils/types'
import { JOB_GROUP, JOB_NAME } from './constants'
import { getDisplayName } from './utils/getDisplayName'

export const SecondSeal = ({
  unit,
  isAdvanced,
  disabled,
  handleJobChange,
}: {
  unit: UnitName
  isAdvanced: boolean
  disabled: boolean
  handleJobChange: (arg: JobName) => void
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={'DropdownTrigger'} disabled={disabled}>
        Second Seal
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'DropdownMenuContent'}>
        {objectKeys(JOB_GROUP).map((jobGroupKey) => {
          if (isAdvanced || jobGroupKey !== 'ADVANCED') {
            return objectEntries(JOB_GROUP[jobGroupKey]).map(
              ([key, { isExclusive }]) => {
                if (!isExclusive || isExclusive === unit) {
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
