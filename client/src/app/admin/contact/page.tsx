'use client';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  massage: string;
  createdAt: string;
  updatedAt: string;
}

export default function Page() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/contacts`)
      .then(response => response.json())
      .then(data => setContacts(data.data))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  return (
    <div className="w-screen min-h-screen max-w-5xl flex flex-col  pl-0 lg:pl-16  py-12">
      <div className="max-w-7xl px-4 py-6">
        <h1 className='text-center text-2xl mb-4'>Contact Us</h1>
        <Table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-700">
          
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              <TableHead className="text-left text-gray-800 dark:text-gray-200">Name</TableHead>
              <TableHead className="text-left text-gray-800 dark:text-gray-200">Email</TableHead>
              <TableHead className="text-left text-gray-800 dark:text-gray-200">Phone</TableHead>
              <TableHead className="text-right text-gray-800 dark:text-gray-200">Subject</TableHead>
              <TableHead className="text-right text-gray-800 dark:text-gray-200">Massage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map(contact => (
              <TableRow key={contact.id} className="even:bg-gray-100 dark:even:bg-gray-800">
                <TableCell className="text-gray-800 dark:text-gray-200">{contact.name}</TableCell>
                <TableCell className="text-gray-800 dark:text-gray-200">{contact.email}</TableCell>
                <TableCell className="text-gray-800 dark:text-gray-200">{contact.phone}</TableCell>
                <TableCell className="text-right text-gray-800 dark:text-gray-200">{contact.subject}</TableCell>
                <TableCell className="text-right text-gray-800 dark:text-gray-200">{contact.massage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableCell colSpan={4} className="text-left text-gray-800 dark:text-gray-200">Total Contacts</TableCell>
              <TableCell className="text-right text-gray-800 dark:text-gray-200">{contacts.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
