import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

// custom hook to use socket easily
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // connect to backend
    const s = io(process.env.REACT_APP_BASE_URL_WEB, {
      path: "/socket.io/",
      transports: ["polling", "websocket"], // ✅ allow polling first, then upgrade
      withCredentials: true,
    });

    setSocket(s);

    s.on("connect", () => {});

    s.on("disconnect", () => {});

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
