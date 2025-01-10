'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LuMapPin } from "react-icons/lu";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BsBriefcase } from "react-icons/bs";

interface Job {
  id: number;
  position: string;
  location: string;
  experience: string;
  salary: string;
  deadline: string;
  jobTitle: string;
  jobLocation: string;
  applicationDeadline : string;
}
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

// Function to check if the date has passed
const isDateOver = (dateString: string): boolean => {
  const today = new Date();
  const targetDate = new Date(dateString);
  return targetDate < today; // Returns true if the date has passed
};
export default function JobList() {
  const [jobListIQ, setJobListIQ] = useState<Job[]>([]); // State to hold the job list
  
  const [jobListDIGIRIB, setJobListDIGIRIB] = useState<Job[]>([]); // State to hold the job list

  const [jobListINTERIO, setJobListINTERIO] = useState<Job[]>([]); // State to hold the job list


  
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const [loading1, setLoading1] = useState<boolean>(true); // Loading state
  const [error1, setError1] = useState<string | null>(null); // Error state
  const [loading2, setLoading2] = useState<boolean>(true); // Loading state
  const [error2, setError2] = useState<string | null>(null); // Error state


  // Fetch job list from the API
  useEffect(() => {
    const fetchJobsIQ = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_IQ}user/job`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const jsonResponse = await response.json();
        const data: Job[] = jsonResponse.data;
        setJobListIQ(data); // Update state with job list
      } catch (err) {
        setError((err as Error).message); // Handle errors
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchJobsIQ();


    const fetchJobsDigirib = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_DIGIRIB}user/job`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const jsonResponse = await response.json();
        const data: Job[] = jsonResponse.data;
        setJobListDIGIRIB(data); // Update state with job list
      } catch (err) {
        setError1((err as Error).message); // Handle errors
      } finally {
        setLoading1(false); // Stop loading spinner
      }
    };

    fetchJobsDigirib();


    const fetchJobsInterio = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_INTERIO}/user/jobs`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const jsonResponse = await response.json();
        const data: Job[] = jsonResponse;
        setJobListINTERIO(data); // Update state with job list
      } catch (err) {
        setError2((err as Error).message); // Handle errors
      } finally {
        setLoading2(false); // Stop loading spinner
      }
    };

    fetchJobsInterio();

  }, []);


  return (
    <div className="grid  px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-52 bg-[#f0f8ff]">
      <div className="mr-auto place-self-center w-full mx-auto max-w-7xl">
        <h1 className="max-w-4xl mb-4 text-3xl font-bold leading-none tracking-tight text-black md:text-4xl">
          Current Job Openings 🚀
        </h1>

        <p className="max-w-full mb-6 text-lg font-light text-gray-600 lg:mb-8 md:text-lg lg:text-base">
          Explore our current openings below. If you&apos;re driven, skilled, and ready to make a difference, we’d love to hear from you!
        </p>

        <div className="bg-white rounded-lg w-full">
          {loading ? (

            <div className="flex justify-center items-center h-screen bg-[#f0f8ff]">
              <div className="spinner-border animate-spin text-indigo-600" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>

          ) : error ? (
            <p className="text-red-600 text-center">No job openings available at the moment.</p>
          ) : jobListIQ.length > 0 ? (
            jobListIQ.map((job) => (
              <div
                key={job.id}
                className="bg-[#F7F7FF] p-6 w-full mx-auto rounded-lg shadow-md flex justify-between items-center mb-6 hover:shadow-lg transition-shadow flex-col md:flex-row"
              >
                <div className="w-full">
                  <h2 className="text-xl font-semibold text-gray-800">{job.position}</h2>
                  <div className="flex flex-col md:flex-row items-start md:items-center mt-2 text-gray-600 text-sm space-y-4 md:space-y-0 md:space-x-4">
                    <span className="flex items-center">
                      <LuMapPin className="text-5xl lg:text-2xl" /> {/* Phone: 5xl, Desktop: 2xl */}
                      <span className="ml-2 text-lg">{job.location}</span>
                    </span>
                    <span className="flex items-center">
                      <BsBriefcase className="text-2xl lg:text-2xl" />

                      <span className="ml-2 text-lg">{job.experience}</span>
                    </span>
                    <span className="flex items-center">
                      <FaMoneyBillTrendUp className="text-2xl lg:text-2xl" />

                      <span className="ml-2 text-lg">{job.salary}</span>
                    </span>
                  </div>
                </div>

                {/* Place this below details in phone view */}
                <div className="w-full mt-4 md:mt-0 md:w-auto text-right">
                  <p
                    className={`text-lg whitespace-nowrap ${isDateOver(job.deadline) ? "text-red-500" : "text-blue-500"
                      }`}
                  >
                    Apply End Date: <span className="font-medium">{formatDate(job.deadline)}</span>
                  </p>
                  <Link href={`https://iq-bd.com/careers/${job.id}`}
                   target="_blank"
                rel="noopener noreferrer"
                  >
                    <button className="mt-2 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors">
                      View & Apply
                    </button>
                  </Link>
                </div>
              </div>

            ))
          ) : (
            <p className="text-gray-600 text-center">No job openings available at the moment.</p>
          )}
        </div>



        <div className="bg-white rounded-lg w-full">
          {loading1 ? (

            <div className="flex justify-center items-center h-screen bg-[#f0f8ff]">
              <div className="spinner-border animate-spin text-indigo-600" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>

          ) : error1 ? (
            <p ></p>
          ) : jobListDIGIRIB.length > 0 ? (
            jobListDIGIRIB.map((job) => (
              <div
                key={job.id}
                className="bg-[#F7F7FF] p-6 w-full mx-auto rounded-lg shadow-md flex justify-between items-center mb-6 hover:shadow-lg transition-shadow flex-col md:flex-row"
              >
                <div className="w-full">
                  <h2 className="text-xl font-semibold text-gray-800">{job.position}</h2>
                  <div className="flex flex-col md:flex-row items-start md:items-center mt-2 text-gray-600 text-sm space-y-4 md:space-y-0 md:space-x-4">
                    <span className="flex items-center">
                      <LuMapPin className="text-5xl lg:text-2xl" /> {/* Phone: 5xl, Desktop: 2xl */}
                      <span className="ml-2 text-lg">{job.location}</span>
                    </span>
                    <span className="flex items-center">
                      <BsBriefcase className="text-2xl lg:text-2xl" />

                      <span className="ml-2 text-lg">{job.experience}</span>
                    </span>
                    <span className="flex items-center">
                      <FaMoneyBillTrendUp className="text-2xl lg:text-2xl" />

                      <span className="ml-2 text-lg">{job.salary}</span>
                    </span>
                  </div>
                </div>

                {/* Place this below details in phone view */}
                <div className="w-full mt-4 md:mt-0 md:w-auto text-right">
                  <p
                    className={`text-lg whitespace-nowrap ${isDateOver(job.deadline) ? "text-red-500" : "text-blue-500"
                      }`}
                  >
                    Apply End Date: <span className="font-medium">{formatDate(job.deadline)}</span>
                  </p>
                  <Link href={`https://digirib.com/careers/${job.id}`}
                  target="_blank"
                rel="noopener noreferrer"
                  
                  >
                    <button className="mt-2 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors">
                      View & Apply
                    </button>
                  </Link>
                </div>
              </div>

            ))
          ) : (
            <p className="text-gray-600 text-center">No job openings available at the moment.</p>
          )}
        </div>




      
        <div className="bg-white rounded-lg w-full">
          {loading2 ? (

            <div className="flex justify-center items-center h-screen bg-[#f0f8ff]">
              <div className="spinner-border animate-spin text-indigo-600" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>

          ) : error2 ? (
            <p ></p>
          ) : jobListINTERIO.length > 0 ? (
            jobListINTERIO.map((job) => (
              <div
                key={job.id}
                className="bg-[#F7F7FF] p-6 w-full mx-auto rounded-lg shadow-md flex justify-between items-center mb-6 hover:shadow-lg transition-shadow flex-col md:flex-row"
              >
                <div className="w-full">
                  <h2 className="text-xl font-semibold text-gray-800">{job.jobTitle}</h2>
                  <div className="flex flex-col md:flex-row items-start md:items-center mt-2 text-gray-600 text-sm space-y-4 md:space-y-0 md:space-x-4">
                    <span className="flex items-center">
                      <LuMapPin className="text-5xl lg:text-2xl" /> {/* Phone: 5xl, Desktop: 2xl */}
                      <span className="ml-2 text-lg">{job.jobLocation}</span>
                    </span>
                    <span className="flex items-center">
                      <BsBriefcase className="text-2xl lg:text-2xl" />

                      <span className="ml-2 text-lg">{job.experience}</span>
                    </span>
                    <span className="flex items-center">
                      <FaMoneyBillTrendUp className="text-2xl lg:text-2xl" />

                      <span className="ml-2 text-lg">{job.salary}</span>
                    </span>
                  </div>
                </div>

                {/* Place this below details in phone view */}
                <div className="w-full mt-4 md:mt-0 md:w-auto text-right">
                  <p
                    className={`text-lg whitespace-nowrap ${isDateOver(job.applicationDeadline) ? "text-red-500" : "text-blue-500"
                      }`}
                  >
                    Apply End Date: <span className="font-medium">{formatDate(job.applicationDeadline)}</span>
                  </p>
                  <Link href={`https://interiobd.com/jobDetails/${job.id}`}
                  
                  target="_blank"
                  rel="noopener noreferrer"
                  
                  >
                    <button className="mt-2 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors">
                      View & Apply
                    </button>
                  </Link>
                </div>
              </div>

            ))
          ) : (
            <p className="text-gray-600 text-center">No job openings available at the moment.</p>
          )}
        </div>



      </div>
    </div>
  );
}
