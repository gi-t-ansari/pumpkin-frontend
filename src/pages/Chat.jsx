import React from "react";
import chatLogo from "../assets/chat-logo.svg";
import { IoSearchOutline } from "react-icons/io5";
import { DUMMY_CHAT_DATA } from "../config";
import { ChatCard } from "../components";

const Chat = () => {
  const handleSearch = (e) => {};

  return (
    <div className="h-screen w-screen bg-[#8BABD8] p-10">
      <div className="w-full h-full  bg-white flex ">
        <section className="bg-white h-full basis-[25%] p-4 flex flex-col">
          {/**--------------------- LOGO ------------------- */}
          <header className="h-fit w-full mb-2">
            <img
              height={"42px"}
              width={"112px"}
              src={chatLogo}
              alt="chat-logo"
            />
          </header>
          {/**--------------------- SEARCH ------------------- */}
          <div className="w-full h-fit relative bg-[#F5F5F5] rounded-[22px] overflow-hidden my-2">
            <input
              className="py-2 px-4 pl-10 w-full h-fit outline-none placeholder:text-[#707991]"
              type="search"
              placeholder="Search"
              onChange={handleSearch}
            />
            <IoSearchOutline
              size={18.5}
              className="absolute left-4 top-3 text-[#707991]"
            />
          </div>
          {/**--------------------- CHAT CARDS ------------------- */}
          <div className="flex-1 w-full">
            {DUMMY_CHAT_DATA.map((user) => (
              <ChatCard data={user} />
            ))}
          </div>
        </section>
        <section className="bg-[#f6f6f6] basis-[75%] h-full">
          Section - 2
        </section>
      </div>
    </div>
  );
};

export default Chat;
