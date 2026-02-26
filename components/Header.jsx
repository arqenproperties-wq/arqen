"use client"

import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const Header = ({ lenisRef }) => {
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
                stagger: 0.2
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

    // MENU ANIMATION
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

        // wait menu close animation
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
            {/* HEADER */}
            <div
                ref={headerRef}
                className="w-full flex justify-between items-center fixed top-0 left-0 xl:px-6 z-50"
            >
                <Image
                    ref={logoRef}
                    src="/1.png"
                    alt="Logo"
                    width={500}
                    height={500}
                    className="w-[125px] xl:w-[175px] cursor-pointer"
                />
                <div className='w-fit flex justify-between items-center gap-4 lg:gap-6 xl:gap-6 mr-4'>
                    <div ref={langRef} className='flex gap-3 cursor-pointer'>
                        <Image
                            src="/globe.svg"
                            alt="Logo"
                            width={500}
                            height={500}
                            className="w-[16px] xl:w-[20px] h-auto object-contain "
                        />
                        <h1 className="hidden md:block text-white text-center font-sourcesans3 font-semibold text-[12px] lg:text-[16px] xl:text-[18px] tracking-wider uppercase">
                            English
                        </h1>
                    </div>
                    <div
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
                        <h1 className="text-white text-center font-sourcesans3 font-semibold text-[12px] lg:text-[16px]  xl:text-[18px]  tracking-wider uppercase">
                            ARQEN 50
                        </h1>
                        <Image
                            src="/up-right.svg"
                            alt="Logo"
                            width={500}
                            height={500}
                            className="w-[20px] h-auto object-contain ml-2"
                        />
                    </div>
                    <div ref={moreRef} onClick={() => setIsOpen(true)} className='flex justify-center items-center gap-2 xl:gap-3 cursor-pointer'>
                        <Image
                            src="/two-lines.svg"
                            alt="Logo"
                            width={500}
                            height={500}
                            className="w-[20px] xl:w-[25px] h-auto object-contain mt-1 xl:mt-2  rotate-90"
                        />
                        <h1 className="text-white text-center font-sourcesans3 font-semibold text-[12px] lg:text-[16px]  xl:text-[18px] tracking-wider uppercase">
                            More
                        </h1>
                    </div>
                </div>

            </div>

            {/* OVERLAY */}
            <div
                ref={overlayRef}
                className="w-full h-screen bg-black/40  fixed inset-0  flex justify-center items-start  z-60 opacity-0 pointer-events-none hidden"
            >
                {/* MENU CARD */}
                <div
                    ref={menuRef}
                    className=" w-[250px] md:w-[275px] xl:w-[350px] 2xl:w-[375px]  fixed top-3 xl:top-4 right-4  xl:right-8 bg-white/80 backdrop-blur-xl rounded-[22px] xl:rounded-[28px] px-5 py-5  xl:px-7 xl:py-6 "
                >
                    {/* CLOSE */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-[30px] absolute top-3 xl:top-5 right-3 xl:right-5 text-gray-600 text-lg xl:text-xl cursor-pointer z-10"
                    >
                        ✕
                    </button>

                    <div className="space-y-2 xl:space-y-5 2xl:space-y-7">
                        <div onClick={() => scrollToSection("section-arqen")} className="text-black hover:text-white cursor-pointer">
                            <h2 className="text-[24px] xl:text-[32px] 2xl:text-[34px] leading-8 xl:leading-9 font-light tracking-wide [transform:scaleY(0.8)]">
                                ARQEN 50
                            </h2>
                            <p className="text-[12px] xl:text-[14px] text-gray-500">
                                Layout & Features
                            </p>
                        </div>

                        <div onClick={() => scrollToSection("section-about")} className="text-black hover:text-white cursor-pointer">
                            <h2 className="text-[24px] xl:text-[32px] 2xl:text-[34px] leading-8 xl:leading-9 font-light [transform:scaleY(0.8)]">About us</h2>
                            <p className="text-[12px] xl:text-[14px] text-gray-500">
                                ELICA Yard
                            </p>
                        </div>

                        <div onClick={() => scrollToSection("section-blog")} className="text-black hover:text-white cursor-pointer">
                            <h2 className="text-[24px] xl:text-[32px] 2xl:text-[34px] leading-8 xl:leading-9 font-light [transform:scaleY(0.8)]">Blog</h2>
                            <p className="text-[12px] xl:text-[14px] text-gray-500">
                                Stories & Insights
                            </p>
                        </div>

                        <div onClick={() => scrollToSection("section-contact")} className="text-black hover:text-white cursor-pointer">
                            <h2 className="text-[24px] xl:text-[32px] 2xl:text-[34px] leading-8 xl:leading-9 font-light [transform:scaleY(0.8)]">Contact</h2>
                            <p className="text-[12px] xl:text-[14px] text-gray-500">
                                Get in touch with us
                            </p>
                        </div>

                        <div className="text-black hover:text-white cursor-pointer">
                            <h2 className="text-[24px] xl:text-[32px] 2xl:text-[34px] leading-8 xl:leading-9 font-light [transform:scaleY(0.8)]">Dealers</h2>
                            <p className="text-[12px] xl:text-[14px] text-gray-500">
                                Find a distributor near you
                            </p>
                        </div>

                        <hr className="w-[70%] my-4 border border-[#00000020]" />

                        <div>
                            <h2 className="text-[24px] xl:text-[32px] 2xl:text-[34px] leading-8 xl:leading-9 font-light [transform:scaleY(0.8)]">
                                Brochure
                            </h2>
                            <p className="text-[12px] xl:text-[14px] text-gray-500">
                                Download Omaya 50 details
                            </p>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                f
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                ig
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                in
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header



