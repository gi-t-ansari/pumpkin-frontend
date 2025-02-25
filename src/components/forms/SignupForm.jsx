import React, { useState } from "react";
import chatLogo from "../../assets/chat-logo.svg";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTCPClient } from "../../services/tcpService";

const SERVER_HOST = "localhost";
const SERVER_PORT = "5000";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [socketClient, setSocketClient] = useState(null);

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
      .required("Phone number is required.")
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits.")
      .matches(/^\d+$/, "Phone number must contain only digits."),
  });

  const {
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const handleSignup = async (data) => {
    setIsLoading(true);
    try {
      console.log("🚀 Signing Up...", data);

      const { sendMessage } = createTCPClient(
        SERVER_HOST,
        SERVER_PORT,
        data.email,
        (message) => console.log("📩 New Message:", message)
      );

      setSocketClient({ sendMessage });

      sendMessage({ type: "signup", user: data });

      reset();
    } catch (error) {
      console.error("Signup Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ffffff] rounded-lg shadow-2xl px-10 py-12"
    >
      <header className="flex justify-center mb-8">
        <img width={135} height={51} src={chatLogo} alt="chat-logo" />
      </header>

      {/* Name Input */}
      <div className="mb-3 w-[400px]">
        <input
          className={`py-3 px-4 rounded-[6px] w-full border ${
            errors?.name
              ? "border-red-500"
              : "border-gray-300 focus:border-[#6E80A4]"
          } outline-none`}
          type="text"
          placeholder="Name"
          {...register("name")}
        />
        {errors?.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email Input */}
      <div className="mb-3 w-[400px]">
        <input
          className={`py-3 px-4 rounded-[6px] w-full border ${
            errors?.email
              ? "border-red-500"
              : "border-gray-300 focus:border-[#6E80A4]"
          } outline-none`}
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors?.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Input */}
      <div className="mb-3 w-[400px]">
        <input
          className={`py-3 px-4 rounded-[6px] w-full border ${
            errors?.phone
              ? "border-red-500"
              : "border-gray-300 focus:border-[#6E80A4]"
          } outline-none`}
          type="text"
          placeholder="Phone Number"
          {...register("phone")}
        />
        {errors?.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={
          isLoading || !watch("name") || !watch("email") || !watch("phone")
        }
        className={`w-full text-white rounded-[6px] py-[13px] mt-1 ${
          watch("name") && watch("email") && watch("phone")
            ? "bg-[#6E80A4] cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
