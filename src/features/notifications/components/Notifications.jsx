'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { Notification } from './Notification';
import { putNotificationSeen } from '../actions';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { env } from '@/config';
import {
  NOTIFICATION_STATUS,
  handleSubmissionError,
  handleSubmissionSuccess,
} from '@/lib/utils';

export const Notifications = ({ notifications, session }) => {
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const [loadingStates] = useState({}); // We can use loadingState instead of optimistically updating the notification

  const router = useRouter();

  const hasOneUnseen = localNotifications?.some(
    (n) => n.status === NOTIFICATION_STATUS.NOT_SEEN,
  );

  useEffect(() => {
    if (session?.user?.id) {
      let userId = session?.user?.id;
      const socket = io(env.NEXT_PUBLIC_API_URL);

      // Join the user's room
      socket.emit('join', userId);

      // Listen for notifications
      socket.on('notification', (message) => {
        // Add the new notification to the top of the list
        setLocalNotifications((prevNotifications) => [
          message,
          ...prevNotifications,
        ]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [session?.user?.id]);

  // Update the status of the notification
  const handlePutSeen = useCallback(
    async ({ notification }) => {
      const { _id: notificationId, status } = notification;
      const newStatus =
        status === NOTIFICATION_STATUS.NOT_SEEN ? 'seen' : 'not seen';
      const optimisticUpdatedNotifications = localNotifications.map((n) =>
        n._id === notificationId ? { ...n, status: newStatus } : n,
      );

      // Optimistically update the notification
      setLocalNotifications(optimisticUpdatedNotifications);

      try {
        // Update the notification
        await putNotificationSeen({ notificationId, status: newStatus });
        handleSubmissionSuccess(`Notification updated to ${newStatus}`);
        router.refresh();
      } catch (error) {
        // Revert the changes if there is an error
        handleSubmissionError(error, 'Error updating notification');
        setLocalNotifications(notifications);
      }
    },
    [localNotifications, notifications],
  );

  // Mark all notifications as seen
  const markAllAsSeen = async () => {
    const unseenNotifications = localNotifications.filter(
      (n) => n.status === NOTIFICATION_STATUS.NOT_SEEN,
    );

    if (unseenNotifications.length === 0) {
      return;
    }

    // Optimistically update all notifications
    setLocalNotifications(
      localNotifications.map((n) =>
        n.status === NOTIFICATION_STATUS.NOT_SEEN
          ? { ...n, status: 'seen' }
          : n,
      ),
    );

    try {
      // Update all notifications
      await Promise.all(
        unseenNotifications.map((n) =>
          putNotificationSeen({ notificationId: n._id, status: 'seen' }),
        ),
      );
      handleSubmissionSuccess('All notifications marked as seen');
      router.refresh();
    } catch (error) {
      // Revert the changes if there is an error
      handleSubmissionError(error, 'Error updating notifications');
      setLocalNotifications(notifications);
    }
  };

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
        <DropdownMenuLabel className="flex items-center justify-between px-4 py-2 text-sm text-gray-500">
          <span>Notifications</span>
          <Button
            variant="ghost"
            className="text-xs"
            onClick={markAllAsSeen}
            disabled={!hasOneUnseen}
          >
            Mark all as seen
          </Button>
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
