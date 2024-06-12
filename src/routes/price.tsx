import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetPrice from '../hooks/useGetPrice'
import { useQueryClient } from '@tanstack/react-query'
import { GetPricesResult } from '../hooks/useGetPrices'
import { USDollar } from '.'
import HighchartsReact from 'highcharts-react-official'
import Highcharts, { Options } from 'highcharts'
import dayjs from 'dayjs'
import { NumberInput } from '@mantine/core'
import { debounce } from 'lodash'


const Price = () => {
  const params = useParams()
  const [minutes, setMinutes] = useState<string | number | undefined>(60)
  const { data: historicalPrice } = useGetPrice(params.priceId as string, minutes as number)
  const queryClient = useQueryClient()
  const prices = queryClient.getQueryData(['price']) as GetPricesResult[]
  const priceDetails = prices?.find((price) => price.id === params.priceId)


  const transformedData = useMemo(() => historicalPrice?.history.map(([timestamp, value]) => ({
    x: dayjs(timestamp).toDate().getTime(),
    y: value
  })) ?? [] as { x: number, y: string | number }[], [historicalPrice?.history])

  const options: Options = {
    chart: {

      type: "line"
    },
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: ''
      },
    },
    series: [{
      name: 'Value',
      type: 'line',
      data: transformedData as any
    }]
  }

  return (
    <div className='flex flex-wrap gap-5'>
      {/* Details */}
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <img width={40} height={40} src={priceDetails?.image} alt={priceDetails?.id} />
          <div className='flex'>
            <div className='text-xl'>{priceDetails?.name}</div>
            <div className='text-xl font-semibold uppercase'>({priceDetails?.symbol})</div>
          </div>
        </div>
        <div className='text-3xl font-bold'>
          Current Price: {USDollar.format(priceDetails?.current_price ?? 0)}
        </div>
        <div className='text-3xl font-bold'>
          Average Price: {USDollar.format(historicalPrice?.average ?? 0)}
        </div>
      </div>
      {/* Chart */}
      <div className='flex-1 space-y-5'>
        <NumberInput defaultValue={minutes} onChange={debounce((e) => setMinutes(e), 1000)} name='minutes' className='max-w-[200px]' allowNegative={false} label='Minutes' />
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        /></div>
    </div>
  )
}

export default Price