import {
  Bar,
  BarChart,
  Legend,
  LegendProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { InitialUnitData, InitialStatData, StatName } from './TeamPlanner'
import { UNIT_NAME } from './constants'
import { UnitName } from './utils/types'
import {
  ValueType,
  Payload,
} from 'recharts/types/component/DefaultTooltipContent'
import { useState } from 'react'

export const GraphDisplay = ({
  unitData,
  statList,
}: {
  unitData: InitialUnitData[]
  statList: InitialStatData[]
}) => {
  const data = unitData
    .filter((entry) => entry.isVisible)
    .map((unit) => {
      const index = unit.data.length - 1
      const { HP, STR, MAG, DEX, SPD, DEF, RES, LCK, BLD } =
        unit.data[index].STATS
      return {
        id: unit.id,
        baseExp: unit.base.EXP,
        totalExp: unit.data[index].EXP,
        HP: HP,
        STR: STR,
        MAG: MAG,
        DEX: DEX,
        SPD: SPD,
        DEF: DEF,
        RES: RES,
        LCK: LCK,
        BLD: BLD,
        BST: HP + STR + MAG + DEX + SPD + DEF + RES + LCK + BLD,
      }
    })

  const statData = statList.filter(({ isVisible }) => isVisible)

  const getExpDiff = (data: { totalExp: number; baseExp: number }) => {
    return data.totalExp - data.baseExp
  }

  const getRatingDiff = (data: { [x: string]: number }) => {
    return statData.reduce((acc, stat) => {
      if (stat.id !== 'BST') {
        return (acc -= data[stat.id])
      }
      return acc
    }, data.BST)
  }

  const formatTooltipValue = (
    value: ValueType,
    name: string | number,
    item: Payload<ValueType, string | number>
  ) => {
    if (name === 'Rating') {
      return Math.floor(item.payload.BST)
    }
    return Math.floor(Number(value))
  }

  const initialOpacity = {
    HP: 1,
    STR: 1,
    MAG: 1,
    DEX: 1,
    SPD: 1,
    DEF: 1,
    RES: 1,
    LCK: 1,
    BLD: 1,
    BST: 1,
    baseExp: 1,
    investedExp: 1,
  }
  type Opacity = typeof initialOpacity & { [key: string]: number }
  const [opacity, setOpacity] = useState<Opacity>(initialOpacity)

  const handleMouseLeave = () => {
    setOpacity(initialOpacity)
  }

  const handleMouseEnter = (o: { dataKey: { name: string | number } }) => {
    const fnToKey: { [key: string]: string } = {
      getExpDiff: 'investedExp',
      getRatingDiff: 'BST',
    }

    const dataKeyName = o.dataKey?.name
    const dataKey = fnToKey[dataKeyName] ?? o.dataKey

    setOpacity((prevOpacity) => {
      const updatedOpacity = { ...prevOpacity }
      Object.keys(updatedOpacity).forEach((key) => {
        updatedOpacity[key] = key === dataKey ? 1 : 0.5
      })
      return updatedOpacity
    })
  }

  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey={'id'}
          tickFormatter={(value) => UNIT_NAME[value as UnitName]}
          stroke='hsl(250, 3%, 47%)'
          fontSize={13}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId={'stats'}
          stroke='hsl(250, 3%, 47%)'
          // label={{
          //   value: 'personal base stats',
          //   position: 'insideLeft',
          //   angle: '-90',
          // }}
          fontSize={13}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId={'exp'}
          orientation='right'
          domain={[0, 6000]}
          stroke='hsl(250, 3%, 47%)'
          // label={{
          //   value: 'experience points',
          //   position: 'insideRight',
          //   angle: '-90',
          // }}
          fontSize={13}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            background: '#2a2a2a',
            fontSize: 13,
            lineHeight: 1.5,
            textAlign: 'right',
            border: 'transparent',
          }}
          cursor={false}
          formatter={(value, name, item) =>
            formatTooltipValue(value, name, item)
          }
        />
        <Legend
          align={'center'}
          verticalAlign={'bottom'}
          layout={'horizontal'}
          onMouseEnter={handleMouseEnter as LegendProps['onMouseEnter']}
          onMouseLeave={handleMouseLeave}
        />
        {statData.map(({ id }, index) => (
          <Bar
            key={`${id}-bar`}
            yAxisId={'stats'}
            dataKey={id === 'BST' ? getRatingDiff : id}
            name={StatName[id].label}
            stackId={'a'}
            fill={StatName[id].color}
            fillOpacity={opacity[id]}
            radius={index === statData.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
          />
        ))}
        <Bar
          yAxisId={'exp'}
          dataKey='baseExp'
          name={'Base Exp'}
          stackId={'b'}
          fill='#65789B'
          fillOpacity={opacity.baseExp}
          radius={[0, 0, 0, 0]}
        />
        <Bar
          yAxisId={'exp'}
          dataKey={getExpDiff}
          name={'Invested Exp'}
          stackId={'b'}
          fill='#61DDAA'
          fillOpacity={opacity.investedExp}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
