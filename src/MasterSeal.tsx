import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'
import { JobName, UnitName, objectEntries } from './utils/types'
import { JOB_GROUP } from './constants'
import { getDisplayName } from './utils/getDisplayName'

export const MasterSeal = ({
  unit,
  disabled,
  handleJobChange,
}: {
  unit: UnitName
  disabled: boolean
  handleJobChange: (arg: JobName) => void
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={'DropdownTrigger'} disabled={disabled}>
        Master Seal
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'DropdownMenuContent'}>
        {objectEntries(JOB_GROUP.ADVANCED).map(([key, { isExclusive }]) => {
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
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
