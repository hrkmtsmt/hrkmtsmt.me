import React from "react";

interface SeekBarProps {
  value: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const SeekBar: React.FC<SeekBarProps> = React.memo((props) => {
  return (
    <input
      type="range"
      className="z-[2] h-1 w-full appearance-primary bg-black cursor-pointer"
      value={props.value}
      onChange={props.onChange}
    />
  )
})
