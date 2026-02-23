import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <div className="relative w-full min-h-screen 2xl:h-screen overflow-hidden bg-[#f3eee8]">
            {/* <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            >
                <source src="/cc-branda-footer.mp4" type="video/mp4" />
            </video> */}
            <div className='w-full grid grid-col-1 gap-12 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-10 2xl:grid 2xl:grid-cols-[1fr_2fr] 2xl:gap-10 px-5 2xl:px-10 py-32 2xl:py-36'>
                <div className=''>
                    <div className='space-y-1'>
                        <Image
                            src="/23.png"
                            alt="Logo"
                            width={500}
                            height={500}
                            className="w-[175px] 2xl:w-[200px] h-auto object-contain "
                        />
                        <h1 className="text-[22px] 2xl:text-[36px] font-opensans font-light tracking-tight text-black [transform:scaleY(0.75)]">
                            Welcome to arqen
                        </h1>
                        <p className='font-sourcesans3 font-extralight text-[16px] 2xl:text-[18px]'>
                            © 2025 Arqen
                        </p>
                    </div>
                </div>
                <div className='w-full md:w-[80%] lg:w-full grid grid-cols-2 gap-10 md:grid-cols-3 2xl:grid-cols-3 2xl:gap-0'>
                    <div className='space-y-2 2xl:space-y-3'>
                        <h1 className="text-[22px] 2xl:text-[32px] font-opensans font-light tracking-tight text-black [transform:scaleY(0.75)]">
                            General
                        </h1>
                        <p className='font-sourcesans3 text-[15px] 2xl:text-[18px]'>
                            Home
                        </p>
                        <p className='font-sourcesans3  text-[15px] 2xl:text-[18px]'>
                            ARQEN 50
                        </p>
                        <p className='font-sourcesans3  text-[15px] 2xl:text-[18px]'>
                            About us
                        </p>
                        <p className='font-sourcesans3  text-[15px] 2xl:text-[18px]'>
                            Blog
                        </p>
                        <p className='font-sourcesans3  text-[15px] 2xl:text-[18px]'>
                            Partners Portal
                        </p>
                    </div>
                    <div className='space-y-2 2xl:space-y-3'>
                        <h1 className="text-[22px] 2xl:text-[32px] font-opensans font-light tracking-tight text-black [transform:scaleY(0.75)]">
                            Legal
                        </h1>
                        <p className='font-sourcesans3 text-[15px] 2xl:text-[18px]'>
                            Legal Notice
                        </p>
                        <p className='font-sourcesans3  text-[15px] 2xl:text-[18px]'>
                            Privacy Policy
                        </p>
                    </div>
                    <div className='space-y-2 2xl:space-y-3'>
                        <h1 className="text-[22px] 2xl:text-[32px] font-opensans font-light tracking-tight text-black [transform:scaleY(0.75)]">
                            Contacts
                        </h1>
                        <p className='font-sourcesans3 text-[15px] 2xl:text-[18px]'>
                            info@arqen.com
                        </p>
                        <p className='font-sourcesans3  text-[15px] 2xl:text-[18px]'>
                            +1 (123) 456-7890
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer