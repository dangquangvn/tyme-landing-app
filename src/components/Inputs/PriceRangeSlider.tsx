import React, { useEffect, useRef, CSSProperties } from 'react'
import './priceRangeSlicer.css'

type PriceRangeSliderProps = {
  min: number
  max: number
  value: [number, number] // Controlled value
  trackColor?: string
  rangeColor?: string
  valueStyle?: CSSProperties
  width?: string
  currencyText?: string
  onChange: (values: { min: number; max: number }) => void
}

const valueCSS: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
  gap: '2px',
  paddingTop: '10px'
}

const PriceRangeSlider = ({
  min,
  max,
  value,
  trackColor = '#cecece',
  rangeColor = '#ff0303',
  valueStyle = valueCSS,
  width = '300px',
  currencyText = '$',
  onChange
}: PriceRangeSliderProps) => {
  const minValRef = useRef<HTMLInputElement>(null)
  const maxValRef = useRef<HTMLInputElement>(null)
  const range = useRef<HTMLDivElement | null>(null)

  // convert to percentage
  const getPercent = (val: number) => Math.round(((val - min) / (max - min)) * 100)

  // Positioning tooltips
  const minTooltipStyle: CSSProperties = {
    position: 'absolute',
    left: `calc(${getPercent(value[0])}% - 15px)`,
    bottom: '30px'
  }

  const maxTooltipStyle: CSSProperties = {
    position: 'absolute',
    left: `calc(${getPercent(value[1])}% - 30px)`,
    bottom: '30px'
  }

  // Update the range styling dynamically
  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(value[0])
      const maxPercent = getPercent(value[1])
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [value])

  return (
    <div className='w-full flex items-center justify-center flex-col space-y-14'>
      {/* Display Price Values */}
      <div className='w-[300px] px-4 flex items-center justify-between gap-x-5'>
        <p className='text-xl text-neutral-100 font-semibold'>
          {currencyText} {value[0]}
        </p>
        <div className='flex-1 border-dashed border border-neutral-500 mt-1'></div>
        <p className='text-xl text-neutral-100 font-semibold'>
          {currencyText} {value[1]}
        </p>
      </div>

      {/* Slider UI */}
      <div className='multi-slide-input-container relative' style={{ width }}>
        <input
          ref={minValRef}
          type='range'
          min={min}
          max={max}
          value={value[0]}
          onChange={(event) => {
            const newMin = Math.min(Number(event.target.value), value[1] - 1)
            onChange({ min: newMin, max: value[1] })
          }}
          className='thumb thumb-left'
          style={{ width, zIndex: value[0] > max - 100 ? 5 : undefined }}
        />

        <input
          ref={maxValRef}
          type='range'
          min={min}
          max={max}
          value={value[1]}
          onChange={(event) => {
            const newMax = Math.max(Number(event.target.value), value[0] + 1)
            onChange({ min: value[0], max: newMax })
          }}
          className='thumb thumb-right'
          style={{ width, zIndex: value[0] > max - 100 ? 4 : undefined }}
        />

        <div className='slider'>
          <div style={{ backgroundColor: trackColor }} className='track-slider' />
          <div ref={range} style={{ backgroundColor: rangeColor }} className='range-slider' />
        </div>

        {/* Tooltips */}
        <div className='absolute' style={minTooltipStyle}>
          <div className='tooltip relative'>
            <span className='tooltip-text'>
              {currencyText} {value[0]}
            </span>
            <span className='icon-[mdi--triangle-down] absolute left-[50%] top-full -translate-x-[50%]' />
          </div>
        </div>

        <div className='absolute' style={maxTooltipStyle}>
          <div className='tooltip relative'>
            <span className='tooltip-text'>
              {currencyText} {value[1]}
            </span>
            <span className='icon-[mdi--triangle-down] absolute left-[50%] top-full -translate-x-[50%]' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceRangeSlider
