"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Blog {
    id: number;
    title: string;
    description: string;
    image: string;
}

export default function Blog() {
    const [blog, setBlog] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL_IQ}user/viewBlog`
                );
                const result = await response.json();
                setBlog(result.data || []);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        fetchBlogs();
    }, []);
    const getTextFromHTML = (html: string): string => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        return tempElement.textContent || tempElement.innerText || "";
    };

    // Display the last 3 blogs
    const latestBlogs = blog.slice(-3);

    return (

        <div className="bg-[#f0f8ff] py-12 relative px-4 sm:px-8" >
            <h1 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-[20vw] sm:text-7xl md:text-9xl font-bold text-[#E6F3FB] opacity-1 z-0">
                BLOG
            </h1>

            {/* Main Heading */}
            <div className="text-center relative z-10">
                <h2 className="text-2xl sm:text-4xl font-semibold text-[#202020] mt-2">BLOG</h2>
            </div>

            <div className="flex justify-center mx-auto max-w-7xl mt-16">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-4">
                    {latestBlogs.map((member) => (
                        <div
                            key={member.id}
                            className="bg-white  rounded-lg shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105"
                        >
                            <Link href={`https://iq-bd.com/blogs/${member.id}`}>

                                <Image
                                    className="w-full h-56 object-cover "
                                    src={`${process.env.NEXT_PUBLIC_API_URL_IQ}${member.image}`}
                                    alt={member.title}
                                    width={500}
                                    height={300}
                                />

                                <div className="space-y-4  p-6">
                                    <div className="font-bold text-2xl text-gray-800">{member.title}</div>
                                    <p className="text-gray-600 text-base line-clamp-3">
                                        {getTextFromHTML(member.description).slice(0, 100)}...
                                    </p>
                                </div>
                                <button
                                    className="text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition duration-300 ease-in-out pl-6 pb-6"
                                >
                                    Read More →
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center mt-16">
                <Link href="/blog">
                    <button
                        className="bg-gradient-to-r from-[#01600C] to-[#489567] text-white 
            hover:border-[#489567] dark:hover:border-[#01600C] 
            hover:bg-gradient-to-r hover:from-[#01600C] hover:to-[#489567] 
             dark:text-white 
            transition-all duration-300 ease-in-out transform hover:scale-105 
            px-6 py-2 rounded-full focus:outline-none">
                        See All Blog
                    </button>
                </Link>
            </div>

        </div>
    );
}
