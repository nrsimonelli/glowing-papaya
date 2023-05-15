import { useState } from 'react'
import { JobName, StatKey, UnitName, objectKeys } from './utils/types'
import { PERSONAL_BASE, STAT_KEY, UNIT_NAME, UNIT_ORIGIN } from './constants'
import { FilterPanel, FilterItem } from './FilterPanel'
import { ExpSlider } from './ExpSlider'
import { useLevelUp } from './utils/useLevelUp'
import { getDisplayName } from './utils/getDisplayName'
import { GraphDisplay } from './GraphDisplay'

const uiTest = ['CLANNE', 'FOGADO', 'AMBER']

const initialUnitData = objectKeys(UNIT_NAME).map((unit) => ({
  id: unit,
  isVisible: uiTest.some((x) => x === unit),
  base: PERSONAL_BASE[unit],
  data: [PERSONAL_BASE[unit]],
}))

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

export type InitialStatData = { id: StatKey; isVisible: boolean }
const initialStatData = [
  ...STAT_KEY.map((stat) => ({ id: stat, isVisible: true })),
]

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

  const toggleStatData = (statId: StatKey) => {
    const updatedStatData = statData.map((stat) => {
      if (statId === stat.id) {
        return { ...stat, isVisible: !stat.isVisible }
      }
      return stat
    })
    setStatData(updatedStatData)
  }

  const toggleByCountry = (
    country: keyof typeof UNIT_ORIGIN,
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

  const unitDataByCountry = (country: keyof typeof UNIT_ORIGIN) => {
    const countryRoster = unitData.filter((unit) =>
      UNIT_ORIGIN[country].some((entry) => unit.id === entry)
    )
    return countryRoster
  }

  const filterSectionState = (country: keyof typeof UNIT_ORIGIN) => {
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

  const StatName = {
    HP: 'HP',
    STR: 'Strength',
    MAG: 'Magic',
    DEX: 'Dexterity',
    SPD: 'Speed',
    DEF: 'Defense',
    RES: 'Resistance',
    LCK: 'Luck',
    BLD: 'Build',
    BST: 'Rating',
  }

  return (
    <div>
      {mode === 'Planner' && (
        <>
          <button
            className={'filter-button'}
            onClick={() => setIsOpen(!isOpen)}
          >
            Filters
          </button>
          <button className={'filter-button'} onClick={() => {}}>
            Normalize
          </button>
          <FilterPanel isOpen={isOpen}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                // border: '1px solid yellow',
              }}
            >
              {objectKeys(UNIT_ORIGIN).map((country) => (
                <div key={`${country}-col`} className='filter-column'>
                  <FilterItem
                    key={country}
                    title={country}
                    checked={filterSectionState(country)}
                    onCheckedChange={() =>
                      toggleByCountry(country, filterSectionState(country))
                    }
                  >
                    <span className='filter-title'>{country}</span>
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
                  // border: '1px solid blue',
                }}
              >
                {statData.map(({ id, isVisible }) => (
                  <FilterItem
                    key={id}
                    title={id}
                    onCheckedChange={() => toggleStatData(id)}
                    checked={isVisible}
                  >
                    {StatName[id]}
                  </FilterItem>
                ))}
              </div>
            </div>
          </FilterPanel>
          <GraphDisplay unitData={unitData} statList={statData} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
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
