'use client'
import Footer from '@/components/Footer'
import Lenis from 'lenis'
import React, { useEffect, useRef } from 'react'
import Header2 from '@/components/Header2'
import LegalNotice from './LegalNotice'



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
            <LegalNotice />
            <Footer />
        </div>
    )
}

export default page