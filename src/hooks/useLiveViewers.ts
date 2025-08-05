// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";

// let socket: Socket;

// export function useLiveViewers(restaurantId?: string, enabled = true) {
//   const [viewerCount, setViewerCount] = useState(0);

//   useEffect(() => {
//     if (!restaurantId || !enabled) return;

//     socket = io("http://localhost:8080");

//     socket.emit("join-restaurant", restaurantId);

//     socket.on("viewerCount", (count) => {
//       setViewerCount(count);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [restaurantId, enabled]);

//   return viewerCount;
// }
