'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useStepper, useStepItem } from '@/components/ui/stepper';

interface CustomStepperSeparatorProps extends React.ComponentProps<'div'> {
  thickness?: 'hairline' | 'thin' | 'normal';
}

export function CustomStepperSeparator({
  className,
  thickness = 'hairline',
  ...props
}: CustomStepperSeparatorProps) {
  const { orientation } = useStepper();
  const { state } = useStepItem();

  const thicknessClass =
    thickness === 'hairline'
      ? 'h-px scale-y-[0.5]'
      : thickness === 'thin'
        ? 'h-px'
        : 'h-0.5';

  return (
    <div
      aria-hidden
      data-slot='custom-stepper-separator'
      data-state={state}
      className={cn(
        'relative flex items-center justify-center',
        orientation === 'horizontal' ? 'flex-1 px-2' : 'py-2',
        className,
      )}
      {...props}
    >
      {/* Track */}
      <div
        className={cn(
          'w-full rounded-full bg-muted transition-colors duration-300',
          orientation === 'horizontal'
            ? thicknessClass
            : thicknessClass.replace('h-', 'w-'),
        )}
      />

      {/* Progress overlay */}
      <div
        className={cn(
          'absolute left-0 top-1/2 -translate-y-1/2 rounded-full transition-all duration-500',
          orientation === 'horizontal'
            ? `${thicknessClass} w-full`
            : `${thicknessClass.replace('h-', 'w-')} h-full`,
          state === 'completed' && 'bg-green-500',
          state === 'active' && 'bg-primary',
          state === 'inactive' && 'bg-transparent',
        )}
      />
    </div>
  );
}
