import { useCallback, useEffect, useState } from 'react'
import { JOB_GROWTH, STAT_KEY, UNIT_GROWTH } from '../constants'
import { JobName, objectKeys } from './types'
import { orderBy } from 'lodash'

export const useRankedList = (selectedJob: string, statPriority: string[]) => {
  const [rankOrder, setRankOrder] = useState<Record<string, number | string>[]>(
    []
  )
  const growthList = useCallback(() => {
    console.log(selectedJob)
    if (!selectedJob || selectedJob === 'default') {
      return []
    }
    const unitArray = []
    const jobGrowth = JOB_GROWTH[selectedJob as JobName]
    const unitList = objectKeys(UNIT_GROWTH)

    for (const unit of unitList) {
      const isJean = unit === 'JEAN'
      const unitGrowthTotal = STAT_KEY.reduce(
        (acc, stat) => {
          const value =
            UNIT_GROWTH[unit][stat] + jobGrowth[stat] * (isJean ? 2 : 1)
          return {
            ...acc,
            [stat]: value,
            BST: acc.BST + value,
          }
        },
        { ID: unit, BST: 0 }
      )
      unitArray.push(unitGrowthTotal)
    }
    return unitArray
  }, [selectedJob])

  useEffect(() => {
    console.log('statPriority', statPriority)
    const priority = [...statPriority, 'BST']
    const desc = Array(priority.length).fill('desc')
    console.log(priority)
    console.log(desc)
    const list = growthList()
    setRankOrder(orderBy(list, priority, desc))
  }, [statPriority, selectedJob])

  return {
    rankOrder,
  }
}
