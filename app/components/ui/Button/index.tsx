import React, { ComponentProps } from 'react';

const ButtonColor = {
  primary: 'primary',
  secondary: 'secondary', 
} as const;

export interface ButtonProps extends Pick<ComponentProps<'button'>, 'children' | 'onClick' | 'disabled'> {
  color: typeof ButtonColor[keyof typeof ButtonColor];
}

const Component: React.FC<ButtonProps> = (props) => {
  if (props.color === ButtonColor.primary) {
    return (
      <button
        {...props}
        type="button"
        className="rounded-full bg-primary px-4 font-qualion-bold font-bold leading-10 text-black duration-200 ease-in-out hover:opacity-80"
      />
    );
  }

  return (
    <button
      {...props}
      type="button"
      className="rounded-full bg-black px-4 font-qualion-bold font-bold leading-10 text-primary duration-200 ease-in-out hover:opacity-80"
    />
  )
};

export const Button = React.memo(Component);
