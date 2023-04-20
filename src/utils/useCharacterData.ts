import {
  UNIT_GROWTH,
  JOB_GROWTH,
  UNIT_MOD,
  JOB_MAX,
  STAT_KEY,
} from '../constants'
import { JobName, UnitName, initialValues } from './types'

export const useCharacterData = (unit: UnitName, job: JobName) => {
  console.log('in useCharacterData')
  const unitGrowth = UNIT_GROWTH[unit]
  const jobGrowth = JOB_GROWTH[job]
  const unitMod = UNIT_MOD[unit]
  const jobMax = JOB_MAX[job]
  const isJean = unit === 'JEAN'

  const combinedGrowth = STAT_KEY.reduce((acc, stat) => {
    const value = unitGrowth[stat] + jobGrowth[stat] * (isJean ? 2 : 1)
    return {
      ...acc,
      [stat]: value,
    }
  }, initialValues)

  const personalCap = STAT_KEY.reduce((acc, stat) => {
    const value = jobMax[stat] + unitMod[stat]
    return {
      ...acc,
      [stat]: value,
    }
  }, initialValues)

  return {
    combinedGrowth,
    personalCap,
  }
}
