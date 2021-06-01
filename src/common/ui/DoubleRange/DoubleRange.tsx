import React from "react";
import { Range, createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { RangeProps } from 'rc-slider/lib/Range';

type DoubleRangePropsType = {
  onChangeRange?: (value: [number, number]) => void
  value?: [number, number]
  min: number
  max: number
  step: number
} & RangeProps

const RangeWithTooltip = createSliderWithTooltip(Range);

export const DoubleRange: React.FC<DoubleRangePropsType> = (
  {
    onChangeRange, value,
    min, max, step,draggableTrack = true,...restProps
  }
) => {

  return (
    <>
      <RangeWithTooltip onChange={([val1, val2]) => {
        onChangeRange && onChangeRange([val1, val2])
      }}
                        value={value}
                        min={min}
                        max={max}
                        step={step}
                        draggableTrack={draggableTrack}
                        {...restProps}
      />
    </>
  );
}