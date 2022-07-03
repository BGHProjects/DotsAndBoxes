import React, { createContext, useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { IPAdd } from "../consts/types";

export const SocketContext = createContext<any>({});

interface SocketContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const SocketContextProvider = ({
  children,
}: SocketContextProviderProps) => {
  const socketRef = useRef<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >();

  const [socket, setSocket] = useState();

  //   useEffect(() => {
  //     console.log("\n\tsocket in the context", socket);
  //   }, [socket]);

  useEffect(() => {
    socketRef.current = io(IPAdd);

    if (socketRef.current) setSocket(socketRef);

    // return () => {
    //   socketRef?.current?.disconnect();
    // };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
