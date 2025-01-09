import Footer from '@/components/user/Footer'
import JobList from '@/components/user/JobList'
import Navbar from '@/components/user/Navbar'
import Whatsapp from '@/components/user/Whatsapp'
import React from 'react'

export default function page() {
  return (
    <div>
        <Navbar/>

        <JobList/>

        <Whatsapp/>
        <Footer/>
      
    </div>
  )
}
