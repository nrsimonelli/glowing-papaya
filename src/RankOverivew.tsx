import { useState } from 'react'
import { Image } from './components/Image'
import { RankToggle } from './RankToggle'
import { SelectJob } from './SelectJob'
import { useRankedList } from './utils/useRankedList'
import { JobName, StatKey } from './utils/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export const RankOverview = ({ mode }: { mode: 'Overview' | 'Favorites' }) => {
  const [selectedJob, setSelectedJob] = useState<JobName | 'default'>('default')
  const [statList, setStatList] = useState<StatKey[]>([])
  const { rankOrder } = useRankedList(selectedJob, statList)
  const [parent] = useAutoAnimate()

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
                <div key={rank.ID}>
                  <Image className='rank-image gradient' name={rank.ID} />
                  {statList.map((s) => (
                    <div key={s}>
                      {s}: {rank[s]}
                    </div>
                  ))}
                  {statList.length > 1 && <div>Total: {rank.RST}</div>}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}
