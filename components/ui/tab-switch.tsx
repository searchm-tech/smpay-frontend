'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TabSwitchProps {
  leftLabel?: string;
  rightLabel?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  className?: string;
}

const commonClassName =
  'relative flex h-12 w-[200px] items-center justify-center text-sm font-medium transition-colors cursor-pointer';

export function TabSwitch({
  leftLabel = '',
  rightLabel = '',
  value,
  onValueChange,
  className,
}: TabSwitchProps) {
  return (
    <div className={cn('relative flex w-[400px] flex-col', className)}>
      <div className="flex">
        <button
          onClick={() => onValueChange(false)}
          className={cn(commonClassName, !value ? 'text-[#363C45]' : 'text-[#9BA5B7]')}
        >
          {leftLabel}
        </button>
        <button
          onClick={() => onValueChange(true)}
          className={cn(commonClassName, value ? 'text-[#363C45]' : 'text-[#9BA5B7]')}
        >
          {rightLabel}
        </button>
      </div>
      <div className="relative h-[2px] w-full bg-muted">
        <div
          className={cn(
            'absolute h-full w-[200px] bg-foreground transition-transform duration-200',
            value ? 'translate-x-[200px]' : 'translate-x-0',
          )}
        />
      </div>
    </div>
  );
}
