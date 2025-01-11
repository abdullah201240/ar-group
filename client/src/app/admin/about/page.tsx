'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AboutUs() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    chairmanDescription: '',
    chairmanImage: null,
    mdDescription: '',
    mdImage: null,
    mdDigiribDescription: '',
    mdDigiribImage: null,
    ourStory: '',
    ourStoryImage: null,
    mission: '',
    vision: '',
  });

  useEffect(() => {
    const checkSession = async () => {
      const storedUserInfo = localStorage.getItem('sessionToken');
      if (!storedUserInfo) {
        router.push('/admin/login');
        return;
      }

      try {
        const aboutResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/about/1`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedUserInfo}`,
          },
        });

        if (aboutResponse.ok) {
          const data = await aboutResponse.json();
          setFormData({
            chairmanDescription: data.data.chairmanDescription || '',
            chairmanImage: data.data.chairmanImage || null,
            mdDescription: data.data.mdDescription || '',
            mdImage: data.data.mdImage || null,
            mdDigiribDescription: data.data.mdDigiribDescription || '',
            mdDigiribImage: data.data.mdDigiribImage || null,
            ourStory: data.data.ourStory || '',
            mission: data.data.mission || '',
            vision: data.data.vision || '',
            ourStoryImage: data.data.ourStoryImage || null,


          });
        }
      } catch (error) {
        toast.error('Error checking session:');

        console.error('Error checking session:', error);
        router.push('/admin/login');
      }
    };

    checkSession();
  }, [router]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const storedUserInfo = localStorage.getItem('sessionToken');

    if (!storedUserInfo) {
      router.push('/admin/login');
      return;
    }

    try {
      const form = new FormData();
      form.append('chairmanDescription', formData.chairmanDescription);
      form.append('mdDescription', formData.mdDescription);
      form.append('mdDigiribDescription', formData.mdDigiribDescription);
      form.append('ourStory', formData.ourStory);
      form.append('mission', formData.mission);
      form.append('vision', formData.vision);

      if (formData.chairmanImage) form.append('chairmanImage', formData.chairmanImage);
      if (formData.mdImage) form.append('mdImage', formData.mdImage);
      if (formData.mdDigiribImage) form.append('mdDigiribImage', formData.mdDigiribImage);
      if (formData.ourStoryImage) form.append('ourStoryImage', formData.ourStoryImage);



      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/about/1`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${storedUserInfo}`,
        },
        body: form,
      });

      if (!response.ok) {
        toast.error('Error updating data');

        console.error('Error updating data');
      } else {
        toast.success('Data updated successfully!'); // Displays a success message

        console.log('Data updated successfully');
      }
    } catch (error) {
      toast.error('Error submitting form');

      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value } = target;
    const newValue = target instanceof HTMLInputElement && target.files ? target.files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return (
    <div className="w-screen min-h-screen flex flex-col pl-16 bg-gray-100 dark:bg-gray-900 py-12">
      <div className="max-w-5xl w-full bg-white dark:bg-gray-800 border-2 border-[#F17B21] rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-black dark:text-white">About Us</h2>

        <form onSubmit={handleSubmit} className="space-y-10 mt-10">
          {/* Chairman Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-900 dark:text-gray-200 mb-2">
                Chairman Description
              </label>
              <textarea
                name="chairmanDescription"
                value={formData.chairmanDescription}
                onChange={handleChange}
                title="chairman description"
                className="w-full p-4 h-40 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-[#F17B21] dark:bg-gray-700"
              ></textarea>
            </div>
            <div>
              <label className="block font-semibold text-gray-900 dark:text-gray-200 mb-2">
                Chairman Image
              </label>
              <input
                type="file"
                name="chairmanImage"
                accept="image/*"
                title="chairman image"
                onChange={handleChange}
                className="w-full p-4 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-[#F17B21] dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Managing Director Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-900 dark:text-gray-200 mb-2">
                MD Description
              </label>
              <textarea
                name="mdDescription"
                title="md description"
                value={formData.mdDescription}
                onChange={handleChange}
                className="w-full p-4 h-40 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-[#F17B21] dark:bg-gray-700"
              ></textarea>
            </div>
            <div>
              <label className="block font-semibold text-gray-900 dark:text-gray-200 mb-2">
                MD Image
              </label>
              <input
                type="file"
                title="md image file"

                name="mdImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-4 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-[#F17B21] dark:bg-gray-700"
              />
            </div>
          </div>

          {/* MD Digirib Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-900 dark:text-gray-200 mb-2">
                MD Digirib Description
              </label>
              <textarea
                name="mdDigiribDescription"
                title="mdDigirib description"

                value={formData.mdDigiribDescription}
                onChange={handleChange}
                className="w-full p-4 h-40 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-[#F17B21] dark:bg-gray-700"
              ></textarea>
            </div>
            <div>
              <label className="block font-semibold text-gray-900 dark:text-gray-200 mb-2">
                MD Digirib Image
              </label>
              <input
                type="file"
                name="mdDigiribImage"
                title="mdDigirib image"

                accept="image/*"
                onChange={handleChange}
                className="w-full p-4 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-[#F17B21] dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Our Story */}
          <div>
            <label className="block font-semibold text-gray-900 dark:text-gray-200 mb-2">
              Our Story
            </label>
            <textarea
              name="ourStory"
              title="ourStory"

              value={formData.ourStory}
              onChange={handleChange}
              className="w-full p-4 h-40 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-[#F17B21] dark:bg-gray-700"
            ></textarea>


            <label className="block font-semibold text-gray-900 dark:text-gray-200 mb-2">
              Our Story image
            </label>
            <input
              type="file"
              title="story image file"

              name="ourStoryImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-4  rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-[#F17B21] dark:bg-gray-700"
            ></input>
          </div>

          {/* Mission and Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-900 dark:text-gray-200 mb-2">
                Mission
              </label>
              <textarea
                name="mission"
                title="mission"

                value={formData.mission}
                onChange={handleChange}
                className="w-full p-4 h-40 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-[#F17B21] dark:bg-gray-700"
              ></textarea>
            </div>
            <div>
              <label className="block font-semibold text-gray-900 dark:text-gray-200 mb-2">
                Vision
              </label>
              <textarea
                name="vision"
                title="vision"
                value={formData.vision}
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
