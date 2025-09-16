"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://bed-nodejs.onrender.com/api/users", {
        ...formData,
        age: Number(formData.age),
      });
      setMessage(res.data.message || "User registered successfully!");
      setFormData({ name: "", email: "", age: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-red-100">
      <div className="bg-black p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">User Registration</h1>

        {message && (
          <p className="mb-4 text-center text-sm text-green-600">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
