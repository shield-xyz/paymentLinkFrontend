'use client';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { NOTIFICATION_STATUS } from '@/lib/utils';

export const Notification = ({ notification, handlePutSeen, isLoading }) => {
  return (
    <DropdownMenuItem
      key={notification._id}
      className="px-4 py-2 text-sm hover:bg-gray-100"
      onSelect={(e) => e.preventDefault()}
    >
      <div className="flex flex-col">
        <span className="font-semibold">{notification.title}</span>
        <span className="text-xs text-gray-500">
          {notification.description}
        </span>
      </div>
      <Button variant="ghost" className="text-xs">
        {notification.status === NOTIFICATION_STATUS.NOT_SEEN ? (
          <>
            {isLoading ? (
              <Icons.loaderCircle className="h-5 w-5 animate-spin text-primary" />
            ) : (
              <Icons.notificationFrame
                className=""
                onClick={() => handlePutSeen({ notification })}
              />
            )}
          </>
        ) : (
          <>
            {isLoading ? (
              <Icons.loaderCircle className="h-5 w-5 animate-spin text-primary" />
            ) : (
              <Icons.notificationFrame
                className="rounded-full border border-muted-foreground/30 fill-muted p-0.5"
                onClick={() => handlePutSeen({ notification })}
              />
            )}
          </>
        )}
      </Button>
    </DropdownMenuItem>
  );
};
