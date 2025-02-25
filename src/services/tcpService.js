export const createTCPClient = (
  serverHost,
  serverPort,
  userId,
  onMessageReceived
) => {
  const socket = new WebSocket(`ws://${serverHost}:${serverPort}`);

  socket.onopen = () => {
    console.log("Connected to TCP server");
    socket.send(JSON.stringify({ senderId: userId, type: "online" }));
  };

  socket.onmessage = (event) => {
    if (onMessageReceived) {
      onMessageReceived(JSON.parse(event.data));
    }
  };

  socket.onerror = (error) => console.error("WebSocket Error:", error);

  socket.onclose = () => console.log("Disconnected from TCP server");

  const sendMessage = (message) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket not open. Cannot send message.");
    }
  };

  const disconnect = () => {
    socket.send(JSON.stringify({ senderId: userId, type: "offline" }));
    socket.close();
  };

  return { sendMessage, disconnect };
};
