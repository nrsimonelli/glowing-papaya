import { Slider } from './components/Slider'
import { Image } from './components/Image'
import { MasterSeal } from './MasterSeal'
import { SecondSeal } from './SecondSeal'
import {
  JobName,
  StatKey,
  UnitName,
  initialValues,
  objectEntries,
  objectKeys,
} from './utils/types'
import { useEffect, useState } from 'react'
import { useCharacterData } from './utils/useCharacterData'
import { UnitData } from './TeamPlanner'
import { JOB_GROUP } from './constants'
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons'

interface ExpSliderProps {
  unit: UnitName
  unitData: UnitData[]
  updateUnitData: (
    unitName: UnitName,
    jobName: JobName,
    lv: number,
    exp: number
  ) => void
  removeUnitData: (unitName: UnitName) => void
  addUnitData: (unitName: UnitName, jobName: JobName) => void
}

export const ExpSlider = ({
  unit,
  unitData,
  updateUnitData,
  removeUnitData,
  addUnitData,
}: ExpSliderProps) => {
  const { EXP, JOB, LV, STATS } = unitData[unitData.length - 1]
  const [baseExp, setBaseExp] = useState(EXP)
  const [baseLv, setBaseLv] = useState(LV)
  const [currentExp, setCurrentExp] = useState(EXP)
  const [currentJob, setCurrentJob] = useState<JobName>(JOB)
  const [currentLevel, setCurrentLevel] = useState(LV)
  const { combinedGrowth: growthRate, personalCap: statCap } = useCharacterData(
    unit,
    currentJob
  )

  const isSpecial = objectKeys(JOB_GROUP.SPECIAL).some(
    (job) => job === currentJob
  )
  const isAdvanced = objectKeys(JOB_GROUP.ADVANCED).some(
    (job) => job === currentJob
  )
  const isBase = objectKeys(JOB_GROUP.BASE).some((job) => job === currentJob)
  const levelCap = isSpecial ? 40 : 20
  const expCap = (levelCap - baseLv) * 100 + baseExp
  const canRemoveData = unitData.length > 1

  const updateExp = (value: number) => {
    const updatedExp =
      value > expCap ? expCap : value < baseExp ? baseExp : value
    const updatedLevel = Math.floor((updatedExp - baseExp) / 100 + baseLv)

    if (currentLevel !== updatedLevel) {
      setCurrentExp(updatedExp)
      setCurrentLevel(updatedLevel)
      updateUnitData(unit, currentJob, updatedLevel, updatedExp)
    } else {
      setCurrentExp(updatedExp)
    }
  }

  const handleJobChange = (selectedJob: JobName) => {
    setCurrentLevel(1)
    setBaseLv(1)
    setBaseExp(Math.floor(currentExp / 100) * 100)
    setCurrentJob(selectedJob)
    addUnitData(unit, selectedJob)
  }

  useEffect(() => {
    console.log('BASEEXP', baseExp)
    console.log('BASELV', baseLv)
  }, [baseExp, baseLv])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
      <div style={{ display: 'flex' }}>
        <SecondSeal
          unit={unit}
          isAdvanced={isAdvanced}
          handleJobChange={handleJobChange}
          disabled={false}
        />
        <MasterSeal
          unit={unit}
          handleJobChange={handleJobChange}
          disabled={isBase ? currentLevel < 10 : true}
        />
      </div>
      <div>
        EXP: {currentExp}
        LV: {Math.floor((currentExp - baseExp) / 100 + baseLv)}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <MinusCircledIcon
          className={'ExpIcon'}
          onClick={() => updateExp(currentExp - 100)}
        />
        <div>{currentExp}</div>
        <PlusCircledIcon
          className={'ExpIcon'}
          onClick={() => updateExp(currentExp + 100)}
        />
      </div>
      <Slider
        min={0}
        max={6000}
        value={[baseExp, currentExp]}
        step={1}
        onValueChange={(val) => updateExp(val[1])}
      >
        <Image className='slider-image' name={unit} />
      </Slider>
    </div>
  )
}
