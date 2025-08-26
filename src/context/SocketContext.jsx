import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

// custom hook to use socket easily
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // connect to backend
    const s = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    setSocket(s);

    s.on("connect", () => {
      console.log("✅ Connected to server :", s.id);
    });

    s.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    });

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
