import React, { useState } from "react";
import chatLogo from "../../assets/chat-logo.svg";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required.")
      .matches(/^[A-Za-z\s]+$/, "Name can only contain alphabets and spaces.")
      .min(3, "Name must be at least 3 characters.")
      .max(50, "Name must not exceed 50 characters."),
    email: yup
      .string()
      .required("Email is required.")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email"),
    phone: yup
      .string()
      .required("Number if required.")
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits.")
      .matches(/^\d+$/, "Phone number must contain only digits."),
  });

  const {
    handleSubmit,
    reset,
    watch,
    getValues,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const handleSignup = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Form Data --> ", data);
      reset();
      setIsLoading(false);
    }, 3000);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ffffff] rounded-lg shadow-2xl px-7 py-12"
    >
      <header className="flex justify-center mb-8">
        <img width={135} height={51} src={chatLogo} alt="chat-logo" />
      </header>
      <div className="mb-3 w-fit h-fit">
        <div className="w-fit h-fit">
          <input
            className={`py-3 px-4 rounded-[6px] min-w-[400px] border ${
              errors?.name
                ? "border-red-500"
                : "border-[#DFE4EA] focus:border-[#6E80A4]"
            } placeholder:text-[#9CA3AF]   outline-none transition-all duration-300 ease-linear`}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
        </div>
        {errors?.name && (
          <p className="text-xs text-red-500">{errors?.name?.message}</p>
        )}
      </div>
      <div className="mb-3 w-fit h-fit">
        <div className="w-fit h-fit">
          <input
            className={`py-3 px-4 rounded-[6px] min-w-[400px] border ${
              errors?.email
                ? "border-red-500"
                : "border-[#DFE4EA] focus:border-[#6E80A4]"
            } placeholder:text-[#9CA3AF]   outline-none transition-all duration-300 ease-linear`}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
        </div>
        {errors?.email && (
          <p className="text-xs text-red-500">{errors?.email?.message}</p>
        )}
      </div>
      <div className="mb-3 w-fit h-fit">
        <div className="w-fit h-fit">
          <input
            className={`py-3 px-4 rounded-[6px] min-w-[400px] border ${
              errors?.phone
                ? "border-red-500"
                : "border-[#DFE4EA] focus:border-[#6E80A4]"
            } placeholder:text-[#9CA3AF]   outline-none transition-all duration-300 ease-linear`}
            type="text"
            placeholder="Number"
            {...register("phone")}
          />
        </div>
        {errors?.phone && (
          <p className="text-xs text-red-500">{errors?.phone?.message}</p>
        )}
      </div>
      <button
        disabled={isLoading}
        className={`w-full  text-white rounded-[6px] py-[13px] mt-1 ${
          isLoading || (watch("name") && watch("email") && watch("phone"))
            ? "bg-[#6E80A4] cursor-pointer"
            : "bg-[#DFE4EA] cursor-not-allowed"
        }`}
      >
        {isLoading ? "Signing Up" : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
