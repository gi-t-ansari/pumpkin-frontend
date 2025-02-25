import React, { useState } from "react";
import { extractFirstLetterOfNameAndSurname } from "../../config";
import { RiSendPlaneFill } from "react-icons/ri";
import moment from "moment";

import UserDetailCard from "./UserDetailCard";

const Message = ({ data }) => {
  return (
    <div
      className={`w-full flex ${
        data?.sender === "You" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={` min-w-fit max-w-[381px] text-[#011627] py-1 px-3 rounded-xl ${
          data?.sender === "You" ? "bg-[#DEE9FF]" : "bg-white"
        }`}
      >
        <p className="w-full text-wrap text-base">{data?.text}</p>
        <p className="text-right text-xs">
          {moment(data?.timestamp).format("h:mm a")}
        </p>
      </div>
    </div>
  );
};

const MessagesCard = ({ data }) => {
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);

  const openUserDetails = (e) => {
    e.preventDefault();
    setIsUserDetailOpen(true);
  };

  const closeUserDetails = (e) => {
    e.preventDefault();
    setIsUserDetailOpen(false);
  };

  return (
    <div className={`w-full h-full flex`}>
      <section
        className={`${
          isUserDetailOpen ? "basis-[75%]" : "basis-[100%]"
        } h-full flex flex-col`}
      >
        <header
          className="flex w-full h-fit py-2 px-4 border-b border-[#D9DCE0] bg-white items-center gap-x-3 cursor-pointer"
          onClick={openUserDetails}
        >
          <div className="bg-[#6E80A4] h-10 w-10 rounded-full flex justify-center items-center">
            <span className="text-white">
              {extractFirstLetterOfNameAndSurname(data?.name)}
            </span>
          </div>
          <h5 className="text-base font-semibold">{data?.name}</h5>
        </header>
        <section className="flex-1 w-full px-10 flex flex-col justify-end">
          {data?.messages?.map((msg) => (
            <Message data={msg} />
          ))}
        </section>
        <footer className="w-full h-fit px-10 py-2 bg-inherit">
          <div className="relative w-full h-fit">
            <input
              type="text"
              className="w-full bg-[#FFFFFF] py-2 pl-4 pr-12 rounded-xl outline-none placeholder:text-[#707991]"
              placeholder="Message"
            />
            <RiSendPlaneFill
              size={24}
              className="absolute top-2 right-4 rotate-45 text-[#8BABD8]"
            />
          </div>
        </footer>
      </section>
      {isUserDetailOpen && (
        <UserDetailCard data={data} closeUserDetails={closeUserDetails} />
      )}
    </div>
  );
};

export default MessagesCard;
