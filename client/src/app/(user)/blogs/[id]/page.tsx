"use client";

import Navbar from "@/components/user/Navbar"; // Fixed typo in import path (Nabvar -> Navbar)
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/user/Footer";
import Whatsapp from "@/components/user/Whatsapp";

interface Blog {
    title: string;
    image: string;
    description: string;
}

export default function Page() {
    const params = useParams();
    const id = params?.id;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Added loading state

    useEffect(() => {
        if (id) {
            setLoading(true); // Set loading to true when fetching

            fetch(`${process.env.NEXT_PUBLIC_API_URL_INTERIO}blog/blogs/${id}`) // Corrected endpoint path (services instead of servives)
                .then((response) => response.json())
                .then((data) => {
                    const { blogTitle, blogDescription, image } = data.blog;
                    setBlog({ title: blogTitle, image, description: blogDescription });
                    setLoading(false); // Set loading to false when data is fetched
                })
                .catch((error) => {
                    console.error("Error fetching service data:", error);
                    setLoading(false); // Handle loading state on error
                });
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#f0f8ff]">
        <div className="spinner-border animate-spin text-indigo-600" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
        );
    }

    return (
        <div className="bg-[#f0f8ff] ">
            <Navbar />
            
            <div className="flex justify-center items-center py-48 bg-[#f0f8ff]">
                {blog?.image && (
                    <div className="relative w-100 h-64">
                        <p className="text-black">{`${process.env.NEXT_PUBLIC_API_URL_INTERIO_IMAGE}${blog?.image}`}</p>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL_INTERIO_IMAGE}${blog?.image}`}
                            alt="image"
                            layout="fill"
                            objectFit="cover"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/webp;base64,..."
                        />
                    </div>
                )}
            </div>
            <div className="bg-[#f0f8ff]  px-6 lg:pl-26 ">
                <div className="max-w-7xl mx-auto text-left">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {blog?.title}
                    </h2>
                    <div
                        className="text-lg text-gray-600 leading-relaxed mb-16"
                        dangerouslySetInnerHTML={{ __html: blog?.description || "No description available" }}
                    />
                </div>
            </div>

            <Footer />
            <Whatsapp />
        </div>
    );
}
