import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './components/Dropdown'
import { JobName, UnitName, objectEntries } from './utils/types'
import { JOB_GROUP, JOB_NAME } from './constants'

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
        {isAdvanced &&
          objectEntries(JOB_GROUP.ADVANCED).map(([key, { isExclusive }]) => {
            if (!isExclusive || isExclusive === unit) {
              return (
                <DropdownMenuItem
                  key={key}
                  className={'DropdownMenuItem'}
                  onSelect={() => handleJobChange(key)}
                >
                  {JOB_NAME[key]}
                </DropdownMenuItem>
              )
            }
          })}
        {objectEntries(JOB_GROUP.BASE).map(([key, { isExclusive }]) => {
          if (!isExclusive || isExclusive === unit) {
            return (
              <DropdownMenuItem
                key={key}
                className={'DropdownMenuItem'}
                onSelect={() => handleJobChange(key)}
              >
                {JOB_NAME[key]}
              </DropdownMenuItem>
            )
          }
        })}
        {objectEntries(JOB_GROUP.SPECIAL).map(([key, { isExclusive }]) => {
          if (!isExclusive || isExclusive === unit) {
            return (
              <DropdownMenuItem
                key={key}
                className={'DropdownMenuItem'}
                onSelect={() => handleJobChange(key)}
              >
                {JOB_NAME[key]}
              </DropdownMenuItem>
            )
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
