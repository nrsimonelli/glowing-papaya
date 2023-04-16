import { useEffect, useState } from 'react'
import './App.css'
import { Mode } from './Mode'
import { SelectUnit } from './SelectUnit'
import { SelectJob } from './SelectJob'
import { UnitName, CharacterDetail } from './utils/types'
import { RankToggle } from './RankToggle'
import { OverviewMode } from './OverviewMode'
import { STAT_KEY } from './constants'
import { Image } from './Image'

import { orderBy, sortBy } from 'lodash'
import { useRankedList } from './utils/useRankedList'
import { RankOverview } from './RankOverivew'

export const App = () => {
  const [mode, setMode] = useState<'Overview' | 'Favorites'>('Overview')
  const [characterList, setCharacterList] = useState<CharacterDetail[]>([])
  const [selectedUnit, setSelectedUnit] = useState('default')
  const [selectedJob, setSelectedJob] = useState('default')

  const [statList, setStatList] = useState([])

  const isOverview = mode === 'Overview'

  const handleAdd = () => {
    //placeholder
  }
  const handleClear = () => {
    //placeholder
  }

  type StatKey = typeof STAT_KEY[number]
  type StatList = { [key in StatKey]: number }

  interface UnitGrowthArr extends StatList {
    ID: UnitName
  }

  const { rankOrder } = useRankedList(selectedJob, statList)

  useEffect(() => {
    console.log('rankOrder -->', rankOrder)
  }, [rankOrder])

  return (
    <div>
      {/* Heading */}
      <h1>Fire Emblem Engage</h1>
      <h3>Choose what you would like to compare below</h3>
      {/* Toggle here */}
      {/* {JSON.stringify(selectedUnit)}
      {JSON.stringify(selectedJob)}
      {JSON.stringify(characterList)} */}
      <Mode mode={mode} setMode={setMode} />
      {/* Overall ranking actions... */}
      {/* end ranking options */}
      {/* Comparison actions */}
      <p className='prompt-text'>
        {isOverview
          ? 'Select up to three stats to rank units'
          : 'Select your option and click Add'}
      </p>
      {/* SECTION */}
      {!isOverview && (
        <div className='option-row'>
          <SelectUnit value={selectedUnit} onValueChange={setSelectedUnit} />
          <SelectJob
            value={selectedJob}
            onValueChange={setSelectedJob}
            selectedUnit={selectedUnit}
          />
          <button className='add button' onClick={handleAdd}>
            Add
          </button>
          <button className='button' onClick={handleClear}>
            Clear
          </button>
        </div>
      )}

      {isOverview && <RankOverview />}
    </div>
  )
}
