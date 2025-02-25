let socket = null; // Define socket globally

export const createTCPClient = (
  serverHost,
  serverPort,
  userId,
  onMessageReceived
) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.warn("WebSocket is already open.");
    return { sendMessage, disconnect };
  }

  socket = new WebSocket(`ws://${serverHost}:${serverPort}`);

  socket.onopen = () => {
    console.log("✅ Connected to TCP server");
    socket.send(JSON.stringify({ senderId: userId, type: "online" }));
  };

  socket.onmessage = (event) => {
    if (onMessageReceived) {
      onMessageReceived(JSON.parse(event.data));
    }
  };

  socket.onerror = (error) => console.error("❌ WebSocket Error:", error);

  socket.onclose = () => {
    console.warn("⚠️ Disconnected from TCP server");
  };

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.error("🚨 WebSocket not open. Cannot send message.");
    }
  };

  const disconnect = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    } else {
      console.warn("⚠️ WebSocket already closed or not open.");
    }
  };

  return { sendMessage, disconnect };
};
