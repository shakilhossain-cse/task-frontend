import React, { createContext, useState, useEffect } from "react";
import { IReaction } from "../../interfaces/type";
import { useQuery } from "@tanstack/react-query";
import { getAllReaction } from "../../api/reactionApi";
import { getNotification } from "../../api/notificationApi";

interface AppContextType {
  reactions: IReaction[];
  notifications: any[];
}

const initialAppContext: AppContextType = {
  reactions: [],
  notifications: [],
};

const AppContext = createContext<AppContextType>(
  initialAppContext
);

const AppProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [notifications, setNotification] = useState<any[]>([]);
  const [reactions, setReactions] = useState<IReaction[]>([]);
  const { data: notificationData, status: notificationStatus } = useQuery({
    queryKey: ["getNotification"],
    queryFn: getNotification,
  });

  const { data: reactionsData, status: reactionStatus } = useQuery({
    queryKey: ["getAllReactions"],
    queryFn: getAllReaction,
  });

  useEffect(() => {
    if (reactionStatus === "success") {
      setReactions(reactionsData);
    }
    if (notificationStatus === "success") {
      setNotification(notificationData);
    }
  }, [reactionsData, reactionStatus, notificationData, notificationStatus]);

  const contextValue: AppContextType = {
    reactions,
    notifications,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useApp = () => React.useContext(AppContext);
export default AppProvider;
