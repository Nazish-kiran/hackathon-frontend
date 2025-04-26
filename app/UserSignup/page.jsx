"use client";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserDataContext } from "../Context/UserContext.jsx";

export default function page() {
  const [theme, setTheme] = useState("light");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { User, setUser } = React.useContext(UserDataContext);
  const router = useRouter();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
      firstname: firstName,
      lastname: lastName,
    };

    console.log("Sending user:", newUser);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        console.log("User registered:", response.data.user);
        router.push("/Home");
      }
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.log("Error during registration:", error.response?.data || error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-300">
      <div className="absolute top-4 right-4"></div>
      <button
        onClick={handleThemeToggle}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
      >
        {theme === "light" ? (
          <MoonIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        ) : (
          <SunIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        )}
      </button>

      <div className="w-full max-w-md p-8 space-y-6 dark-bg-zinc-900 rounded-lg shadow-md transition-colors duration-300">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-3 mb-4">
            <div className="mb-0">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm outline-none transition-all duration-300 px-2 py-2"
                required
              />
            </div>

            {/* Last Name */}
            <div className="mb-0">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm outline-none transition-all duration-300 px-2 py-2"
                required
              />
            </div>
          </div>
          {/* First Name */}

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm outline-none transition-all duration-300 px-2 py-2"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm outline-none transition-all duration-300 px-2 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 font-semibold cursor-pointer mt-[30px]"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm transition-colors duration-300 text-white">
            Already have an account?{" "}
            <Link
              href="/UserLogin"
              className="text-sm font-semibold text-blue-500 hover:text-blue-400 text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
