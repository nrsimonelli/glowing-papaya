import { useMemo, useState } from 'react'
import { SelectJob } from './SelectJob'
import { SelectUnit } from './SelectUnit'
import {
  CharacterDetail,
  JobName,
  UnitName,
  initialValues,
  MinMaxObj,
  objectEntries,
} from './utils/types'
import { CharacterCard } from './CharacterCard'
import {
  JOB_GROUP,
  JOB_GROWTH,
  JOB_MAX,
  STAT_KEY,
  UNIT_GROWTH,
  UNIT_MOD,
} from './constants'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useCharacterData } from './utils/useCharacterData'

export const FavoriteList = ({
  mode,
  characterList,
  setCharacterList,
}: {
  mode: 'Overview' | 'Favorites' | 'Planner'
  characterList: CharacterDetail[]
  setCharacterList: React.Dispatch<React.SetStateAction<CharacterDetail[]>>
}) => {
  // State
  const [selectedUnit, setSelectedUnit] = useState<UnitName | 'default'>(
    'default'
  )
  const [selectedJob, setSelectedJob] = useState<JobName | 'default'>('default')
  // Booleans
  const isClear = selectedJob === 'default' && selectedUnit === 'default'
  const isDuplicate = characterList.some(
    (character) => character.ID === `${selectedUnit}_${selectedJob}`
  )
  const isDefault = selectedUnit === 'default' || selectedJob === 'default'
  // Functions
  const setStat = (minMax: { MIN: number; MAX: number }, value: number) => {
    if (!minMax) {
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
    const result = {} as MinMaxObj

    for (const character of characterList) {
      for (const stat of STAT_KEY) {
        result[stat] = setStat(result[stat], character.GROWTH[stat])
      }
    }

    return result
  }, [characterList])

  const handleAdd = () => {
    if (selectedUnit !== 'default' && selectedJob !== 'default') {
      const { combinedGrowth, personalCap } = useCharacterData(
        selectedUnit,
        selectedJob
      )
      setCharacterList((previousCharacters) => [
        ...previousCharacters,
        {
          ID: `${selectedUnit}_${selectedJob}`,
          UNIT: selectedUnit,
          JOB: selectedJob,
          GROWTH: {
            ...combinedGrowth,
          },
          CAP: {
            ...personalCap,
          },
        },
      ])
      handleClear()
    }
  }

  const handleClear = () => {
    setSelectedUnit('default')
    setSelectedJob('default')
  }

  const handleRemove = (id: string) => {
    const updatedList = characterList.filter((character) => character.ID !== id)
    setCharacterList(updatedList)
  }

  const [parent] = useAutoAnimate()

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
          <div className='character-display-container' ref={parent}>
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
