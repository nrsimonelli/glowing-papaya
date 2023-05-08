import { useCallback, useState } from 'react'
import { UnitName, objectKeys } from './utils/types'
import { PERSONAL_BASE, UNIT_NAME, UNIT_ORIGIN } from './constants'
import { FilterPanel, FilterItem } from './FilterPanel'

const initialData = objectKeys(UNIT_NAME).map((unit) => ({
  id: unit,
  isVisible: true,
  data: [PERSONAL_BASE[unit]],
}))

type InitialData = typeof initialData

const GraphDisplay = () => {
  return <div>Graph</div>
}

export const TeamPlanner = ({
  mode,
}: {
  mode: 'Overview' | 'Favorites' | 'Planner'
}) => {
  const [unitData, setUnitData] = useState<InitialData>(initialData)

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

  return (
    <div>
      {mode === 'Planner' && (
        <>
          <FilterPanel>
            {objectKeys(UNIT_ORIGIN).map((country) => (
              <div
                style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}
              >
                <FilterItem
                  key={country}
                  title={country}
                  checked={filterSectionState(country)}
                  onCheckedChange={() =>
                    toggleByCountry(country, filterSectionState(country))
                  }
                >
                  {country}
                </FilterItem>
                {unitDataByCountry(country).map(({ id, isVisible }) => (
                  <FilterItem
                    key={id}
                    title={id}
                    onCheckedChange={() => toggleVisibility(id)}
                    checked={isVisible}
                  >
                    {UNIT_NAME[id]}
                  </FilterItem>
                ))}
              </div>
            ))}
          </FilterPanel>
          <GraphDisplay />
          <div>
            {/* {unitData.map(({ isVisible, id, data }) => {
              if (isVisible) {
                return <ExpSlider unit={id} unitData={data} />
              }
            })} */}
          </div>
        </>
      )}
    </div>
  )
}
