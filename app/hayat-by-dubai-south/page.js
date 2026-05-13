import React from 'react'
import SmoothScroll from '../../components/SmoothScroll'
import Hero from './components/Hero'
import Contact from './components/Contact'
import About from './components/About'
import FloorPlans from './components/FloorPlans'
import Footer from './components/Footer'

const page = () => {
    return (
        <div className='font-poppins'>
            <SmoothScroll />
            <Hero />
            <Contact />
            <About />
            <FloorPlans />
            <Footer />
        </div>
    )
}

export default page