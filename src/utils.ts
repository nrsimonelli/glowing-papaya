import * as CONST from './constants'

export type UnitName = keyof typeof CONST.UNIT_NAME
export type JobName = keyof typeof CONST.JOB_NAME
export type CharacterDetail = { unitName: UnitName; jobName: JobName }

type ValueOf<T> = T[keyof T]
type Entries<T> = [keyof T, ValueOf<T>][]

export const objectEntries = <T extends object>(obj: T) => {
  return Object.entries(obj) as Entries<T>
}
