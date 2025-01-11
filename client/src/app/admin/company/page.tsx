'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AboutUs() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    description: '',
    description1: '',
    description2: '',
  });
  type FormDataKeys = keyof typeof formData;

  useEffect(() => {
    const checkSession = async () => {
      const storedUserInfo = localStorage.getItem('sessionToken');
      if (!storedUserInfo) {
        router.push('/admin/login');
        return;
      }

      try {
        const aboutResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/company/1`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedUserInfo}`,
          },
        });

        if (aboutResponse.ok) {
          const data = await aboutResponse.json();
          setFormData({
            description: data.data.description || '',
            description1: data.data.description1 || '',
            description2: data.data.description2 || '',
          });
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        toast.error('Error loading data.');
        console.error('Error loading data:', error);
        router.push('/admin/login');
      }
    };

    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const storedUserInfo = localStorage.getItem('sessionToken');

    if (!storedUserInfo) {
      router.push('/admin/login');
      return;
    }

    try {
      const dataToSend = {
        description: formData.description,
        description1: formData.description1,
        description2: formData.description2,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/company/1`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${storedUserInfo}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        toast.error('Error updating data');
        console.error('Error updating data');
      } else {
        toast.success('Data updated successfully!');
        console.log('Data updated successfully');
      }
    } catch (error) {
      toast.error('Error submitting form');
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name in formData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name as FormDataKeys]: value,
      }));
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col pl-16 bg-gray-100 dark:bg-gray-900 py-12">
      <div className="max-w-5xl w-full bg-white dark:bg-gray-800 border-2 border-[#F17B21] rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-black dark:text-white">Company</h2>

        <form onSubmit={handleSubmit} className="space-y-10 mt-10">
          {/* Chairman Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-900 dark:text-gray-200 mb-2">
                Iq description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                title="description"
                className="w-full p-4 h-40 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-[#F17B21] dark:bg-gray-700"
              ></textarea>
            </div>
          </div>

          {/* Managing Director Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-900 dark:text-gray-200 mb-2">
                Interio Description
              </label>
              <textarea
                name="description1"
                title="description1"
                value={formData.description1}
                onChange={handleChange}
                className="w-full p-4 h-40 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-[#F17B21] dark:bg-gray-700"
              ></textarea>
            </div>
          </div>

          {/* MD Digirib Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-900 dark:text-gray-200 mb-2">
                Digirib Description
              </label>
              <textarea
                name="description2"
                title="description2"
                value={formData.description2}
                onChange={handleChange}
                className="w-full p-4 h-40 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-[#F17B21] dark:bg-gray-700"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#F17B21] text-white font-bold rounded-md focus:outline-none hover:bg-[#f18c48]"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
