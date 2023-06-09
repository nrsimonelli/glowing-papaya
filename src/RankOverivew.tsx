import { useRef, useState } from 'react'
import { Image } from './components/Image'
import { RankToggle } from './RankToggle'
import { SelectJob } from './SelectJob'
import { useRankedList } from './utils/useRankedList'
import { CharacterDetail, JobName, StatKey, UnitName } from './utils/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useCharacterData } from './utils/useCharacterData'
import { Toast } from './components/Toast'
import { ToastRef } from './components/Toast'
import { getDisplayName } from './utils/getDisplayName'

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
  const savedRef = useRef<ToastRef>(null)

  const getClassName = (id: string) => {
    return characterList.some((character) => character.ID === id)
      ? 'RankImage favorite'
      : 'RankImage'
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
      savedRef.current?.publish({
        type: 'remove',
        payload: `${getDisplayName(job)} ${getDisplayName(unit)}`,
      })
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
      savedRef.current?.publish({
        type: 'add',
        payload: `${getDisplayName(job)} ${getDisplayName(unit)}`,
      })
    }
  }

  return (
    <div>
      {mode === 'Overview' && (
        <>
          <div className='OptionCol'>
            <SelectJob value={selectedJob} onValueChange={setSelectedJob} />
            <RankToggle statList={statList} setStatList={setStatList} />
          </div>
          {/* DISPLAY UNITS */}
          <div className='RankDisplayContainer' ref={parent}>
            {rankOrder.length > 0 &&
              rankOrder.map((rank) => (
                <div key={rank.ID} className='RankOrderContainer'>
                  <div
                    className='AntiFlicker'
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
                      <div className='CharacterStatLine' key={s}>
                        <div className='CharacterStatLabel'>{s}:</div>
                        <div className='CharacterStatValue'>{rank[s]}</div>
                      </div>
                    ))}
                    {statList.length > 1 && (
                      <div className='CharacterStatLine'>
                        <div className='CharacterStatLabel'>Total:</div>
                        <div className='CharacterStatValue'>{rank.RST}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
      <Toast ref={savedRef}>Favorites!</Toast>
    </div>
  )
}
