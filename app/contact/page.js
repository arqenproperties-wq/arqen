'use client'
import Footer from '@/components/Footer'
import Form from '@/components/Form'
import Header2 from '@/components/Header2'
import SmoothScroll from '../../components/SmoothScroll'

const page = () => {

    return (
        <div>
            <SmoothScroll />
            <Header2 />
            <Form />
            <Footer />
        </div>
    )
}

export default page