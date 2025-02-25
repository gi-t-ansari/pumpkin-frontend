import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { extractFirstLetterOfNameAndSurname } from "../../config";

const UserDetailCard = ({ data, closeUserDetails }) => {
  return (
    <div className="basis-[25%] h-full border-l border-[#D9DCE0] bg-white relative flex flex-col items-center p-4">
      <div className="bg-[#6E80A4] h-[135px] w-[135px] rounded-full flex justify-center items-center mt-4">
        <span className="text-white text-3xl">
          {extractFirstLetterOfNameAndSurname(data?.name)}
        </span>
      </div>
      <h5 className="text-base font-semibold mt-3">{data?.name}</h5>
      <div
        className="h-5 w-h-5 absolute top-4 left-4 cursor-pointer"
        onClick={closeUserDetails}
      >
        <IoCloseSharp size={20} />
      </div>
      <p className="text-[#707991] text-sm">{data?.phone}</p>
      <p className="text-[#707991] text-sm">{data?.email}</p>
      <div className="h-[1px] w-full bg-[#D4D4D4] mt-4"></div>
    </div>
  );
};

export default UserDetailCard;
