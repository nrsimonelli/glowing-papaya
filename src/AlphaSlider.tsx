import { Image } from './components/Image'
import { useEffect, useState } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { JOB_GROUP, JOB_NAME, PERSONAL_BASE, STAT_KEY } from './constants'
import { useCharacterData } from './utils/useCharacterData'
import {
  InitialValues,
  JobName,
  StatKey,
  UnitName,
  objectEntries,
  objectKeys,
  objectValues,
} from './utils/types'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
// import { Dropdown } from './components/Dropdown'

export const AlphaSlider = ({
  unit,
}: {
  unit: UnitName
  unitHistory: {
    lv: number
    exp: number
    job: JobName
    stats: InitialValues
  }[]
}) => {
  const { LV, EXP, JOB, STATS } = PERSONAL_BASE[unit]
  const [baseExp, setBaseExp] = useState(EXP)
  const [baseLv, setBaseLv] = useState(LV)
  const [totalExp, setTotalExp] = useState<number>(EXP)
  const [currentLevel, setCurrentLevel] = useState<number>(baseLv)
  const [currentJob, setCurrentJob] = useState<JobName>(JOB)
  const [currentStats, setCurrentStats] = useState(STATS)
  const [step, setStep] = useState(1)
  const [unitHistory, setUnitHistory] = useState([
    {
      lv: LV,
      exp: EXP,
      job: JOB,
      stats: STATS,
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

  const getModifiedStat = (stat: StatKey, val: number, lv: number) => {
    const modifier = (growthRate[stat] / 100) * (lv - currentLevel)
    // ((Math.floor(totalExp / 100) * 100 - baseExp) / 100)
    return Number((val + modifier).toFixed(2))
  }
  const isLevelCapped = currentLevel === levelCap
  const expCap = (levelCap - baseLv) * 100 + baseExp
  const updatedLevel = Math.floor((totalExp - baseExp) / 100 + baseLv)

  const onValueChange = (val: number[]) => {
    if (!ready) {
      return
    }
    // if (step < unitHistory.length && val[1] > expCap) {
    //   stepForward(step + 1)
    //   return
    // }
    if (step > 1 && val[1] < baseExp) {
      stepBackward(step - 1)
      return
    }

    // normal
    if (val[1] > expCap) {
      setTotalExp(expCap)
    } else if (val[1] !== totalExp) {
      setTotalExp(val[1])
    }
    const updatedLevel = Math.floor((totalExp - baseExp) / 100 + baseLv)
    if (currentLevel !== updatedLevel) {
      console.log('sending to lvChange')
      handleLvChange(updatedLevel)
    }
  }

  const masterSealOptions = (unit) => {}

  const handleLvChange = (lv: number) => {
    console.log('in LVCHANGE', lv)
    const updatedStats = { ...currentStats }
    for (const [stat, value] of objectEntries(updatedStats)) {
      updatedStats[stat] = getModifiedStat(stat, value, lv)
    }
    setCurrentLevel(lv)
    setCurrentStats(updatedStats)
  }

  const stepBackward = (prevStep: number) => {
    const stepData = unitHistory[prevStep - 1]
    const prevLv = Math.floor((baseExp - 1 - stepData.exp) / 100 + stepData.lv)
    setStep(prevStep)
    setTotalExp(baseExp - 1)
    setBaseExp(stepData.exp)
    setCurrentLevel(prevLv)
    setCurrentJob(stepData.job)
    setBaseLv(stepData.lv)
    const prevStats = { ...stepData.stats }
    const { combinedGrowth: prevGrowthRate } = useCharacterData(
      unit,
      stepData.job
    )
    for (const [stat, val] of objectEntries(prevStats)) {
      const modifier = (prevGrowthRate[stat] / 100) * (prevLv - stepData.lv)
      prevStats[stat] = Number((val + modifier).toFixed(2))
    }
    setCurrentStats(prevStats)
    setUnitHistory(unitHistory.slice(0, -1))
  }

  const handleJobChange = (job: JobName) => {
    const roundedTotalExp = Math.floor(totalExp / 100) * 100
    setTotalExp(roundedTotalExp)
    setBaseExp(roundedTotalExp)
    if (job === currentJob && currentLevel === 1) {
      return
    }
    const currentValues = {
      exp: roundedTotalExp,
      lv: 1,
      job: job,
      stats: currentStats,
    }
    setCurrentLevel(1)
    setCurrentJob(job)
    setBaseExp(roundedTotalExp)
    setBaseLv(1)
    setUnitHistory([...unitHistory, currentValues])
    setStep(step + 1)
  }

  return (
    <div style={{ marginTop: 16 }}>
      <div>{unit}</div>
      <div>{unitHistory.length}</div>
      <div>EXP CAP: {expCap}</div>
      <div>STEP: {step}</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          justifyContent: 'center',
        }}
      >
        {unitHistory.map((history, index) => (
          <div key={index}>
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
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button>Second Seal</button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className='DropdownMenuContent'
              sideOffset={5}
            >
              {isAdvanced &&
                objectEntries(JOB_GROUP.ADVANCED).map(
                  ([key, { isExclusive }]) => {
                    if (!isExclusive || isExclusive === unit) {
                      return (
                        <DropdownMenu.Item
                          key={key}
                          className='DropdownMenuItem'
                          textValue={key}
                          onSelect={() => handleJobChange(key)}
                        >
                          {JOB_NAME[key]}
                        </DropdownMenu.Item>
                      )
                    }
                  }
                )}
              {objectEntries(JOB_GROUP.BASE).map(([key, { isExclusive }]) => {
                if (!isExclusive || isExclusive === unit) {
                  return (
                    <DropdownMenu.Item
                      key={key}
                      className='DropdownMenuItem'
                      textValue={key}
                      onSelect={() => handleJobChange(key)}
                    >
                      {JOB_NAME[key]}
                    </DropdownMenu.Item>
                  )
                }
              })}
              {objectEntries(JOB_GROUP.SPECIAL).map(
                ([key, { isExclusive }]) => {
                  if (!isExclusive || isExclusive === unit) {
                    return (
                      <DropdownMenu.Item
                        key={key}
                        className='DropdownMenuItem'
                        textValue={key}
                        onSelect={() => handleJobChange(key)}
                      >
                        {JOB_NAME[key]}
                      </DropdownMenu.Item>
                    )
                  }
                }
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <Dropdown options={masterSealOptions}>
          <button>Master Seal</button>
        </Dropdown>
      </div>

      <div>level: {currentLevel}</div>
      <div>{totalExp}</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 13,
        }}
      >
        {objectEntries(currentStats).map(([stat, value]) => (
          <div key={stat}>
            {stat}: {value}
          </div>
        ))}
      </div>

      <SliderPrimitive.Slider
        min={0}
        max={8000}
        value={[EXP, totalExp]}
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
