import React, { useState, useMemo, useEffect } from "react";
import chatLogo from "../assets/chat-logo.svg";
import { IoSearchOutline } from "react-icons/io5";
import { DUMMY_CHAT_DATA } from "../config";
import { ChatCard, MessagesCard } from "../components";
import { createTCPClient } from "../services/tcpService";
import { getOnlineUsers } from "../config/api";

const SERVER_HOST = "localhost";
const SERVER_PORT = "5000";

const Chat = ({ userId, token }) => {
  const [selectedChat, setSelectedChat] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  let tcpClient = null;

  useEffect(() => {
    tcpClient = createTCPClient(
      SERVER_HOST,
      SERVER_PORT,
      userId,
      (newMessage) => {
        setChatMessages((prevChat) => [...prevChat, newMessage]);
      }
    );

    const fetchOnlineUsers = async () => {
      const users = await getOnlineUsers(token);
      setOnlineUsers(users);
    };

    fetchOnlineUsers();
    const interval = setInterval(fetchOnlineUsers, 5000);

    return () => {
      clearInterval(interval);
      tcpClient.disconnect();
    };
  }, [userId, token]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredChatData = useMemo(() => {
    return DUMMY_CHAT_DATA.filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchQuery) ||
        chat.lastMessage.toLowerCase().includes(searchQuery)
    );
  }, [searchQuery]);

  return (
    <div className="h-screen w-screen bg-[#8BABD8] p-10">
      <div className="w-full h-full bg-white flex">
        <section className="bg-white h-full basis-[25%] py-4 flex flex-col border-r border-[#D9DCE0]">
          <header className="h-fit w-full mb-2 pl-4">
            <img
              height={"42px"}
              width={"112px"}
              src={chatLogo}
              alt="chat-logo"
            />
          </header>

          <div className="w-full h-fit px-4">
            <div className="w-full h-fit relative bg-[#F5F5F5] rounded-[22px] overflow-hidden my-2">
              <input
                className="py-2 pr-4 pl-10 w-full h-fit outline-none placeholder:text-[#707991]"
                type="search"
                placeholder="Search"
                onChange={handleSearch}
              />
              <IoSearchOutline
                size={18.5}
                className="absolute left-4 top-3 text-[#707991]"
              />
            </div>
          </div>

          <div className="flex-1 w-full mt-2">
            {filteredChatData.length > 0 ? (
              filteredChatData.map((user) => (
                <ChatCard
                  key={user._id}
                  data={user}
                  selectedChat={selectedChat}
                  setSelectedChat={setSelectedChat}
                />
              ))
            ) : (
              <p className="text-center text-[#707991]">No chats found</p>
            )}
          </div>
        </section>

        <section className="bg-[#f6f6f6] basis-[75%] h-full">
          <MessagesCard
            data={DUMMY_CHAT_DATA.find((item) => item?._id === selectedChat)}
            chatMessages={chatMessages}
          />
        </section>
      </div>
    </div>
  );
};

export default Chat;
