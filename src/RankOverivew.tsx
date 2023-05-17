import { useState } from 'react'
import { Image } from './components/Image'
import { RankToggle } from './RankToggle'
import { SelectJob } from './SelectJob'
import { useRankedList } from './utils/useRankedList'
import { CharacterDetail, JobName, StatKey, UnitName } from './utils/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useCharacterData } from './utils/useCharacterData'

export const RankOverview = ({
  mode,
  characterList,
  setCharacterList,
}: {
  mode: 'Overview' | 'Favorites' | 'Planner'
  characterList: CharacterDetail[]
  setCharacterList: React.Dispatch<React.SetStateAction<CharacterDetail[]>>
}) => {
  const [selectedJob, setSelectedJob] = useState<JobName | 'default'>('default')
  const [statList, setStatList] = useState<StatKey[]>([])
  const { rankOrder } = useRankedList(selectedJob, statList)
  const [parent] = useAutoAnimate()

  const getClassName = (id: string) => {
    return characterList.some((character) => character.ID === id)
      ? 'rank-image favorite'
      : 'rank-image'
  }

  const updateFavorite = (unit: UnitName, job: JobName | 'default') => {
    if (!unit || !job || job === 'default') {
      return
    }
    const id: `${UnitName}_${JobName}` = `${unit}_${job}`
    const isFavorite = characterList.some((character) => character.ID === id)
    if (isFavorite) {
      const updatedList = characterList.filter(
        (character) => character.ID !== id
      )
      setCharacterList(updatedList)
    }
    if (!isFavorite) {
      const { combinedGrowth, personalCap } = useCharacterData(unit, job)
      setCharacterList((previousCharacters) => [
        ...previousCharacters,
        {
          ID: id,
          UNIT: unit,
          JOB: job,
          GROWTH: {
            ...combinedGrowth,
          },
          CAP: {
            ...personalCap,
          },
        },
      ])
    }
  }

  return (
    <div>
      {mode === 'Overview' && (
        <>
          <div className='option-col'>
            <SelectJob value={selectedJob} onValueChange={setSelectedJob} />
            <RankToggle statList={statList} setStatList={setStatList} />
          </div>
          {/* DISPLAY UNITS */}
          <div className='rank-display-container' ref={parent}>
            {rankOrder.length > 0 &&
              rankOrder.map((rank) => (
                <div key={rank.ID} className='rank-order-container'>
                  <div
                    className='anti-flicker'
                    onClick={() => updateFavorite(rank.ID, selectedJob)}
                  >
                    <Image
                      className={getClassName(`${rank.ID}_${selectedJob}`)}
                      name={rank.ID}
                    />
                  </div>
                  <div
                    style={{
                      height: 'auto',
                      lineHeight: 1.5,
                    }}
                  >
                    {statList.map((s) => (
                      <div className='character-stat-line' key={s}>
                        <div className='character-stat-label'>{s}:</div>
                        <div className='character-stat-value'>{rank[s]}</div>
                      </div>
                    ))}
                    {statList.length > 1 && (
                      <div className='character-stat-line'>
                        <div className='character-stat-label'>Total:</div>
                        <div className='character-stat-value'>{rank.RST}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}
