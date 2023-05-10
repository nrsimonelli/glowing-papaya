import { JobName, StatKey, StatList, UnitName, objectEntries } from './types'
import { useCharacterData } from './useCharacterData'

export const useLevelUp = (
  unit: UnitName,
  job: JobName,
  stats: StatList,
  lvChange: number
) => {
  const { combinedGrowth: growthRate, personalCap } = useCharacterData(
    unit,
    job
  )
  const updatedStats = { ...stats }

  const getModifiedStat = (stat: StatKey, val: number) => {
    const modifier = (growthRate[stat] / 100) * lvChange
    return Number((val + modifier).toFixed(2)) > personalCap[stat]
      ? personalCap[stat]
      : Number((val + modifier).toFixed(2))
  }

  for (const [stat, value] of objectEntries(updatedStats)) {
    updatedStats[stat] = getModifiedStat(stat, value)
  }

  return updatedStats
}
