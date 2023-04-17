import * as CONST from '../constants'

export const initialValues = {
  HP: 0,
  STR: 0,
  MAG: 0,
  DEX: 0,
  SPD: 0,
  DEF: 0,
  RES: 0,
  LCK: 0,
  BLD: 0,
}
export type InitialValues = typeof initialValues

export type UnitName = keyof typeof CONST.UNIT_NAME
export type JobName = keyof typeof CONST.JOB_NAME
export type StatKey = typeof CONST.STAT_KEY[number]
export type StatList = { [key in StatKey]: number }
export type Character = {
  ID: `${UnitName}_${JobName}`
  UNIT: UnitName
  JOB: JobName
}
export type CharacterDetail = Character & StatList
export type MinMaxObj = {
  [K in StatKey]: { MIN: number; MAX: number }
}

type ValueOf<T> = T[keyof T]
type Entries<T> = [keyof T, ValueOf<T>][]

export const objectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as (keyof T)[]
}

export const objectValues = <T extends object>(obj: T) => {
  return Object.values(obj) as ValueOf<T>[]
}

export const objectEntries = <T extends object>(obj: T) => {
  return Object.entries(obj) as Entries<T>
}
