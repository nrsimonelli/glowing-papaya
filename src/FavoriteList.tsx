import { useMemo, useState } from 'react'
import { SelectJob } from './SelectJob'
import { SelectUnit } from './SelectUnit'
import {
  CharacterDetail,
  JobName,
  UnitName,
  initialValues,
  objectEntries,
  StatKey,
  MinMaxObj,
} from './utils/types'
import { useRankedList } from './utils/useRankedList'
import { CharacterCard } from './CharacterCard'
import { JOB_GROWTH, STAT_KEY, UNIT_GROWTH } from './constants'

export const FavoriteList = ({ mode }: { mode: 'Overview' | 'Favorites' }) => {
  const [characterList, setCharacterList] = useState<CharacterDetail[]>([])
  const [selectedUnit, setSelectedUnit] = useState<UnitName | 'default'>(
    'default'
  )
  const [selectedJob, setSelectedJob] = useState<JobName | 'default'>('default')

  const isClear = selectedJob === 'default' && selectedUnit === 'default'
  const isDuplicate = characterList.some(
    (character) => character.ID === `${selectedUnit}_${selectedJob}`
  )
  const isDefault = selectedUnit === 'default' || selectedJob === 'default'

  const findCombinedGrowth = (unit: UnitName, job: JobName) => {
    const unitGrowth = UNIT_GROWTH[unit]
    const jobGrowth = JOB_GROWTH[job]
    const isJean = unit === 'JEAN'

    console.log('calc ==>', unit, job)

    return STAT_KEY.reduce((acc, stat) => {
      const value = unitGrowth[stat] + jobGrowth[stat] * (isJean ? 2 : 1)
      return {
        ...acc,
        [stat]: value,
      }
    }, initialValues)
  }

  const setStat = (minMax: { MIN: number; MAX: number }, value: number) => {
    if (!minMax) {
      console.log('in undefined block')
      return {
        MIN: value,
        MAX: value,
      }
    } else {
      return {
        MIN: value < minMax.MIN ? value : minMax.MIN,
        MAX: value > minMax.MAX ? value : minMax.MAX,
      }
    }
  }

  const minMaxByStat = useMemo(() => {
    console.log('running memo')
    const result = {} as MinMaxObj

    for (const character of characterList) {
      for (const stat of STAT_KEY) {
        result[stat] = setStat(result[stat], character[stat])
      }
    }

    return result
  }, [characterList])

  const handleAdd = () => {
    if (selectedUnit !== 'default' && selectedJob !== 'default') {
      const combinedGrowth = findCombinedGrowth(selectedUnit, selectedJob)
      setCharacterList((previousCharacters) => [
        ...previousCharacters,
        {
          ID: `${selectedUnit}_${selectedJob}`,
          UNIT: selectedUnit,
          JOB: selectedJob,
          ...combinedGrowth,
        },
      ])
      handleClear()
    }
    //placeholder
  }
  const handleClear = () => {
    setSelectedUnit('default')
    setSelectedJob('default')
  }

  const handleRemove = (id: string) => {
    const updatedList = characterList.filter((character) => character.ID !== id)
    setCharacterList(updatedList)
  }

  return (
    <div>
      {mode === 'Favorites' && (
        <>
          <div className='option-row'>
            <SelectUnit value={selectedUnit} onValueChange={setSelectedUnit} />
            <SelectJob
              value={selectedJob}
              onValueChange={setSelectedJob}
              selectedUnit={selectedUnit}
            />
            <button
              className='add button'
              onClick={handleAdd}
              disabled={isDefault || isDuplicate}
            >
              Add
            </button>
            <button className='button' onClick={handleClear} disabled={isClear}>
              Clear
            </button>
          </div>
          <div className='character-display-container'>
            {characterList.map((character) => (
              <CharacterCard
                key={character.ID}
                character={character}
                handleDelete={handleRemove}
                minMax={minMaxByStat}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
