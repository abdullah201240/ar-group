'use client';

import Navbar from '@/components/user/Navbar';
import Footer from '@/components/user/Footer';
import Whatsapp from '@/components/user/Whatsapp';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface BlogApiResponse {
  blogs?: {
    id: number;
    blogTitle: string;
    blogDescription: string;
    image: string;
  }[];
  data?: {
    id: number;
    title: string;
    description: string;
    image: string;
  }[];
}

export default function Page() {
  const [interioBlogs, setInterioBlogs] = useState<Blog[]>([]);
  const [iqBlogs, setIqBlogs] = useState<Blog[]>([]);
  const [digiribBlogs, setDigiribBlogs] = useState<Blog[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const API_URLS = [
        `${process.env.NEXT_PUBLIC_API_URL_INTERIO}blog/blogs`,
        `${process.env.NEXT_PUBLIC_API_URL_IQ}user/viewBlog`,
        `${process.env.NEXT_PUBLIC_API_URL_DIGIRIB}user/viewBlog`,
      ];

      try {
        const blogPromises = API_URLS.map(async (url) => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              console.error(`Error fetching from ${url}: ${response.statusText}`);
              return [];
            }

            const data: BlogApiResponse = await response.json();

            if (data.blogs) {
              return data.blogs.map((blog) => ({
                id: blog.id.toString(),
                title: blog.blogTitle,
                description: blog.blogDescription,
                image: blog.image,

              }));
            }

            if (data.data) {
              return data.data.map((blog) => ({
                id: blog.id.toString(),
                title: blog.title,
                description: blog.description,
                image: blog.image,

              }));
            }
            console.warn(`Unexpected response format from ${url}`);
            return [];
          } catch (error) {
            console.error(`Failed to fetch from ${url}:`, error);
            return [];
          }
        });

        const results = await Promise.all(blogPromises);
        const interioResults = results[0];
        const iqResults = results[1];
        const digiribResults = results[2];

        setInterioBlogs(interioResults);
        setIqBlogs(iqResults);
        setDigiribBlogs(digiribResults);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f0f8ff]">
        <div className="spinner-border animate-spin text-indigo-600" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const getTextFromHTML = (html: string): string => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
  };

  return (
    <div className="bg-[#f0f8ff]">
      <Navbar />

      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {interioBlogs.map((blog) => (
            <div key={blog.id} className="group rounded overflow-hidden shadow-lg flex flex-col transition-transform transform hover:scale-105">
              <Link href={`https://interiobd.com/blog/${blog.id}`}

                className="relative block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300"
                  src={`${process.env.NEXT_PUBLIC_API_URL_INTERIO_IMAGE}${blog.image}`}
                  alt={blog.id}
                  width={500}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30"></div>
              </Link>

              <div className="px-6 py-4 flex flex-col justify-between flex-grow">
                <Link href={`https://interiobd.com/blog/${blog.id}`} className="font-medium text-xl text-gray-800 hover:text-indigo-600 transition duration-300 ease-in-out mb-2">
                  {blog.title}
                </Link>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">{getTextFromHTML(blog.description).slice(0, 100)}...</p>

                <Link
                  href={`https://interiobd.com/blog/${blog.id}`}
                  className="text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition duration-300 ease-in-out"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {iqBlogs.map((blog) => (
              <div key={blog.id} className="group rounded overflow-hidden shadow-lg flex flex-col transition-transform transform hover:scale-105">
                <Link
                  href={`https://iq-bd.com/blogs/${blog.id}`}
                  className="relative block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300"
                    src={`${process.env.NEXT_PUBLIC_API_URL_IQ}${blog.image}`}
                    alt={blog.title}
                    width={500}
                    height={300}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30"></div>
                </Link>


                <div className="px-6 py-4 flex flex-col justify-between flex-grow">
                  <Link href={`https://iq-bd.com/blogs/${blog.id}`} className="font-medium text-xl text-gray-800 hover:text-indigo-600 transition duration-300 ease-in-out mb-2">
                    {blog.title}
                  </Link>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{getTextFromHTML(blog.description).slice(0, 100)}...</p>

                  <Link
                    href={`https://iq-bd.com/blogs/${blog.id}`}
                    className="text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition duration-300 ease-in-out"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>



        <div className="mt-16">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {digiribBlogs.map((blog) => (
              <div key={blog.id} className="group rounded overflow-hidden shadow-lg flex flex-col transition-transform transform hover:scale-105">
                <Link
                  href={`https://digirib.com/blogs/${blog.id}`}
                  className="relative block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300"
                    src={`${process.env.NEXT_PUBLIC_API_URL_DIGIRIB}${blog.image}`}
                    alt={blog.title}
                    width={500}
                    height={300}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30"></div>
                </Link>


                <div className="px-6 py-4 flex flex-col justify-between flex-grow">
                  <Link href={`https://digirib.com/blogs/${blog.id}`} className="font-medium text-xl text-gray-800 hover:text-indigo-600 transition duration-300 ease-in-out mb-2">
                    {blog.title}
                  </Link>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{getTextFromHTML(blog.description).slice(0, 100)}...</p>

                  <Link
                    href={`https://digirib.com/blogs/${blog.id}`}
                    className="text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition duration-300 ease-in-out"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>





      </div>

      <Whatsapp />
      <Footer />
    </div>
  );
}
