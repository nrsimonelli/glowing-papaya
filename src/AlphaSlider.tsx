import { Image } from './components/Image'
import { useEffect, useState } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { JOB_GROUP, JOB_NAME, PERSONAL_BASE, STAT_KEY } from './constants'
import { useCharacterData } from './utils/useCharacterData'
import { StatKey, UnitName, objectEntries, objectKeys } from './utils/types'

export const AlphaSlider = ({ unit }: { unit: UnitName }) => {
  const {
    LV: baseLv,
    EXP: baseExp,
    JOB: baseJob,
    STATS: baseStats,
  } = PERSONAL_BASE[unit]
  const [totalExp, setTotalExp] = useState<number>(baseExp)
  const [currentJob, setCurrentJob] = useState(baseJob)
  const [currentStats, setCurrentStats] = useState(baseStats)
  const [currentLevel, setCurrentLevel] = useState<number>(baseLv)

  const [unitHistory, setUnitHistory] = useState([
    {
      lv: baseLv,
      exp: baseExp,
      job: baseJob,
      stats: baseStats,
    },
  ])

  const { combinedGrowth: growthRate, personalCap: statCap } = useCharacterData(
    unit,
    currentJob
  )

  const isSpecial = objectKeys(JOB_GROUP.SPECIAL).some(
    (job) => job === currentJob
  )
  const isBase = objectKeys(JOB_GROUP.BASE).some((job) => job === currentJob)
  const isAdvanced = objectKeys(JOB_GROUP.ADVANCED).some(
    (job) => job === currentJob
  )
  const levelCap = isSpecial ? 40 : 20
  const isLevelCapped = currentLevel === levelCap
  const canPromote = (level: number) => {
    if (isAdvanced) {
      return true
    }
    if (isSpecial) {
      return level >= 20
    }
    if (isBase) {
      return level >= 10
    }
    return false
  }

  const getModifiedStat = (stat, val) => {
    const modifier =
      (growthRate[stat as StatKey] / 100) * ((totalExp - baseExp) / 100)
    return Number(val + modifier).toFixed(1)
  }

  const onValueChange = (val: number[]) => {
    if (isLevelCapped && val[1] > totalExp) {
      return
    }
    if (val[1] !== totalExp) {
      setTotalExp(val[1])
    }
  }

  const onValueCommit = () => {}

  // onLevelChange
  useEffect(() => {
    const updatedLevel = Math.floor((totalExp - baseExp) / 100 + baseLv)
    const expCap = (levelCap - baseLv) * 100 + baseExp

    if (updatedLevel > levelCap) {
      console.log('nice try')
      setCurrentLevel(levelCap)
      setTotalExp(expCap)
    }
    if (currentLevel !== updatedLevel) {
      setCurrentLevel(updatedLevel)
    }
  }, [totalExp])

  return (
    <div>
      <div>{unit}</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          justifyContent: 'center',
        }}
      >
        {unitHistory.map((history) => (
          <div>
            {JOB_NAME[history.job]}
            {' -->'}
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          justifyContent: 'center',
        }}
      >
        <button>Second Seal</button>
        <button>Master Seal</button>
      </div>

      <div>level: {currentLevel}</div>
      <div>{totalExp}</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 16,
          fontSize: 13,
        }}
      >
        {objectEntries(currentStats).map(([stat, value]) => (
          <div>
            {stat}: {getModifiedStat(stat, value)}
          </div>
        ))}
      </div>

      <SliderPrimitive.Slider
        min={0}
        max={8000}
        value={[baseExp, totalExp]}
        onValueChange={onValueChange}
        className={'slider-root'}
      >
        <SliderPrimitive.Track className={'slider-track'}>
          <SliderPrimitive.Range className={'slider-range'} />
        </SliderPrimitive.Track>
        <SliderPrimitive.SliderThumb
          className={'slider-thumb base'}
        ></SliderPrimitive.SliderThumb>
        <SliderPrimitive.SliderThumb className={'slider-thumb invest'}>
          <Image className='slider-image' name={unit} />
        </SliderPrimitive.SliderThumb>
      </SliderPrimitive.Slider>
    </div>
  )
}
