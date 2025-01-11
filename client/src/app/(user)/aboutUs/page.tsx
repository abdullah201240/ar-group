'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/user/Navbar';
import Footer from '@/components/user/Footer';
import Whatsapp from '@/components/user/Whatsapp';
import AboutUs from '@/components/user/AboutUs';

interface Data {
    chairmanDescription: string;
    chairmanImage: string;
    mdDescription: string;
    mdImage: string;
    mdDigiribDescription: string;
    mdDigiribImage: string;
    ourStory: string;
    mission: string;
    vision: string;
    ourStoryImage: string;
}

interface ApiResponse {
    message: string;
    data: Data;
}

export default function Page() {
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
        chairmanDescription,
        chairmanImage,
        mdDescription,
        mdImage,
        mdDigiribDescription,
        mdDigiribImage,

    } = apiData.data;

    return (
        <div>
            <Navbar />

            <div className='bg-[#f0f8ff] py-12 sm:py-24 md:py-36'>
                <div className="relative flex flex-col md:flex-row w-full mx-auto max-w-7xl space-x-0 md:space-x-24 rounded-lg overflow-hidden">
                    <div className="relative w-full md:w-2/5 overflow-hidden group">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}${chairmanImage}`}
                            alt="Chairman"
                            width={800}
                            height={800}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>

                    <div className="w-full md:w-3/5 mt-8 md:mt-0 p-4">
                        <h2 className="font-display text-xl font-bold tracking-normal text-[#202020] sm:text-2xl">
                            CHAIRMAN - AR GROUP
                        </h2>
                        <p className="mt-4 text-lg text-[#202020] leading-loose max-w-2xl">
                            {chairmanDescription}
                        </p>
                    </div>
                </div>
            </div>

            <div className='bg-[#f0f8ff] py-12 sm:py-24 md:py-36'>
                <div className="relative flex flex-col md:flex-row w-full mx-auto max-w-7xl space-x-0 md:space-x-24 rounded-lg overflow-hidden">
                    <div className="w-full md:w-3/5 mt-8 md:mt-0 p-4">
                        <h2 className="font-display text-xl font-bold tracking-normal text-[#202020] sm:text-2xl">
                            Managing Director - AR Group
                        </h2>
                        <p className="mt-4 text-lg text-[#202020] leading-loose max-w-2xl">
                            {mdDescription}
                        </p>
                    </div>

                    <div className="relative w-full md:w-2/5 overflow-hidden group">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}${mdImage}`}

                            alt="Managing Director"
                            width={800}
                            height={800}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                </div>
            </div>

            <div className='bg-[#f0f8ff] py-12 sm:py-24 md:py-36'>
                <div className="relative flex flex-col md:flex-row w-full mx-auto max-w-7xl space-x-0 md:space-x-24 rounded-lg overflow-hidden">
                    <div className="relative w-full md:w-2/5 overflow-hidden group">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}${mdDigiribImage}`}

                            alt="Managing Director Digirib"
                            width={800}
                            height={800}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>

                    <div className="w-full md:w-3/5 mt-8 md:mt-0 p-4">
                        <h2 className="font-display text-xl font-bold tracking-normal text-[#202020] sm:text-2xl">
                            Managing Director - DIGIRIB
                        </h2>
                        <p className="mt-4 text-lg text-[#202020] leading-loose max-w-2xl">
                            {mdDigiribDescription}
                        </p>
                    </div>
                </div>
            </div>

            <div className='pb-12 bg-[#f0f8ff]'>
                <AboutUs />
            </div>

            <Whatsapp />
            <Footer />
        </div>
    );
}
