import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as React from 'react';

import { cn } from '@/lib/utils';

const toggleGroupItemClasses =
  'hover:bg-violet3 color-mauve11 data-[state=on]:bg-red-400 data-[state=on]:text-violet12 flex h-[35px] w-[35px] items-center justify-center bg-white leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none';

const ToggleGroupRoot = React.forwardRef(({ className, children }) => (
  <ToggleGroup.Root
    className={cn('bg-mauve6 grid grid-cols-5 rounded-full border', className)}
    type="single"
    aria-label="Text alignment"
  >
    {children}
  </ToggleGroup.Root>
));
ToggleGroupRoot.displayName = ToggleGroup.Root.displayName;

const ToggleGroupItem = React.forwardRef(({ className, ...props }, ref) => (
  <ToggleGroup.Item
    ref={ref}
    className={cn(
      'border-r py-2 text-center first:rounded-l-full last:rounded-r-full last:border-none hover:bg-black/5 data-[state=on]:bg-black/10',
      className,
    )}
    {...props}
  ></ToggleGroup.Item>
));

ToggleGroupItem.displayName = ToggleGroup.Item.displayName;

// const ToggleGroupDemo = React.forwardRef(() => (
//   <ToggleGroupRoot>
//     <ToggleGroup.Item className="text-center py-2 border-r" value="50" aria-label="Left aligned">
//       $50
//     </ToggleGroup.Item>
//     <ToggleGroup.Item className="text-center border-r" value="100" aria-label="Center aligned">
//       $100
//     </ToggleGroup.Item>
//     <ToggleGroup.Item className="text-center border-r" value="250" aria-label="Right aligned">
//       $250
//     </ToggleGroup.Item>
//     <ToggleGroup.Item className="text-center border-r" value="500" aria-label="Left aligned">
//       $500
//     </ToggleGroup.Item>
//     <ToggleGroup.Item className="text-center" value="1000" aria-label="Center aligned">
//       $1k
//     </ToggleGroup.Item>
//   </ToggleGroupRoot>
// ));

export { ToggleGroupRoot, ToggleGroupItem };
