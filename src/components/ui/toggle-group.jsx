import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as React from 'react';
import { cn } from '@/lib/utils';

const toggleGroupItemClasses =
  'hover:bg-violet3 color-mauve11 data-[state=on]:bg-red-400 data-[state=on]:text-violet12 flex h-[35px] w-[35px] items-center justify-center bg-white leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none';

const ToggleGroupDemo = React.forwardRef(({ classNames }) => (
  <ToggleGroup.Root
    className={cn("bg-mauve6 rounded-full space-x-px border grid grid-cols-5", classNames)}
    type="single"
    aria-label="Text alignment"
  >
    <ToggleGroup.Item className={toggleGroupItemClasses} value="50" aria-label="Left aligned">
      $50
    </ToggleGroup.Item>
    <ToggleGroup.Item className={toggleGroupItemClasses} value="100" aria-label="Center aligned">
      $100
    </ToggleGroup.Item>
    <ToggleGroup.Item className={toggleGroupItemClasses} value="250" aria-label="Right aligned">
      $250
    </ToggleGroup.Item>
    <ToggleGroup.Item className={toggleGroupItemClasses} value="500" aria-label="Left aligned">
      $500
    </ToggleGroup.Item>
    <ToggleGroup.Item className={toggleGroupItemClasses} value="1000" aria-label="Center aligned">
      $1k
    </ToggleGroup.Item>
  </ToggleGroup.Root>
));

export { ToggleGroupDemo }