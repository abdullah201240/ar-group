'use client';
import Footer from '@/components/user/Footer';
import Navbar from '@/components/user/Navbar';
import Whatsapp from '@/components/user/Whatsapp';
import Image from 'next/image';
import IQBD from '@/app/assets/img/IQBD.webp';
import Interio from '@/app/assets/img/Interio.webp';
import Digirib from '@/app/assets/img/Digirib(1).png';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Data {
    description: string;
    description1: string;
    description2: string;
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/company/1`);
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
        return <div>Loading...</div>;
    }

    if (!apiData || !apiData.data) {
        return <div>Error loading data</div>;
    }

    const {
        description,
        description1,
        description2,
    } = apiData.data;

    const companies = [
        {
            name: 'IQ Architects Ltd',
            description,
            imageSrc: IQBD,
            website: 'https://iq-bd.com/',
        },
        {
            name: 'InterioBD',
            description: description1,
            imageSrc: Interio,
            website: 'https://interiobd.com/',
        },
        {
            name: 'Digirib',
            description: description2,
            imageSrc: Digirib,
            website: 'https://digirib.com/',
        },
    ];

    return (
        <>
            <Navbar />
            <div className="py-24 bg-[#f0f8ff]">
                {companies.map((company, index) => (
                    <div key={index} className="bg-[#f0f8ff] py-12">
                        <div className="relative flex flex-col md:flex-row w-full mx-auto max-w-6xl space-x-0 md:space-x-16 rounded-lg overflow-hidden">
                            <div className="relative w-full md:w-1/5 overflow-hidden group mt-8">
                                <Image
                                    src={company.imageSrc}
                                    alt={company.name}
                                    width={800}
                                    height={800}
                                    className="w-3/5 mx-auto h-auto object-cover transition-transform duration-500 group-hover:scale-110 md:w-full"
                                />
                            </div>
                            <div className="w-full md:w-4/5 mt-8 md:mt-0 p-4">
                                <h2 className="mt-4 text-lg text-[#202020] leading-loose max-w-4xl">
                                    
                                    
                                    {company.description}
                                </h2>
                                <div className="text-black mt-8">
                                    <Link href={company.website}>
                                        <button
                                            className="bg-gradient-to-r from-[#01600C] to-[#489567] text-white 
                                                hover:border-[#489567] dark:hover:border-[#01600C] 
                                                hover:bg-gradient-to-r hover:from-[#01600C] hover:to-[#489567] 
                                                dark:text-white 
                                                transition-all duration-300 ease-in-out transform hover:scale-105 
                                                px-6 py-2 rounded-full focus:outline-none"
                                        >
                                            {new URL(company.website).hostname}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Whatsapp />
            <Footer />
        </>
    );
}
