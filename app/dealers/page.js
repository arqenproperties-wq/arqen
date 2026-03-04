'use client'
import Footer from '@/components/Footer'
import Dealers from './Dealers'
import Header2 from '@/components/Header2'
import SmoothScroll from '../../components/SmoothScroll'

const page = () => {

    return (
        <div className='bg-[#f3eee8]'>
            <SmoothScroll />
            <Header2 />
            <Dealers />
            <Footer />
        </div>
    )
}

export default page