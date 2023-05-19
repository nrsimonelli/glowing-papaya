import { useState } from 'react'
import { JobName, StatKey, UnitName, objectKeys } from './utils/types'
import {
  JOB_GROUP,
  PERSONAL_BASE,
  STAT_KEY,
  UNIT_NAME,
  UNIT_ORIGIN,
} from './constants'
import { FilterPanel, FilterItem } from './FilterPanel'
import { ExpSlider } from './ExpSlider'
import { useLevelUp } from './utils/useLevelUp'
import { getDisplayName } from './utils/getDisplayName'
import { GraphDisplay } from './GraphDisplay'

const initialUnitData = objectKeys(UNIT_NAME).map((unit) => ({
  id: unit,
  isVisible: !Boolean(Math.round(Math.random() * 2)),
  base: PERSONAL_BASE[unit],
  data: [PERSONAL_BASE[unit]],
}))

type CountryName = keyof typeof UNIT_ORIGIN

export type UnitData = {
  LV: number
  EXP: number
  SP: number
  JOB: JobName
  STATS: {
    HP: number
    STR: number
    MAG: number
    DEX: number
    SPD: number
    DEF: number
    RES: number
    LCK: number
    BLD: number
  }
}

export type InitialUnitData = {
  id: UnitName
  isVisible: boolean
  base: UnitData
  data: UnitData[]
}

export type InitialStatData = { id: StatKey | 'BST'; isVisible: boolean }
const initialStatData = [
  ...STAT_KEY.map((stat) => ({
    id: stat,
    isVisible: Boolean(Math.round(Math.random())),
  })),
  { id: 'BST', isVisible: false },
]

/*/ 
  -------------
  |STR|DEF| HP|
  -------------
  |BLD|DEX|RES|
  -------------
  |SPD|LCK|MAG|
  -------------
/*/

export const StatName = {
  HP: {
    label: 'HP',
    color: '#1444ED',
  },
  STR: {
    label: 'Strength',
    color: '#6752FF',
  },
  MAG: {
    label: 'Magic',
    color: '#8B59FF',
  },
  DEX: {
    label: 'Dexterity',
    color: '#1B6BED',
  },
  SPD: {
    label: 'Speed',
    color: '#8881FF',
  },
  DEF: {
    label: 'Defense',
    color: '#B78DFF',
  },
  RES: {
    label: 'Resistance',
    color: '#209FED',
  },
  LCK: {
    label: 'Luck',
    color: '#A0BFFF',
  },
  BLD: {
    label: 'Build',
    color: '#D7D1FF',
  },
  BST: {
    label: 'Rating',
    color: '#DFCA62',
  },
}

export const TeamPlanner = ({
  mode,
}: {
  mode: 'Overview' | 'Favorites' | 'Planner'
}) => {
  const [unitData, setUnitData] = useState<InitialUnitData[]>(
    initialUnitData as InitialUnitData[]
  )
  const [statData, setStatData] = useState<InitialStatData[]>(
    initialStatData as InitialStatData[]
  )

  const toggleVisibility = (unitId: UnitName) => {
    const updatedUnitData = unitData.map((unit) => {
      if (unitId === unit.id) {
        return { ...unit, isVisible: !unit.isVisible }
      }
      return unit
    })
    setUnitData(updatedUnitData)
  }

  const toggleStatData = (statId: StatKey | 'BST') => {
    let updatedStatData = statData.map((stat) => {
      if (statId === stat.id) {
        return { ...stat, isVisible: !stat.isVisible }
      }
      return stat
    })

    const allStatsVisible = updatedStatData.every((stat) => stat.isVisible)
    const noStatsVisible = updatedStatData.every((stat) => !stat.isVisible)

    if (statId === 'BST' && (noStatsVisible || allStatsVisible)) {
      updatedStatData = updatedStatData.map((stat) => {
        if (stat.id !== statId) {
          return { ...stat, isVisible: noStatsVisible }
        }
        return stat
      })
    }

    if (statId !== 'BST' && (noStatsVisible || allStatsVisible)) {
      updatedStatData = updatedStatData.map((stat) => {
        if (stat.id === 'BST') {
          return { ...stat, isVisible: noStatsVisible }
        }
        return stat
      })
    }

    setStatData(updatedStatData)
  }

  const toggleByCountry = (
    country: CountryName,
    prevState: boolean | 'indeterminate'
  ) => {
    const updatedUnitData = unitData.map((unit) => {
      if (UNIT_ORIGIN[country].some((entry) => entry === unit.id)) {
        return { ...unit, isVisible: prevState !== true }
      }
      return unit
    })
    setUnitData(updatedUnitData)
  }

  const unitDataByCountry = (country: CountryName) => {
    const countryRoster = unitData.filter((unit) =>
      UNIT_ORIGIN[country].some((entry) => unit.id === entry)
    )
    return countryRoster
  }

  const filterSectionState = (country: CountryName) => {
    const atLeastOneTrue = unitDataByCountry(country).some(
      ({ isVisible }) => isVisible === true
    )
    const atLeastOneFalse = unitDataByCountry(country).some(
      ({ isVisible }) => isVisible === false
    )

    if (atLeastOneFalse && atLeastOneTrue) {
      return 'indeterminate'
    }
    if (atLeastOneFalse) {
      return false
    }
    return true
  }

  const addUnitData = (unitName: UnitName, jobName: JobName) => {
    const updatedData = unitData.map((unit) => {
      if (unit.id === unitName) {
        const index = unit.data.length - 1
        const updatedData = { ...unit.data[index], LV: 1, JOB: jobName }

        return { ...unit, data: [...unit.data, updatedData] }
      }
      return unit
    })
    setUnitData(updatedData)
  }

  const updateUnitData = (
    unitName: UnitName,
    jobName: JobName,
    lv: number,
    exp: number
  ) => {
    const updatedData = unitData.map((unit) => {
      if (unit.id === unitName) {
        const index = unit.data.length - 1
        const targetData = unit.data[index]
        const lvChange = lv - targetData.LV
        const spChange = exp - targetData.EXP + targetData.SP

        const updatedStats = useLevelUp(
          unitName,
          jobName,
          targetData.STATS,
          lvChange
        )
        const updatedData = {
          JOB: jobName,
          LV: lv,
          EXP: exp,
          SP: spChange,
          STATS: updatedStats,
        }
        return { ...unit, data: [...unit.data.slice(0, index), updatedData] }
      }
      return unit
    })
    setUnitData(updatedData)
  }

  const removeUnitData = (unitName: UnitName) => {
    const updatedData = unitData.map((unit) => {
      if (unit.id === unitName) {
        return { ...unit, data: unit.data.slice(0, -1) }
      }
      return unit
    })
    setUnitData(updatedData)
  }

  const [isOpen, setIsOpen] = useState(false)

  const resetUnitData = () => {
    const updatedUnitData = unitData.map((unit) => {
      if (!unit.isVisible) {
        return unit
      }
      return { ...unit, data: [unit.base] }
    })
    setUnitData(updatedUnitData)
  }

  const normalizeUnitData = () => {
    const leadExpValue = unitData.reduce((acc, entry) => {
      const index = entry.data.length - 1
      if (entry.isVisible && entry.data[index].EXP > acc) {
        return (acc = entry.data[index].EXP)
      }
      return acc
    }, 0)

    const updatedData = unitData.map((unit) => {
      const index = unit.data.length - 1
      const current = unit.data[index]

      if (!unit.isVisible || current.EXP === leadExpValue) {
        return unit
      }

      const lvCap = objectKeys(JOB_GROUP.SPECIAL).some(
        (job) => job === current.JOB
      )
        ? 40
        : 20
      const expCap = (lvCap - current.LV) * 100 + current.EXP

      if (expCap >= leadExpValue) {
        const lvChange = Math.floor((leadExpValue - current.EXP) / 100)
        const updatedStats = useLevelUp(
          unit.id,
          current.JOB,
          current.STATS,
          lvChange
        )
        const boostedData = {
          JOB: current.JOB,
          LV: current.LV + lvChange,
          EXP: leadExpValue,
          SP: leadExpValue - current.EXP + current.SP,
          STATS: updatedStats,
        }
        return { ...unit, data: [...unit.data.slice(0, index), boostedData] }
      }

      const numberOfPromotionsNeeded =
        Math.ceil((leadExpValue - expCap) / (lvCap * 100)) + 1
      const promotionData = []

      for (let i = 0; i < numberOfPromotionsNeeded; i++) {
        const runningData: UnitData = promotionData.length
          ? promotionData[promotionData.length - 1]
          : current
        if (!promotionData.length) {
          const updatedStats = useLevelUp(
            unit.id,
            runningData.JOB,
            runningData.STATS,
            lvCap - runningData.LV
          )
          promotionData.push({
            JOB: runningData.JOB,
            LV: lvCap,
            EXP: expCap,
            SP: expCap - runningData.EXP + runningData.SP,
            STATS: updatedStats,
          })
        } else {
          const expTarget =
            leadExpValue <= (lvCap - 1) * 100 + runningData.EXP
              ? leadExpValue
              : (lvCap - 1) * 100 + runningData.EXP
          const lvTarget = Math.floor((expTarget - runningData.EXP) / 100) + 1
          const nextStats = useLevelUp(
            unit.id,
            runningData.JOB,
            runningData.STATS,
            lvTarget - 1
          )

          promotionData.push({
            JOB: runningData.JOB,
            LV: lvTarget,
            EXP: expTarget,
            SP: expTarget - runningData.EXP + runningData.SP,
            STATS: nextStats,
          })
        }
      }
      return { ...unit, data: [...unit.data.slice(0, index), ...promotionData] }
    })
    setUnitData(updatedData)
  }

  const visibleUnits = unitData.filter((unit) => unit.isVisible)
  const showReset =
    visibleUnits.length > 0 &&
    visibleUnits.every(
      (entry) =>
        entry.data[entry.data.length - 1].EXP ===
        visibleUnits[0].data[visibleUnits[0].data.length - 1].EXP
    )

  return (
    <div>
      {mode === 'Planner' && (
        <>
          <button className={'FilterButton'} onClick={() => setIsOpen(!isOpen)}>
            Filters
          </button>
          {showReset ? (
            <button className={'FilterButton'} onClick={resetUnitData}>
              Reset
            </button>
          ) : (
            <button className={'FilterButton'} onClick={normalizeUnitData}>
              Normalize
            </button>
          )}
          <FilterPanel isOpen={isOpen}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: 1080,
              }}
            >
              {objectKeys(UNIT_ORIGIN).map((country) => (
                <div key={`${country}-col`} className='FilterColumn'>
                  <FilterItem
                    key={country}
                    title={country}
                    checked={filterSectionState(country)}
                    onCheckedChange={() =>
                      toggleByCountry(country, filterSectionState(country))
                    }
                  >
                    <span className='FilterTitle'>{country}</span>
                  </FilterItem>
                  {unitDataByCountry(country).map(({ id, isVisible }) => (
                    <FilterItem
                      key={id}
                      title={id}
                      onCheckedChange={() => toggleVisibility(id)}
                      checked={isVisible}
                    >
                      {getDisplayName(id)}
                    </FilterItem>
                  ))}
                </div>
              ))}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '13px',
                }}
              >
                {statData.map(({ id, isVisible }) => (
                  <FilterItem
                    key={id}
                    title={id}
                    onCheckedChange={() => toggleStatData(id)}
                    checked={isVisible}
                  >
                    {StatName[id].label}
                  </FilterItem>
                ))}
              </div>
            </div>
          </FilterPanel>
          <GraphDisplay unitData={unitData} statList={statData} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            {unitData.map(({ isVisible, id, data, base }) => {
              if (isVisible) {
                return (
                  <ExpSlider
                    key={id}
                    unit={id}
                    base={base}
                    unitData={data}
                    updateUnitData={updateUnitData}
                    removeUnitData={removeUnitData}
                    addUnitData={addUnitData}
                  />
                )
              }
            })}
          </div>
        </>
      )}
    </div>
  )
}
