'use client'
import Footer from '@/components/Footer'

import Header2 from '@/components/Header2'
import SmoothScroll from '../../components/SmoothScroll'
import FAQSection from './FAQSection'


const page = () => {

    return (
        <div className='bg-[#f3eee8]'>
            <SmoothScroll />
            <Header2 />
            <FAQSection />
            <Footer />
        </div>
    )
}

export default page