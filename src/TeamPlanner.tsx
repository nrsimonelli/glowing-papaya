import { useCallback, useState } from 'react'
import {
  JobName,
  StatKey,
  UnitName,
  objectEntries,
  objectKeys,
} from './utils/types'
import { PERSONAL_BASE, UNIT_NAME, UNIT_ORIGIN } from './constants'
import { FilterPanel, FilterItem } from './FilterPanel'
import { ExpSlider } from './ExpSlider'
import { useLevelUp } from './utils/useLevelUp'
import { getDisplayName } from './utils/getDisplayName'

const uiTest = ['CLANNE', 'FOGADO', 'AMBER']

const initialData = objectKeys(UNIT_NAME).map((unit) => ({
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

type InitialData = {
  id: UnitName
  isVisible: boolean
  base: UnitData
  data: UnitData[]
}

const GraphDisplay = () => {
  return <div>Graph</div>
}

export const TeamPlanner = ({
  mode,
}: {
  mode: 'Overview' | 'Favorites' | 'Planner'
}) => {
  const [unitData, setUnitData] = useState<InitialData[]>(
    initialData as InitialData[]
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
          <FilterPanel isOpen={isOpen}>
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
          </FilterPanel>
          <GraphDisplay />
          <div>
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
