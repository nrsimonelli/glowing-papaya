import { Slider } from './components/Slider'
import { Image } from './components/Image'
import { MasterSeal } from './MasterSeal'
import { SecondSeal } from './SecondSeal'
import { JobName, UnitName, objectKeys } from './utils/types'
import { useState } from 'react'
import { UnitData } from './TeamPlanner'
import { JOB_GROUP } from './constants'
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { getDisplayName } from './utils/getDisplayName'

interface ExpSliderProps {
  unit: UnitName
  base: UnitData
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
  base,
  unitData,
  updateUnitData,
  removeUnitData,
  addUnitData,
}: ExpSliderProps) => {
  const { EXP, JOB, LV } = unitData[0]
  const [baseExp, setBaseExp] = useState(EXP)
  const [baseLv, setBaseLv] = useState(LV)
  const [currentExp, setCurrentExp] = useState(EXP)
  const [currentJob, setCurrentJob] = useState<JobName>(JOB)
  const [currentLevel, setCurrentLevel] = useState(LV)

  const [sliderValues, setSliderValues] = useState([base.EXP, EXP])

  const isSpecial = objectKeys(JOB_GROUP.SPECIAL).some(
    (job) => job === currentJob
  )
  const isAdvanced = objectKeys(JOB_GROUP.ADVANCED).some(
    (job) => job === currentJob
  )
  const isBase = objectKeys(JOB_GROUP.BASE).some((job) => job === currentJob)
  const levelCap = isSpecial ? 40 : 20
  const expCap = (levelCap - baseLv) * 100 + baseExp

  const updateExp = (value: number) => {
    const updatedExp =
      value > expCap ? expCap : value < baseExp ? baseExp : value
    const updatedLevel = Math.floor((updatedExp - baseExp) / 100 + baseLv)

    if (currentLevel !== updatedLevel) {
      setCurrentExp(updatedExp)
      setSliderValues([...sliderValues.slice(0, -1), updatedExp])
      setCurrentLevel(updatedLevel)
      updateUnitData(unit, currentJob, updatedLevel, updatedExp)
    } else {
      setSliderValues([...sliderValues.slice(0, -1), updatedExp])
      setCurrentExp(updatedExp)
    }
  }

  const handleJobChange = (selectedJob: JobName) => {
    console.log(sliderValues)
    const sliderCopy = [...sliderValues]
    sliderCopy.splice(
      sliderValues.length - 1,
      0,
      Math.floor(currentExp / 100) * 100
    )
    setCurrentLevel(1)
    setBaseLv(1)
    setBaseExp(Math.floor(currentExp / 100) * 100)
    setSliderValues(sliderCopy)
    setCurrentJob(selectedJob)
    addUnitData(unit, selectedJob)
  }

  const handleUndoChange = () => {
    const previousData = unitData[unitData.length - 2]
    const previoiusBaseExp =
      unitData.length >= 3
        ? Math.floor(previousData.EXP / 100) * 100 - previousData.LV * 100 + 100
        : base.EXP
    setCurrentJob(previousData.JOB)
    setCurrentExp(previousData.EXP)
    setBaseExp(previoiusBaseExp)
    setCurrentLevel(previousData.LV)
    setBaseLv(unitData.length >= 3 ? 1 : base.LV)
    setSliderValues((prevValues) => prevValues.slice(0, -1))
    removeUnitData(unit)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
      <div>
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
        <button
          disabled={unitData.length === 1 || currentExp !== baseExp}
          onClick={handleUndoChange}
        >
          Undo
        </button>
      </div>
      <div>LV: {Math.floor((currentExp - baseExp) / 100 + baseLv)}</div>
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

      <div
        style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <div>
          {getDisplayName(unit)}, {getDisplayName(currentJob)}
        </div>
        <Slider
          min={0}
          max={6000}
          value={sliderValues}
          step={1}
          onValueChange={(val) => updateExp(val[val.length - 1])}
        >
          <Image className='slider-image' name={unit} />
        </Slider>
      </div>
    </div>
  )
}
