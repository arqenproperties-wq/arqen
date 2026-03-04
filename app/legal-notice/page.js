'use client'
import Footer from '@/components/Footer'
import Header2 from '@/components/Header2'
import LegalNotice from './LegalNotice'
import SmoothScroll from '../../components/SmoothScroll'

const page = () => {

    return (
        <div className='bg-[#f3eee8]'>
            <SmoothScroll />
            <Header2 />
            <LegalNotice />
            <Footer />
        </div>
    )
}

export default page