import React, { useState } from "react";
import chatLogo from "../assets/chat-logo.svg";
import { IoSearchOutline } from "react-icons/io5";
import { DUMMY_CHAT_DATA } from "../config";
import { ChatCard, MessagesCard } from "../components";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState("1");

  const handleSearch = (e) => {};

  return (
    <div className="h-screen w-screen bg-[#8BABD8] p-10">
      <div className="w-full h-full  bg-white flex ">
        <section className="bg-white h-full basis-[25%] py-4 flex flex-col border-r border-[#D9DCE0]">
          {/**--------------------- LOGO ------------------- */}
          <header className="h-fit w-full mb-2 pl-4">
            <img
              height={"42px"}
              width={"112px"}
              src={chatLogo}
              alt="chat-logo"
            />
          </header>
          {/**--------------------- SEARCH ------------------- */}
          <div className="w-full h-fit px-4">
            <div className="w-full h-fit relative bg-[#F5F5F5] rounded-[22px] overflow-hidden my-2 ">
              <input
                className="py-2 pr-4 pl-10 h-fit outline-none placeholder:text-[#707991]"
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

          {/**--------------------- CHAT CARDS ------------------- */}
          <div className="flex-1 w-full mt-2">
            {DUMMY_CHAT_DATA.map((user) => (
              <ChatCard
                data={user}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
            ))}
          </div>
        </section>
        <section className="bg-[#f6f6f6] basis-[75%] h-full">
          <MessagesCard
            data={DUMMY_CHAT_DATA.find((item) => item?._id === selectedChat)}
          />
        </section>
      </div>
    </div>
  );
};

export default Chat;
