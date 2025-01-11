"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    massage: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          phone: "",
          massage: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "Something went wrong!"}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred!");
      }

    }
  };

  return (
    <div className="bg-[#f0f8ff] py-48 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto  rounded-xl  sm:flex">
        {/* Left Section - Form */}
        <div className="sm:w-1/2 p-5 sm:p-10">
          <h3 className="text-black text-sm font-bold">Send Us Email</h3>
          <h2 className="mt-2 text-4xl text-black font-bold">Feel free to write</h2>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter Subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <textarea
              name="massage"
              value={formData.massage}
              onChange={handleChange}
              placeholder="Enter Message"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 h-28"
            ></textarea>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#01600C] to-[#489567] text-white 
            hover:border-[#489567] dark:hover:border-[#01600C] 
            hover:bg-gradient-to-r hover:from-[#01600C] hover:to-[#489567] 
             dark:text-white 
            transition-all duration-300 ease-in-out transform hover:scale-105 
            px-6 py-2 rounded-full focus:outline-none">
              Send Message
            </button>

          </form>
        </div>

        {/* Right Section - Contact Info */}
        <div className="sm:w-1/2 p-5 sm:p-10 flex flex-col justify-center">
          <h3 className="text-black text-sm font-bold">Need Any Help?</h3>
          <h2 className="mt-2 text-4xl text-black font-bold">Get in touch with us</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            We’re here to assist you! Whether you have inquiries about our services, need support, or want to explore business opportunities with us, we’d love to hear from you.
          </p>
          <ul className="mt-6 space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="text-orange-500 mr-3">📍</span>
              Office address: House-141, Road-01, Baridhara DOHS, Dhaka
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-3">✉️</span>
              Email: info@iq-bd.com
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-3">📞</span>
              Phone: (+880) 184-1004000
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-3">📞</span>
              Phone: (+880) 161-8004000
            </li>
          </ul>
        </div>
      </div>


    </div>
  );
}
