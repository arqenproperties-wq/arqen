'use client'
import Footer from '@/components/Footer'
import Form from '@/components/Form'
import Header from '@/components/Header'
import Lenis from 'lenis'
import React, { useEffect, useRef } from 'react'

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
        <div>
            <Header />
            <Form />
            <Footer />
        </div>
    )
}

export default page