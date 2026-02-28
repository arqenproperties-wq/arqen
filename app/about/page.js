'use client'
import Footer from '@/components/Footer'
import Lenis from 'lenis'
import React, { useEffect, useRef } from 'react'
import ScrollScaleImage from './ScrollScaleImage'
import About from './About'
import CardStack2 from '@/components/CardStack2'
import PeopleSection from './PeopleSection'
import Header2 from '@/components/Header2'


const page = () => {
    const lenisRef = useRef(null)

    useEffect(() => {
        const lenis = new Lenis()
        lenisRef.current = lenis

        const raf = (time) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])
    return (
        <div className='bg-[#f3eee8]'>
            <Header2 />
            <ScrollScaleImage />
            <About />
            <div className='w-full h-screen  flex flex-col justify-center items-center text-center bg-[#f3eee8] relative'>
                <p className='text-[22px] md:text-[40px] xl:text-[54px]  font-opensans font-light tracking-tight [transform:scaleY(0.75)] text-black'>
                    A boutique real estate agency redefining Dubai living</p>
                <h1 className='text-[24px] md:text-[44px] lg:text-[52px] xl:text-[62px] font-opensans font-bold  text-black'>LIVE AHEAD. LIVE ARQEN.</h1>
            </div>
            <CardStack2 />
            <PeopleSection />
            <Footer />
        </div>
    )
}

export default page