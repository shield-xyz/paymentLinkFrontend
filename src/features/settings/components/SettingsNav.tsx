'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const statusGroups = [
  {
    label: 'Profile',
    value: '/settings',
  },
  {
    label: 'Bank Account',
    value: '/settings/bank-account',
  },
];

export const SettingsNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRouteChange = (value) => {
    router.push(value);
  };

  return (
    <Tabs
      defaultValue={pathname}
      className="w-full overflow-auto"
      onValueChange={handleRouteChange}
    >
      <TabsList className="sticky left-0 mb-5 w-full min-w-fit justify-start">
        {' '}
        {statusGroups.map((group) => (
          <TabsTrigger value={group.value} key={group.value}>
            {group.label}
            <span className="ml-1 text-muted-foreground">{group.count}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
