
"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';

export default function Page() {
    const [textAreaValue, setTextAreaValue] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Simple validation
        if (!textAreaValue) {

            return;
        }
        if (!imageFile) {
            return;
        }

        // Handle form submission
        console.log('Form submitted', { textAreaValue, imageFile });

        // Success toast
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file) {
                setImageFile(file);
            }
        }
    };

    return (
        <div className="m-16 bg-black dark:bg-white">
            <form onSubmit={handleSubmit}>
                <Textarea
                    placeholder="Enter your message"
                    value={textAreaValue}
                    onChange={(e) => setTextAreaValue(e.target.value)}
                />
                <Label htmlFor="Upload Image">Upload Image</Label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}

                />

                <Button type="submit">Submit</Button>
            </form>


        </div>
    );
}


