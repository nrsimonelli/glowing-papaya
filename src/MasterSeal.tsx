import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'
import { UnitName, objectEntries } from './utils/types'
import { JOB_GROUP, JOB_NAME } from './constants'

export const MasterSeal = ({
  unit,
  disabled,
}: {
  unit: UnitName
  disabled: boolean
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled}>Master Seal</DropdownMenuTrigger>
      <DropdownMenuContent className={'DropdownMenuContent'}>
        {objectEntries(JOB_GROUP.ADVANCED).map(([key, { isExclusive }]) => {
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
