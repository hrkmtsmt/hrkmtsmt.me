import React, { ComponentProps } from 'react';

const BUTTON_COLORS = {
  primary: 'primary',
  secondary: 'secondary',
} as const;

export interface ButtonProps
  extends Pick<ComponentProps<'button'>, 'children' | 'value' | 'onClick' | 'disabled' | 'role'> {
  color: (typeof BUTTON_COLORS)[keyof typeof BUTTON_COLORS];
}

const Component: React.FC<ButtonProps> = (props) => {
  if (props.color === BUTTON_COLORS.primary) {
    return (
      <button
        {...props}
        type="button"
        className="w-fit text-nowrap rounded-full bg-primary px-4 font-qualion-bold leading-10 text-black duration-200 ease-in-out hover:opacity-80 active:scale-95"
      />
    );
  }

  return (
    <button
      {...props}
      type="button"
      className="w-fit text-nowrap rounded-full bg-black px-4 font-qualion-bold leading-10 text-primary duration-200 ease-in-out hover:opacity-80 active:scale-95"
    />
  );
};

export const Button = React.memo(Component);
