import { useState } from 'react'
import { Image } from './Image'
import { RankToggle } from './RankToggle'
import { SelectJob } from './SelectJob'
import { useRankedList } from './utils/useRankedList'

export const RankOverview = () => {
  const [selectedJob, setSelectedJob] = useState('default')
  const [statList, setStatList] = useState([])
  const { rankOrder } = useRankedList(selectedJob, statList)

  return (
    <div>
      <div className='option-col'>
        <SelectJob value={selectedJob} onValueChange={setSelectedJob} />
        <RankToggle statList={statList} setStatList={setStatList} />
      </div>
      {/* DISPLAY UNITS */}
      <div
        style={{ display: 'flex', flexDirection: 'row', padding: 20, gap: 20 }}
      >
        {rankOrder.length > 0 &&
          rankOrder.map((rank, index) => {
            if (index < 10) {
              return (
                <div>
                  <Image name={rank.ID} />
                  {statList.map((s) => (
                    <div>
                      {s}: {rank[s]}
                    </div>
                  ))}
                  <div>Stat Total: {rank.RST}</div>
                </div>
              )
            }
          })}
      </div>
    </div>
  )
}
