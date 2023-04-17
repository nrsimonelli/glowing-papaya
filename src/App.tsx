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
import { CrossCircledIcon } from '@radix-ui/react-icons'

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
        <>
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
          <div
            style={{
              // outline: '2px auto',
              display: 'flex',
              marginTop: 20,
              gap: 20,
            }}
          >
            <div className='card-root'>
              <div className='card-image'>
                <Image className='square' name={'IVY'} />
              </div>
              <div className='card-detail'>
                <div className='detail-row'>
                  <div className='detail-class'>WYVERN</div>
                  <div className='delete'>
                    <CrossCircledIcon className='cross-icon' />
                  </div>
                </div>
                {STAT_KEY.map((stat) => (
                  <div className='detail-row'>
                    <span className='row-name'>{stat}: </span>
                    <span className='row-value'>
                      {Math.floor(Math.random() * 100)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className='card-root'>
              <div className='card-image'>
                <Image className='square' name={'JADE'} />
              </div>
              <div className='card-detail'>
                <div className='detail-row'>
                  <div className='detail-class'>GREAT KNIGHT</div>
                  <div className='delete'>
                    <CrossCircledIcon className='cross-icon' />
                  </div>
                </div>
                {STAT_KEY.map((stat) => (
                  <div className='detail-row'>
                    <span className='row-name'>{stat}: </span>
                    <span className='row-value'>
                      {Math.floor(Math.random() * 100)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className='card-root'>
              <div className='card-image'>
                <Image className='square' name={'ZELKOV'} />
              </div>
              <div className='card-detail'>
                <div className='detail-row'>
                  <div className='detail-class'>THEIF</div>
                  <div className='delete'>
                    <CrossCircledIcon className='cross-icon' />
                  </div>
                </div>
                {STAT_KEY.map((stat) => (
                  <div className='detail-row'>
                    <span className='row-name'>{stat}: </span>
                    <span className='row-value'>
                      {Math.floor(Math.random() * 100)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {isOverview && <RankOverview />}
    </div>
  )
}
