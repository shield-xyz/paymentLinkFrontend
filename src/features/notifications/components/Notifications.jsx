'use client';

import { Notification } from './Notification';
import { useNotifications } from '../hooks/useNotifications';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NOTIFICATION_STATUS } from '@/lib/utils';

export const Notifications = ({ notifications, session }) => {
  const {
    localNotifications,
    selectedTab,
    setSelectedTab,
    notSeenNotifications,
    seenNotifications,
    markAllAsSeen,
    markAllAsArchived,
    handlePutSeen,
    handlePutArchive,
    tabs,
    TABS,
  } = useNotifications({ notifications, session });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative hidden cursor-pointer xs:flex">
          {notSeenNotifications?.length > 0 && (
            <div className="absolute right-[-2px] top-[-3px]">
              <Icons.notificationFrame className="" />
            </div>
          )}
          <Icons.notification className="h-6 text-gray-500" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="lg:max-w-auto max-w-96  rounded-xl bg-white shadow-lg">
        <Tabs
          defaultValue={TABS.Inbox}
          className="w-full overflow-auto"
          onValueChange={(tab) => setSelectedTab(tab)}
        >
          <TabsList className="mt-2 w-full min-w-fit justify-start px-4">
            {tabs.map((tab) => (
              <TabsTrigger value={tab} key={tab} className="capitalize">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent className="w-full" value={tab} key={tab}>
              <div className="max-h-[500px] w-full max-w-[98vw] overflow-auto overflow-x-hidden sm:max-w-[500px]">
                <div className="w-[500px]"></div>
                {localNotifications
                  ?.filter((notification) => {
                    // Filter notifications based on the selected tab
                    if (selectedTab === TABS.Archive) {
                      return (
                        notification.status === NOTIFICATION_STATUS.ARCHIVED
                      );
                    } else {
                      return (
                        notification.status !== NOTIFICATION_STATUS.ARCHIVED
                      );
                    }
                  })
                  .map((notification) => (
                    <Notification
                      key={notification._id}
                      notification={notification}
                      handlePutSeen={handlePutSeen}
                      handlePutArchive={handlePutArchive}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {((selectedTab === TABS.Inbox && notSeenNotifications?.length > 0) ||
          (selectedTab === TABS.Inbox && seenNotifications?.length > 0)) && (
          <DropdownMenuLabel className="flex items-center justify-center border-t px-4 text-sm text-gray-500">
            {localNotifications.find(
              (n) => n.status === NOTIFICATION_STATUS.NOT_SEEN,
            ) ? (
              <Button
                variant="ghost"
                className="text-xs"
                onClick={markAllAsSeen}
                size="sm"
              >
                Mark all as seen
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="text-xs"
                onClick={markAllAsArchived}
                size="sm"
              >
                Archive all
              </Button>
            )}
          </DropdownMenuLabel>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
