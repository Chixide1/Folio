import React from 'react';
import {
  TbLoader2,
} from 'react-icons/tb';
import { cn } from '@/lib/utils';

export function Spinner({ className }: {className?: string }) {
  return (
    <TbLoader2
      className={cn(
        'animate-spin text-accent',
        className
      )}
    />
  )
}