import { useCallback, useEffect, useState } from 'react'
import { JOB_GROWTH, STAT_KEY, UNIT_GROWTH } from '../constants'
import { JobName, objectKeys } from './types'
import { orderBy } from 'lodash'

type Stat = typeof STAT_KEY[number]

export const useRankedList = (selectedJob: string, statPriority: Stat[]) => {
  const [rankOrder, setRankOrder] = useState<Record<string, number | string>[]>(
    []
  )
  const growthList = useCallback(() => {
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
        {
          ID: unit,
          HP: 0,
          STR: 0,
          MAG: 0,
          DEX: 0,
          SPD: 0,
          DEF: 0,
          RES: 0,
          LCK: 0,
          BLD: 0,
          BST: 0,
        }
      )
      unitArray.push(unitGrowthTotal)
    }
    return unitArray
  }, [selectedJob])

  useEffect(() => {
    const priority = ['RST', ...statPriority, 'BST']
    const desc = Array(priority.length).fill('desc')
    const list = growthList()
    const updatedList = list.map((item) => {
      const value = statPriority.reduce((acc, stat) => {
        return acc + item[stat]
      }, 0)

      return {
        ...item,
        RST: value,
      }
    })

    setRankOrder(orderBy(updatedList, priority, desc))
  }, [statPriority, selectedJob])

  return {
    rankOrder,
  }
}
