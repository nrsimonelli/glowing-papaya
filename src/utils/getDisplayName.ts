import { JOB_NAME, UNIT_NAME } from '../constants'
import { JobName, UnitName } from './types'

export const getDisplayName = <T extends JobName | UnitName>(
  key: T
): string => {
  if (key in JOB_NAME) {
    return JOB_NAME[key as JobName]
  }

  if (key in UNIT_NAME) {
    return UNIT_NAME[key as UnitName]
  }

  throw new Error(`'${key}' is not a valid Character or Job name.`)
}
