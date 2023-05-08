import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'
import { UnitName, objectEntries } from './utils/types'
import { JOB_GROUP, JOB_NAME } from './constants'

export const SecondSeal = ({
  unit,
  isAdvanced,
  disabled,
}: {
  unit: UnitName
  isAdvanced: boolean
  disabled: boolean
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled}>Second Seal</DropdownMenuTrigger>
      <DropdownMenuContent className={'DropdownMenuContent'}>
        {isAdvanced &&
          objectEntries(JOB_GROUP.ADVANCED).map(([key, { isExclusive }]) => {
            if (!isExclusive || isExclusive === unit) {
              return (
                <DropdownMenuItem
                  className={'DropdownMenuItem'}
                  textValue={key}
                >
                  {JOB_NAME[key]}
                </DropdownMenuItem>
              )
            }
          })}
        {objectEntries(JOB_GROUP.BASE).map(([key, { isExclusive }]) => {
          if (!isExclusive || isExclusive === unit) {
            return (
              <DropdownMenuItem className={'DropdownMenuItem'} textValue={key}>
                {JOB_NAME[key]}
              </DropdownMenuItem>
            )
          }
        })}
        {objectEntries(JOB_GROUP.SPECIAL).map(([key, { isExclusive }]) => {
          if (!isExclusive || isExclusive === unit) {
            return (
              <DropdownMenuItem className={'DropdownMenuItem'} textValue={key}>
                {JOB_NAME[key]}
              </DropdownMenuItem>
            )
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
