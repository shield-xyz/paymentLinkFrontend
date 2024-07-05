'use client';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { NOTIFICATION_STATUS, formatDateTime } from '@/lib/utils';

export const Notification = ({
  notification,
  handlePutSeen,
  handlePutArchive,
}) => {
  return (
    <DropdownMenuItem
      key={notification._id}
      className="flex justify-between px-4 py-2 text-sm hover:bg-gray-100"
      onSelect={(e) => e.preventDefault()}
    >
      <div className="flex flex-col">
        <span className="font-semibold">{notification.title}</span>
        <span className="text-xs text-gray-500">
          {notification.description}
        </span>
        <span className="mt-2 text-xxs text-gray-400">
          {formatDateTime(notification.createdAt)}
        </span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        {notification.status === NOTIFICATION_STATUS.NOT_SEEN && (
          <Button
            size="iconSm"
            variant="ghost"
            className="text-xs"
            title="Archive"
          >
            <Icons.notificationFrame
              className=""
              onClick={() => handlePutSeen({ notification })}
            />
          </Button>
        )}
        {notification.status === NOTIFICATION_STATUS.SEEN && (
          <Button
            size="iconSm"
            variant="ghost"
            className="text-xs"
            title="Archive"
          >
            <Icons.archive
              className="rounded-full border border-transparent stroke-muted-foreground/40 p-1 duration-300 hover:border-muted-foreground/50 active:bg-muted"
              onClick={() => handlePutArchive({ notification })}
            />
          </Button>
        )}
      </div>
    </DropdownMenuItem>
  );
};
