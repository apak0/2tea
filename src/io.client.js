import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BASE_ENDPOINT);

function SocketIo() {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Listen for incoming notifications
    socket.on("notification", (data) => {
      setNotification(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendNotification = () => {
    // Send notification to other connected users
    socket.emit("notification", "New notification!");
  };

  return (
    <div>
      <h1>Notifications</h1>
      {notification && <p>{notification}</p>}
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
}

export default SocketIo;
