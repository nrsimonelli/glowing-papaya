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
  const [baseLv, setBaseLv] = useState(unitData.length > 1 ? 1 : base.LV)
  const [currentExp, setCurrentExp] = useState(EXP)
  const [currentJob, setCurrentJob] = useState<JobName>(JOB)
  const [currentLv, setCurrentLv] = useState(LV)
  const maxExp = 6000

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
  const expCap =
    (levelCap - baseLv) * 100 + baseExp > maxExp
      ? maxExp
      : (levelCap - baseLv) * 100 + baseExp

  const updateExp = (value: number) => {
    const updatedExp =
      value > expCap ? expCap : value < baseExp ? baseExp : value
    const updatedLevel = Math.floor((updatedExp - baseExp) / 100 + baseLv)

    if (currentLv !== updatedLevel) {
      setCurrentExp(updatedExp)
      setSliderValues([...sliderValues.slice(0, -1), updatedExp])
      setCurrentLv(updatedLevel)
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
    setCurrentLv(1)
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
    setCurrentLv(previousData.LV)
    setBaseLv(unitData.length >= 3 ? 1 : base.LV)
    setSliderValues((prevValues) => prevValues.slice(0, -1))
    removeUnitData(unit)
  }

  const disableUndo = unitData.length === 1 || currentLv !== baseLv

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
      setCurrentLv(data.LV)
      setSliderValues([base.EXP, ...unitData.map((x) => x.EXP)])
    }
  }, [unitData])

  return (
    <div className='ExpRowRoot'>
      <div className='ExpRowLabel'>
        {getDisplayName(unit)}, {getDisplayName(currentJob)}
      </div>
      <Slider
        min={0}
        max={maxExp}
        value={sliderValues}
        step={1}
        onValueChange={(val) => updateExp(val[val.length - 1])}
      >
        <Image className='SliderImage' name={unit} />
      </Slider>
      <div className='ExpActionContainer'>
        <div className='ExpLvAction'>
          <div>LV: {currentLv}</div>
          <div className='ExpAction'>
            <MinusCircledIcon
              className={'ExpIcon'}
              onClick={() => updateExp(currentExp - 100)}
            />
            <div className='ExpValueLabel'>{currentExp}</div>
            <PlusCircledIcon
              className={'ExpIcon'}
              onClick={() => updateExp(currentExp + 100)}
            />
          </div>
        </div>
        <div className='ExpClassChangeContainer'>
          <JobChangeDropdown
            unit={unit}
            mapAdvanced={
              isAdvanced || (isBase ? currentLv > 9 : currentLv > 20)
            }
            handleJobChange={handleJobChange}
            disabled={false}
            isMaxed={currentExp === expCap}
          />
          <button
            className='UndoClassButton'
            disabled={disableUndo}
            onClick={handleUndoChange}
            data-animate={!disableUndo}
          >
            Undo
          </button>
        </div>
      </div>
    </div>
  )
}
