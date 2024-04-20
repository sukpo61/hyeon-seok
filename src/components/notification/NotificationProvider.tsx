import { FC } from "react";
import { ReactNode } from "react";
import useNotification from "@hooks/useNotification";

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: FC<NotificationProviderProps> = ({
  children,
}) => {
  useNotification();
  return <>{children}</>;
};
