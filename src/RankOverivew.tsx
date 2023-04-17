import { useState } from 'react'
import { Image } from './Image'
import { RankToggle } from './RankToggle'
import { SelectJob } from './SelectJob'
import { useRankedList } from './utils/useRankedList'
import { JobName, StatKey } from './utils/types'

export const RankOverview = ({ mode }: { mode: 'Overview' | 'Favorites' }) => {
  const [selectedJob, setSelectedJob] = useState<JobName | 'default'>('default')
  const [statList, setStatList] = useState<StatKey[]>([])
  const { rankOrder } = useRankedList(selectedJob, statList)
  console.log(mode)
  return (
    <div>
      {mode === 'Overview' && (
        <>
          <div className='option-col'>
            <SelectJob value={selectedJob} onValueChange={setSelectedJob} />
            <RankToggle statList={statList} setStatList={setStatList} />
          </div>
          {/* DISPLAY UNITS */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 20,
              gap: 20,
            }}
          >
            {rankOrder.length > 0 &&
              rankOrder.map((rank, index) => {
                if (index < 10) {
                  return (
                    <div key={`rank-${index}`}>
                      <Image name={rank.ID} />
                      {statList.map((s) => (
                        <div key={s}>
                          {s}: {rank[s]}
                        </div>
                      ))}
                      {statList.length > 1 && <div>Stat Total: {rank.RST}</div>}
                    </div>
                  )
                }
              })}
          </div>
        </>
      )}
    </div>
  )
}
