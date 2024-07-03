'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { Notification } from './Notification';
import { putNotificationSeen } from '../actions';

import { Icons } from '@/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NOTIFICATION_STATUS,
  handleSubmissionError,
  handleSubmissionSuccess,
} from '@/lib/utils';

export const Notifications = ({ notifications }) => {
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const [loadingStates, setLoadingStates] = useState({});
  const router = useRouter();

  const hasOneUnseen = localNotifications?.some(
    (n) => n.status === NOTIFICATION_STATUS.NOT_SEEN,
  );

  const handlePutSeen = useCallback(
    async ({ notification }) => {
      const { _id: notificationId, status } = notification;
      const newStatus =
        status === NOTIFICATION_STATUS.NOT_SEEN ? 'seen' : 'not seen';
      const optimisticUpdatedNotifications = localNotifications.map((n) =>
        n._id === notificationId ? { ...n, status: newStatus } : n,
      );

      setLocalNotifications(optimisticUpdatedNotifications);

      try {
        await putNotificationSeen({ notificationId, status: newStatus });
        handleSubmissionSuccess(`Notification updated to ${newStatus}`);
        router.refresh();
      } catch (error) {
        handleSubmissionError(error, 'Error updating notification');
        setLocalNotifications(notifications);
      } finally {
        setLoadingStates((prev) => ({ ...prev, [notificationId]: false }));
      }
    },
    [localNotifications, notifications],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative hidden cursor-pointer xs:flex">
          {hasOneUnseen && (
            <div className="absolute right-[-2px] top-[-3px]">
              <Icons.notificationFrame className="" />
            </div>
          )}
          <Icons.notification className="h-6 text-gray-500" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="lg:max-w-auto max-w-96  rounded-xl bg-white shadow-lg">
        <DropdownMenuLabel className="px-4 py-2 text-sm text-gray-500">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[500px] overflow-auto">
          {localNotifications?.map((notification) => (
            <Notification
              key={notification._id}
              notification={notification}
              handlePutSeen={handlePutSeen}
              isLoading={loadingStates[notification._id] || false}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
