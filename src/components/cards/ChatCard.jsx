import moment from "moment";
import React from "react";
import { extractFirstLetterOfNameAndSurname } from "../../config";

const ChatCard = ({ data, setSelectedChat, selectedChat }) => {
  const handleOpenMessages = (e) => {
    e.preventDefault();
    setSelectedChat(data?._id);
  };

  return (
    <div
      className={`flex gap-x-3 w-full h-fit py-2 px-4 cursor-pointer  ${
        selectedChat === data?._id
          ? "bg-[#F5F5F5]"
          : "bg-inherit hover:bg-[#f5f5f599]"
      } transition-all duration-300 ease-linear`}
      onClick={handleOpenMessages}
    >
      <div className="bg-[#6E80A4] h-12 w-12 rounded-full flex justify-center items-center">
        <span className="text-white ">
          {extractFirstLetterOfNameAndSurname(data?.name)}
        </span>
      </div>
      <div className="flex-1 flex justify-between ">
        <div>
          <h5 className="text-base font-semibold">{data?.name}</h5>
          <p className="text-sm text-[#707991] font-normal">
            {data?.lastMessage}
          </p>
        </div>
        <div>
          <span className="text-xs text-[#707991]">
            {moment(data?.lastMessageDate).format("h:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
