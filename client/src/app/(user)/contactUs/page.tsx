import ContactForm from '@/components/user/ContactForm'
import Footer from '@/components/user/Footer'
import Navbar from '@/components/user/Navbar'
import Whatsapp from '@/components/user/Whatsapp'
import React from 'react'

export default function page() {
  return (
    <div>
      <Navbar/>

      <ContactForm/>
      <Whatsapp/>
      <Footer/>
    </div>
  )
}
