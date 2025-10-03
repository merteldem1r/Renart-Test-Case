import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import { useEffect } from "react";

let globalNotificationInstance: NotificationInstance | null = null;

export const useGlobalNotification = () => {
  const [api, contextHolder] = notification.useNotification({
    placement: "topRight",
    duration: 3.5,
    showProgress: true,
    pauseOnHover: false,
    stack: { threshold: 3 },
  });

  useEffect(() => {
    globalNotificationInstance = api;
  }, [api]);

  return { api, contextHolder };
};

// Export for use outside of React components
export const showNotification = {
  success: (message: string, description?: string) => {
    if (globalNotificationInstance) {
      globalNotificationInstance.success({
        message,
        description,
      });
    }
  },
  error: (message: string, description?: string) => {
    if (globalNotificationInstance) {
      globalNotificationInstance.error({
        message,
        description,
      });
    }
  },
  warning: (message: string, description?: string) => {
    if (globalNotificationInstance) {
      globalNotificationInstance.warning({
        message,
        description,
      });
    }
  },
  info: (message: string, description?: string) => {
    if (globalNotificationInstance) {
      globalNotificationInstance.info({
        message,
        description,
      });
    }
  },
};
