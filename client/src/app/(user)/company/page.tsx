import Footer from '@/components/user/Footer';
import Navbar from '@/components/user/Navbar';
import Whatsapp from '@/components/user/Whatsapp';
import Image from 'next/image';
import IQBD from '@/app/assets/img/IQBD.webp';
import Interio from '@/app/assets/img/Interio.webp';
import Digirib from '@/app/assets/img/Digirib(1).png';
import Link from 'next/link';
import React from 'react';

export default function Page() {
    const companies = [
        {
            name: 'IQ Architects Ltd',
            description: 'IQ Architects Ltd is a leading architecture firm dedicated to creating innovative and sustainable designs. Specializing in residential, commercial, and industrial projects, the company blends creativity with functionality to deliver exceptional spaces. With a team of experienced architects and designers, IQ Architects Ltd focuses on understanding client needs and translating them into architectural masterpieces that redefine modern living and working environments.',
            imageSrc: IQBD,
            website: 'https://iq-bd.com/',
        },
        {
            name: 'InterioBD',
            description: 'InterioBD is a premier interior design and decor company specializing in delivering stylish and functional interiors. Offering a wide range of products and services, including furniture, decor items, and complete interior solutions, InterioBD combines aesthetics with practicality to create spaces that reflect individuality. Whether for homes, offices, or commercial spaces, the company is dedicated to transforming visions into reality with unmatched attention to detail.',
            imageSrc: Interio,
            website: 'https://interiobd.com/',
        },
        {
            name: 'Digirib',
            description: 'Digirib is a software development company committed to providing cutting-edge digital solutions for businesses across various industries. From custom software development to web and mobile application design, Digirib leverages advanced technologies to enhance productivity and streamline operations. With a focus on user-centric design and robust development processes, the company ensures scalable and reliable solutions tailored to client needs.',
            imageSrc: Digirib,
            website: 'https://digirib.com/',
        },
    ];

    return (
        <div>
            <Navbar />
            <div className='py-24 bg-[#f0f8ff]' >




                {companies.map((company, index) => (
                    <div key={index} className='bg-[#f0f8ff] py-12 '>
                        <div className="relative flex flex-col md:flex-row w-full mx-auto max-w-6xl space-x-0 md:space-x-16 rounded-lg overflow-hidden">
                            {/* Image Section */}
                            <div className="relative w-full md:w-1/5 overflow-hidden group mt-8">
                                <div className=" md:mt-0">
                                    <Image
                                        src={company.imageSrc}
                                        alt={company.name}
                                        width={800}
                                        height={800}
                                        className="w-3/5 mx-auto h-auto object-cover transition-transform duration-500 group-hover:scale-110 md:w-full"
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-4/5 mt-8 md:mt-0 p-4">
                                <h2 className="mt-4 text-lg text-[#202020] leading-loose max-w-4xl">
                                    {company.description}
                                </h2>
                                <div className='text-black mt-8'>
                                    <Link href={company.website}>
                                        <button
                                            className="bg-gradient-to-r from-[#01600C] to-[#489567] text-white   
            hover:border-[#489567] dark:hover:border-[#01600C] 
            hover:bg-gradient-to-r hover:from-[#01600C] hover:to-[#489567] 
             dark:text-white 
            transition-all duration-300 ease-in-out transform hover:scale-105 
            px-6 py-2 rounded-full focus:outline-none">
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
        </div>
    );
}
