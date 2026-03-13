'use client'
import Footer from '@/components/Footer'

import Header2 from '@/components/Header2'
import SmoothScroll from '../../components/SmoothScroll'
import MeetTeamPage from './Team'


const page = () => {

    return (
        <div className='bg-[#f3eee8]'>
            <SmoothScroll />
            <Header2 />
            <MeetTeamPage />
            <Footer />
        </div>
    )
}

export default page