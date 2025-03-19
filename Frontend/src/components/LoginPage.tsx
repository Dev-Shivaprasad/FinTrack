import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "motion/react";
import axios from "axios";
import Button from "./Button";

type FormData = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const endpoint = isLogin ? "/api/login" : "/api/register";
      const response = await axios.post(endpoint, data);
      alert(response.data.message);
    } catch (error: any) {
      alert(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-secondary p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-text p-8 rounded-lg shadow-lg w-full sm:w-96"
      >
        <h2 className="text-2xl font-bold text-accent mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-primary">Username</label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-primary active:ring-primary"
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary active:ring-primary"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter password"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {!isLogin && (
            <div className="mb-4 relative">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}
          <Button
            title={isLogin ? "Login" : "Register"}
            className="text-text w-full"
          />
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="text-green-600 font-semibold ml-1 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
