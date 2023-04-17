import { useCallback, useEffect, useState } from 'react'
import { JOB_GROWTH, STAT_KEY, UNIT_GROWTH } from '../constants'
import { JobName, UnitName, initialValues, objectKeys } from './types'
import { orderBy } from 'lodash'

type Stat = typeof STAT_KEY[number]

export const useCombinedGrowth = (unit: UnitName, job: JobName) => {
  const unitGrowth = UNIT_GROWTH[unit]
  const jobGrowth = JOB_GROWTH[job]
  const isJean = unit === 'JEAN'

  console.log('calc ==>', unit, job)

  const combinedGrowth = STAT_KEY.reduce(
    (acc, stat) => {
      const value = unitGrowth[stat] + jobGrowth[stat] * (isJean ? 2 : 1)
      return {
        ...acc,
        [stat]: value,
      }
    },

    initialValues
  )

  return {
    combinedGrowth,
  }
}
