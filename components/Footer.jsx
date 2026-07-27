import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className="relative w-full min-h-screen 2xl:h-screen overflow-hidden ">
            {/* <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            >
                <source src="/cc-branda-footer.mp4" type="video/mp4" />
            </video> */}
            <Image
                src="/footer3.png"
                alt="Logo"
                width={1500}
                height={1500}
                className="absolute top-0 left-0 w-full h-full object-cover object-bottom z-10"
            />
            <div className='relative z-20 w-full grid grid-col-1 gap-12 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-10 2xl:grid 2xl:grid-cols-[1fr_2fr] 2xl:gap-10 px-5 2xl:px-10 py-32 2xl:py-36'>
                <div className=''>
                    <div className='space-y-1 text-[#38433b] '>
                        <Image
                            src="/newlogo1.png"
                            alt="Logo"
                            width={500}
                            height={500}
                            className="w-[175px] 2xl:w-[200px] h-auto object-contain relative right-2 top-2"
                        />
                        <h1 className="text-[22px] 2xl:text-[36px] font-centrabook tracking-tight ">
                            Welcome to Arqen
                        </h1>
                        <p className='font-centrabook text-[16px] 2xl:text-[18px]'>
                            © 2026 Arqen
                        </p>
                    </div>
                </div>
                <div className='w-full md:w-[80%] lg:w-full grid grid-cols-2 gap-10 md:grid-cols-3 2xl:grid-cols-3 2xl:gap-0'>
                    <div className='flex flex-col space-y-2 2xl:space-y-3 text-[#38433b] '>
                        <h1 className="text-[22px] 2xl:text-[32px] font-centrabook tracking-tight ">
                            General
                        </h1>
                        <Link href="/" className='font-centrabook text-[15px] 2xl:text-[18px]'>
                            Home
                        </Link>
                        {/* <Link href="/" className='font-centrabook  text-[15px] 2xl:text-[18px]'>
                            ARQEN
                        </Link> */}
                        <Link href="/about" className='font-centrabook  text-[15px] 2xl:text-[18px]'>
                            About us
                        </Link>
                        <Link href="/blog" className='font-centrabook  text-[15px] 2xl:text-[18px]'>
                            Blog
                        </Link>
                        <Link href="/faq" className='font-centrabook  text-[15px] 2xl:text-[18px]'>
                            FAQ
                        </Link>
                        {/* <Link href="/partners-portal" className='font-sourcesans3  text-[15px] 2xl:text-[18px]'>
                            Partners Portal
                        </Link> */}
                    </div>
                    <div className='flex flex-col space-y-2 2xl:space-y-3 text-[#38433b] '>
                        <h1 className="text-[22px] 2xl:text-[32px] font-centrabook tracking-tight ">
                            Legal
                        </h1>
                        {/* <Link href="/legal-notice" className='font-sourcesans3 text-[15px] 2xl:text-[18px]'>
                            Legal Notice
                        </Link> */}
                        <Link href="/privacy-policy" className='font-centrabook text-[15px] 2xl:text-[18px]'>
                            Privacy Policy
                        </Link>
                    </div>
                    <div className='flex flex-col space-y-2 2xl:space-y-3 text-[#38433b] '>
                        <h1 className="text-[22px] 2xl:text-[32px] font-centrabook tracking-tight ">
                            Contacts
                        </h1>
                        <Link href="mailto:everybody@arqen.ae" className='font-centrabook text-[15px] 2xl:text-[18px]'>
                            everybody@arqen.ae
                        </Link>
                        {/* <Link href="tel:+971 0548881804" className='font-centrabook  text-[15px] 2xl:text-[18px]'>
                            +971 0548881804
                        </Link> */}
                        <p className="font-centrabook text-[15px] 2xl:text-[17px]">
                            Office 903 Onyx Tower 2, The Greens, Dubai, United Arab Emirate
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer