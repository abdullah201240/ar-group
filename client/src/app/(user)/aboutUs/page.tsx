import React from 'react';
import Image from 'next/image';
import Chairman from '@/app/assets/img/ChairMan.webp';
import Md from '@/app/assets/img/Md.webp';
import MdD from '@/app/assets/img/MdD.webp';


import Navbar from '@/components/user/Navbar';
import Footer from '@/components/user/Footer';
import Whatsapp from '@/components/user/Whatsapp';
import AboutUs from '@/components/user/AboutUs';

export default function page() {
    return (
        <div>
            <Navbar />

            <div className='bg-[#f0f8ff] py-12 sm:py-24 md:py-36'>


                <div className="relative flex flex-col md:flex-row w-full mx-auto max-w-7xl space-x-0 md:space-x-24 rounded-lg overflow-hidden">
                    {/* Image Section */}
                    <div className="relative w-full md:w-2/5 overflow-hidden group">
                    <div className="mt-12 md:mt-0">
                        <Image
                            src={Chairman}
                            alt="Chairman"
                            width={800}
                            height={800}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-3/5 mt-8 md:mt-0 p-4">
                        <h2 className="font-display text-xl font-bold tracking-normal text-[#202020] sm:text-2xl">
                            CHAIRMAN - AR GROUP
                        </h2>

                        <h2 className="mt-4 text-lg text-[#202020] leading-loose max-w-2xl">
                            Tamanna Islam is a visionary leader and entrepreneur serving as the Chairperson of AR Group, a distinguished conglomerate encompassing IQ Architects Ltd, Digirib, and InterioBD. With a commitment to innovation and excellence, Tamanna Islam has successfully guided AR Group in setting new standards in architecture, software development, and interior design.
                            Her leadership is marked by strategic decision-making, fostering a culture of collaboration, and a strong focus on delivering exceptional results. As a driving force behind AR Group’s success, Tamanna Islam combines a deep understanding of business dynamics with a passion for growth and transformation.
                            She is dedicated to empowering teams, nurturing talent, and building sustainable ventures that make a lasting impact on the industries AR Group serves.
                        </h2>
                    </div>
                </div>
            </div>


            <div className='bg-[#f0f8ff] py-12 sm:py-24 md:py-36'>


                <div className="relative flex flex-col md:flex-row w-full mx-auto max-w-7xl space-x-0 md:space-x-24 rounded-lg overflow-hidden">

                    {/* Content Section */}
                    <div className="w-full md:w-3/5 mt-8 md:mt-0 p-4 ">
                        <h2 className="font-display text-xl font-bold tracking-normal text-[#202020] sm:text-2xl">
                            Managing Director - AR Group
                        </h2>

                        <h2 className="mt-4 text-lg text-[#202020] leading-loose max-w-2xl ">
                            Faisal Bin Naim is an accomplished business leader and strategist serving as the Managing Director of AR Group. Under his dynamic leadership, AR Group has excelled across its subsidiaries—IQ Architects Ltd, Digirib, and InterioBD—delivering innovative solutions in architecture, software development, and interior design.
                            With a forward-thinking approach, Faisal Bin Naim has played a pivotal role in driving the group’s growth and diversification. His expertise lies in fostering operational excellence, building strong client relationships, and creating a vision for sustainable success.
                            A passionate advocate for innovation and teamwork, Faisal Bin Naim empowers teams to achieve their full potential while ensuring AR Group remains at the forefront of its industries.
                        </h2>
                    </div>

                    {/* Image Section */}
                    <div className="relative w-full md:w-2/5 overflow-hidden group">
                        <Image
                            src={Md}
                            alt="Md"
                            width={800}
                            height={800}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>


                </div>
            </div>

            <div className='bg-[#f0f8ff] py-12 sm:py-24 md:py-36'>


                <div className="relative flex flex-col md:flex-row w-full mx-auto max-w-7xl space-x-0 md:space-x-24 rounded-lg overflow-hidden">
                    {/* Image Section */}
                    <div className="relative w-full md:w-2/5 overflow-hidden group">
                        <Image
                            src={MdD}
                            alt="Md Digirib"
                            width={800}
                            height={800}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-3/5 mt-8 md:mt-0 p-4">
                        <h2 className="font-display text-xl font-bold tracking-normal text-[#202020] sm:text-2xl">
                            Managing Director - DIGIRIB
                        </h2>

                        <h2 className="mt-4 text-lg text-[#202020] leading-loose max-w-2xl">
                            Masum Faisal is an innovative and results-driven leader serving as the Managing Director of Digirib, a software development company under AR Group. With extensive expertise in technology and business management, Masum Faisal has been instrumental in driving Digirib&apos;s growth and establishing it as a trusted provider of cutting-edge digital solutions.
                            Under his leadership, Digirib has developed a reputation for delivering innovative software, user-centric web and mobile applications, and robust digital transformation strategies. His forward-thinking approach ensures that the company stays ahead in the ever-evolving tech landscape.
                            Masum Faisal is passionate about fostering a collaborative environment that encourages creativity, innovation, and excellence, ensuring Digirib consistently exceeds client expectations and sets new benchmarks in the software industry.
                        </h2>
                    </div>
                </div>
            </div>
            <div className='pb-12 bg-[#f0f8ff]'>
            <AboutUs/>
            </div>
           
           
            <Whatsapp/>
            <Footer/>
        </div>
    );
}
