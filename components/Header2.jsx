"use client"

import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import Link from "next/link"

const Header2 = ({ lenisRef }) => {
    const headerRef = useRef(null)
    const lastScroll = useRef(0)

    const menuRef = useRef(null)
    const overlayRef = useRef(null)
    const logoRef = useRef(null)
    const langRef = useRef(null)
    const arqenRef = useRef(null)
    const moreRef = useRef(null)

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        gsap.set(
            [logoRef.current, langRef.current, arqenRef.current, moreRef.current],
            { opacity: 0 }
        )
        tl.fromTo(
            [logoRef.current, langRef.current, arqenRef.current, moreRef.current],
            { y: -100, opacity: 0, stagger: 0.2 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1
            }
        )

    }, [])

    useEffect(() => {
        const header = headerRef.current

        const handleScroll = () => {
            const currentScroll = window.scrollY

            if (currentScroll > lastScroll.current && currentScroll > 10) {
                gsap.to(header, {
                    y: "-100%",
                    duration: 0.3,
                    ease: "power2.out"
                })
            } else {
                gsap.to(header, {
                    y: "0%",
                    duration: 0.3,
                    ease: "power2.out"
                })
            }

            lastScroll.current = currentScroll
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    useEffect(() => {
        if (!overlayRef.current || !menuRef.current) return

        if (isOpen) {
            gsap.set(overlayRef.current, { display: "flex" })

            gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                pointerEvents: "auto"
            })

            gsap.fromTo(
                menuRef.current,
                { y: -40, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
            )
        } else {
            gsap.to(menuRef.current, {
                y: -40,
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: "power3.in"
            })

            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                pointerEvents: "none",
                onComplete: () => {
                    gsap.set(overlayRef.current, { display: "none" })
                }
            })
        }
    }, [isOpen])

    useEffect(() => {
        if (!lenisRef?.current) return

        if (isOpen) {
            lenisRef.current.stop()
        } else {
            lenisRef.current.start()
        }
    }, [isOpen, lenisRef])

    const scrollToSection = (className) => {
        const el = document.querySelector(`.${className}`);

        if (!el) return;

        setIsOpen(false);

        setTimeout(() => {
            if (lenisRef?.current) {
                lenisRef.current.scrollTo(el, {
                    offset: 0,
                    duration: 1.2,
                });
            } else {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }, 200);
    };

    return (
        <>
            <div
                ref={headerRef}
                className="w-full flex justify-between items-center fixed top-0 left-0 xl:px-6 py-2 z-50"
            >
                <Link href="/" className="cursor-pointer">
                    <Image
                        ref={logoRef}
                        src="/newlogo1.png"
                        alt="Logo"
                        width={500}
                        height={500}
                        className="w-[115px] xl:w-[175px] cursor-pointer"
                    />
                </Link>
                <div className='w-fit flex justify-between items-center gap-4 lg:gap-6 xl:gap-6 mr-4'>
                    {/* <div ref={langRef} className='flex gap-3 cursor-pointer'>
                        <Image
                            src="/globe.svg"
                            alt="Logo"
                            width={500}
                            height={500}
                            className="w-[16px] xl:w-[20px] h-auto object-contain "
                        />
                        <h1 className="hidden md:block text-black text-center font-sourcesans3 font-semibold text-[12px] lg:text-[16px] xl:text-[18px] tracking-wider uppercase">
                            English
                        </h1>
                    </div> */}
                    {/* <div
                        ref={arqenRef}
                        className="
                            px-[14px] md:px-[18px] xl:px-[20px] py-[6px] md:py-[8px] xl:py-[10px] cursor-pointer
                            bg-[#b4b4b425]
                            rounded-[10px] xl:rounded-[14px]
                            flex justify-center items-center
                            border border-white
                            cursor-pointer
                            z-10
                           
                            backdrop-blur-[8.54px]
                            shadow-[0_0_2.846px_#0000001a,0_1.423px_11.386px_#0000001f,inset_4.27px_4.27px_.712px_-4.27px_#ffffffbf,inset_-4.27px_-4.27px_.712px_-4.27px_#fffc,inset_1.423px_1.423px_1.423px_-.712px_#ffffffbf,inset_-1.423px_-1.423px_1.423px_-.712px_#ffffffbf,inset_0_0_1.423px_1.423px_#ffffff26,inset_0_0_1.423px_1.423px_#999,inset_0_0_22.771px_#f2f2f2]
                        "
                    >
                        <h1 className="text-black text-center font-sourcesans3 font-semibold text-[12px] lg:text-[16px]  xl:text-[18px]  tracking-wider uppercase">
                            ARQEN
                        </h1>
                        <Image
                            src="/up-right.svg"
                            alt="Logo"
                            width={500}
                            height={500}
                            className="w-[20px] h-auto object-contain ml-2"
                        />
                    </div> */}
                    <div ref={moreRef} onClick={() => setIsOpen(true)} className='flex justify-center items-center gap-2 xl:gap-3 cursor-pointer'>
                        <Image
                            src="/two-lines1.svg"
                            alt="Logo"
                            width={500}
                            height={500}
                            className="w-[20px] xl:w-[25px] h-auto object-contain mt-1 xl:mt-2 opacity-80 rotate-90"
                        />
                        <h1 className="text-[#38433b] text-center  font-centrabook text-[12px] lg:text-[16px]  xl:text-[18px] tracking-wider ">
                            More
                        </h1>
                    </div>
                </div>

            </div>

            <div
                ref={overlayRef}
                className="w-full h-screen bg-black/40  fixed inset-0  flex justify-center items-start  z-60 opacity-0 pointer-events-none hidden"
            >
                <div
                    ref={menuRef}
                    className=" w-[250px] md:w-[275px] xl:w-[350px] 2xl:w-[375px]  fixed top-3 xl:top-4 right-4  xl:right-8 bg-[#f3eee8] backdrop-blur-xl rounded-[22px] xl:rounded-[28px] px-5 py-5  xl:px-7 xl:py-6 "
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-[30px] absolute top-3 xl:top-5 right-3 xl:right-5 text-gray-600 text-lg xl:text-xl cursor-pointer z-10"
                    >
                        ✕
                    </button>

                    <div className="flex flex-col space-y-2 xl:space-y-5 2xl:space-y-7 font-centrathin font-bold">
                        {/* <Link href="/team" className="text-black hover:text-white cursor-pointer">
                            <h2 className="text-[24px] xl:text-[32px] 2xl:text-[34px] leading-8 xl:leading-9 font-light tracking-wide ">
                                Meet the founders
                            </h2>
                            <p className="text-[12px] xl:text-[14px] text-gray-500">
                                Shehzam & Raza
                            </p>
                        </Link> */}

                        <Link href="/about" className="text-[#4c5950] hover:text-white cursor-pointer">
                            <h2 className="text-[24px] xl:text-[32px] 2xl:text-[34px] leading-8 xl:leading-9  ">About us</h2>
                            <p className="text-[12px] xl:text-[14px] text-gray-500 font-centrathin">
                                Who we are
                            </p>
                        </Link>

                        <Link href="/blog" className="text-[#4c5950] hover:text-white cursor-pointer">
                            <h2 className="text-[24px] xl:text-[32px] 2xl:text-[34px] leading-8 xl:leading-9  ">Blog</h2>
                            <p className="text-[12px] xl:text-[14px] text-gray-500 font-centrathin">
                                Stories & Insights
                            </p>
                        </Link>

                        <Link href="/contact" className="text-[#4c5950] hover:text-white cursor-pointer">
                            <h2 className="text-[24px] xl:text-[32px] 2xl:text-[34px] leading-8 xl:leading-9  ">Contact</h2>
                            <p className="text-[12px] xl:text-[14px] text-gray-500 font-centrathin">
                                Get in touch with us
                            </p>
                        </Link>

                        <Link href="/join-our-team" className="text-[#4c5950] hover:text-white cursor-pointer">
                            <h2 className="text-[24px] xl:text-[32px] 2xl:text-[34px] leading-8 xl:leading-9  ">Join our team</h2>
                            <p className="text-[12px] xl:text-[14px] text-gray-500 font-centrathin">
                                Work with us
                            </p>
                        </Link>

                        <hr className="w-[70%] my-4 border border-[#00000020]" />


                        <div>
                            <h2 className="text-[#4c5950] text-[24px] xl:text-[32px] 2xl:text-[34px] leading-8 xl:leading-9 ">
                                Brochure
                            </h2>
                            <p className="text-[12px] xl:text-[14px] text-gray-500 font-centrathin">
                                Download Arqen details
                            </p>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Link href="https://www.facebook.com/ArqenProperties/" target="_blank" className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                f
                            </Link>
                            <Link href="https://www.instagram.com/arqenproperties/" target="_blank" className="cursor-pointer w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                ig
                            </Link>
                            <Link href="https://www.linkedin.com/company/arqenproperties/" target="_blank" className="cursor-pointer w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header2



