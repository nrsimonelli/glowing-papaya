import { Slider } from './components/Slider'
import { Image } from './components/Image'
import { JobChangeDropdown } from './JobChangeDropdown'
import { JobName, UnitName, objectKeys } from './utils/types'
import { useEffect, useState } from 'react'
import { UnitData } from './TeamPlanner'
import { JOB_GROUP } from './constants'
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { getDisplayName } from './utils/getDisplayName'
import { isEqual } from 'lodash'

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
  const { EXP, JOB, LV } = unitData[unitData.length - 1]
  const [baseExp, setBaseExp] = useState(
    unitData.length > 1
      ? Math.floor(EXP / 100) * 100 - (LV - 1) * 100
      : base.EXP
  )
  const [baseLv, setBaseLv] = useState(unitData.length > 1 ? 1 : LV)
  const [currentExp, setCurrentExp] = useState(EXP)
  const [currentJob, setCurrentJob] = useState<JobName>(JOB)
  const [currentLevel, setCurrentLevel] = useState(LV)

  const [sliderValues, setSliderValues] = useState([
    base.EXP,
    ...unitData.map((x) => x.EXP),
  ])

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

  useEffect(() => {
    if (!isEqual(sliderValues, [base.EXP, ...unitData.map((x) => x.EXP)])) {
      const data = unitData[unitData.length - 1]
      const parentBase =
        unitData.length > 1
          ? Math.floor(EXP / 100) * 100 - (LV - 1) * 100
          : base.EXP
      setBaseExp(parentBase)
      setBaseLv(unitData.length > 1 ? 1 : base.LV)
      setCurrentExp(data.EXP)
      setCurrentJob(data.JOB)
      setCurrentLevel(data.LV)
      setSliderValues([base.EXP, ...unitData.map((x) => x.EXP)])
    }
  }, [unitData])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>LV: {currentLevel}</div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
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
        </div>
        <div>
          <JobChangeDropdown
            unit={unit}
            mapAdvanced={
              isAdvanced || isBase ? currentLevel > 9 : currentLevel > 20
            }
            handleJobChange={handleJobChange}
            disabled={false}
          />
          <button
            disabled={unitData.length === 1 || currentExp !== baseExp}
            onClick={handleUndoChange}
          >
            Undo
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <div style={{ flex: '1 0 140px' }}>
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
