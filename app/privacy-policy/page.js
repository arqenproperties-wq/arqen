'use client'
import Footer from '@/components/Footer'
import Header2 from '@/components/Header2'
import PrivacyPolicy from './PrivacyPolicy'
import SmoothScroll from '../../components/SmoothScroll'

const page = () => {

    return (
        <div className='bg-[#f3eee8]'>
            <SmoothScroll />
            <Header2 />
            <PrivacyPolicy />
            <Footer />
        </div>
    )
}

export default page