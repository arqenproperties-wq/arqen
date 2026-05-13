import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className='w-full absolute left-0 z-20 py-4'>
            <div className='w-full flex flex-col gap-2 md:gap-4 items-center'>
                <Link href="/">
                    <Image
                        width={500}
                        height={500}
                        src="/4.png"
                        alt="scroll down"
                        className="w-[150px] md:w-[200px] h-auto "
                    />
                </Link>
                <div className='text-[18px] md:text-[20px] font-poppins flex gap-10 md:gap-14 text-white uppercase font-medium tracking-[0.1em] items-center mt-4'>
                    <h3>Live</h3>
                    <h3>Work</h3>
                    <h3>Thrive</h3>
                </div>
            </div>
        </div >
    )
}

export default Navbar