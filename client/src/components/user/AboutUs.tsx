'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface Data {

    ourStory: string;
    mission: string;
    vision: string;
    ourStoryImage: string;
}

interface ApiResponse {
    message: string;
    data: Data;
}


export default function AboutUs() {
    const [apiData, setApiData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/about/1`); // Replace with your API endpoint
                const result = await response.json();
                setApiData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (!apiData || !apiData.data) {
        return <div>Error loading data</div>; // Handle error state
    }

    const {
        ourStory,
        mission,
        vision,
        ourStoryImage,

    } = apiData.data;
    return (
        <div>
            <section className="bg-[#f0f8ff] py-12 relative px-4 sm:px-8">
                {/* Background Heading */}

                <h1 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-[20vw] sm:text-7xl md:text-9xl font-bold text-[#E6F3FB] opacity-1 z-0">
                    ABOUT US
                </h1>

                {/* Main Heading */}
                <div className="text-center relative z-10">
                    <h2 className="text-2xl sm:text-4xl font-semibold text-[#202020] mt-2">OUR STORY</h2>
                </div>

                <div className="relative flex flex-col md:flex-row w-full mx-auto max-w-7xl mt-12 md:mt-24 rounded-lg overflow-hidden">
                    {/* Image Section */}
                    <div className="relative md:w-1/2 overflow-hidden group">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}${ourStoryImage}`}
                            alt="Why Digirib"
                            width={800}
                            height={800}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
                        <div className="border-b border-[#C7C7C7] mb-4">
                            <p className="text-black leading-loose text-lg mb-4">

                                {ourStory}

                            </p>
                        </div>
                        <div className="mt-6">
                            <h1 className="text-[#EA5A28] text-xl sm:text-3xl font-bold">OUR MISSION</h1>
                            <p className="text-black mt-2 lleading-loose text-lg">
                                {mission}
                            </p>
                        </div>
                        <div className="mt-6">
                            <h1 className="text-[#EA5A28] text-xl sm:text-3xl font-bold">OUR VISION</h1>
                            <p className="text-black mt-2 leading-loose  text-lg">
                                {vision}                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
