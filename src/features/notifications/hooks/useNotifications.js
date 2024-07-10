'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'sonner';

import { updateNotificationStatus } from '../actions';

import { env } from '@/config';
import { NOTIFICATION_STATUS, handleSubmissionError } from '@/lib/utils';

const TABS = {
  Inbox: 'inbox',
  Archive: 'archive',
};

const tabs = Object.values(TABS);

export const useNotifications = ({ notifications, session }) => {
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const [selectedTab, setSelectedTab] = useState(TABS.Inbox);

  const router = useRouter();

  const notSeenNotifications = localNotifications?.filter(
    (n) => n.status === NOTIFICATION_STATUS.NOT_SEEN,
  );
  const seenNotifications = localNotifications?.filter(
    (n) => n.status === NOTIFICATION_STATUS.SEEN,
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

        toast.info(`New notification: ${message.title}`);
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
        status === NOTIFICATION_STATUS.NOT_SEEN
          ? NOTIFICATION_STATUS.SEEN
          : NOTIFICATION_STATUS.NOT_SEEN;
      const optimisticUpdatedNotifications = localNotifications.map((n) =>
        n._id === notificationId ? { ...n, status: newStatus } : n,
      );

      // Optimistically update the notification
      setLocalNotifications(optimisticUpdatedNotifications);

      try {
        // Update the notification
        await updateNotificationStatus({ notificationId, status: newStatus });
        router.refresh();
      } catch (error) {
        // Revert the changes if there is an error
        handleSubmissionError(
          error,
          `Error updating notification "${notification.title}"`,
        );
        setLocalNotifications(notifications);
      }
    },
    [localNotifications, notifications],
  );

  const handlePutArchive = useCallback(
    async ({ notification }) => {
      const { _id: notificationId, status } = notification;
      const newStatus =
        status === NOTIFICATION_STATUS.ARCHIVED
          ? NOTIFICATION_STATUS.NOT_SEEN
          : NOTIFICATION_STATUS.ARCHIVED;
      const optimisticUpdatedNotifications = localNotifications.map((n) =>
        n._id === notificationId ? { ...n, status: newStatus } : n,
      );

      // Optimistically update the notification
      setLocalNotifications(optimisticUpdatedNotifications);

      try {
        // Update the notification
        await updateNotificationStatus({ notificationId, status: newStatus });
        router.refresh();
      } catch (error) {
        // Revert the changes if there is an error
        handleSubmissionError(
          error,
          `Error updating notification "${notification.title}"`,
        );
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
          ? { ...n, status: NOTIFICATION_STATUS.SEEN }
          : n,
      ),
    );

    try {
      // Update all notifications
      await Promise.all(
        unseenNotifications.map((n) =>
          updateNotificationStatus({
            notificationId: n._id,
            status: NOTIFICATION_STATUS.SEEN,
          }),
        ),
      );
      router.refresh();
    } catch (error) {
      // Revert the changes if there is an error
      handleSubmissionError(error, 'Error updating notifications');
      setLocalNotifications(notifications);
    }
  };

  const markAllAsArchived = async () => {
    const unseenNotifications = localNotifications.filter(
      (n) => n.status === NOTIFICATION_STATUS.SEEN,
    );

    if (unseenNotifications.length === 0) {
      return;
    }

    // Optimistically update all notifications
    setLocalNotifications(
      localNotifications.map((n) =>
        n.status === NOTIFICATION_STATUS.SEEN
          ? { ...n, status: NOTIFICATION_STATUS.ARCHIVED }
          : n,
      ),
    );

    try {
      // Update all notifications
      await Promise.all(
        unseenNotifications.map((n) =>
          updateNotificationStatus({
            notificationId: n._id,
            status: NOTIFICATION_STATUS.ARCHIVED,
          }),
        ),
      );
      router.refresh();
    } catch (error) {
      // Revert the changes if there is an error
      handleSubmissionError(error, 'Error updating notifications');
      setLocalNotifications(notifications);
    }
  };

  const filteredNotifications = useMemo(() => {
    return localNotifications?.filter((notification) => {
      if (selectedTab === TABS.Archive) {
        return notification.status === NOTIFICATION_STATUS.ARCHIVED;
      } else {
        return notification.status !== NOTIFICATION_STATUS.ARCHIVED;
      }
    });
  }, [localNotifications, selectedTab]);

  return {
    filteredNotifications,
    handlePutArchive,
    handlePutSeen,
    localNotifications,
    markAllAsArchived,
    markAllAsSeen,
    notSeenNotifications,
    seenNotifications,
    selectedTab,
    setSelectedTab,
    tabs,
    TABS,
  };
};
