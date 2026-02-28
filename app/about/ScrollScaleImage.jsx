"use client"
import React, { useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

export default function ScrollRevealImage() {
    const wrapperRef = useRef(null)
    const titleRef = useRef(null)
    const buttonRef = useRef(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useGSAP(() => {
        const wrapper = wrapperRef.current
        const title = titleRef.current
        const button = buttonRef.current

        const tl = gsap.timeline({
            scrollTrigger: {
                start: "top top",
                end: "+=800",
                scrub: true,
            },
        })

        tl.fromTo(
            wrapper,
            { width: "80vw", height: "70vh", borderRadius: "32px", yPercent: 40 },
            { width: "100vw", height: "100vh", yPercent: 0, ease: "none" },
            0
        )

        tl.fromTo(
            title,
            { y: -150, opacity: 0.8 },
            { y: 0, opacity: 1, ease: "none", color: "#ffffff" },
            0
        )

        tl.fromTo(
            button,
            { y: 250, opacity: 0.0 },
            { y: 0, opacity: 1, ease: "none" },
            0
        )

        tl.to(wrapper, { borderRadius: 0, duration: 0.15, ease: "none" }, ">")
    }, [])

    return (
        <>
            {/* LAYER 1: Image — always fixed, always behind everything */}
            <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">

                {/* Title + Button overlay */}
                <div className="absolute inset-0 z-10 flex flex-col gap-4 items-center justify-center pointer-events-none">
                    <h2
                        ref={titleRef}
                        className="text-[44px] xl:text-[72px] 2xl:text-[80px] font-light text-center text-[#1a1a1a]
                        font-opensans tracking-tight leading-12 xl:leading-20 2xl:leading-24
                        [transform:scaleY(0.75)]"
                    >
                        Where OMAYA
                        <br />
                        takes shape
                    </h2>

                    <div
                        ref={buttonRef}
                        onClick={() => setIsModalOpen(true)}
                        className="
                            flex items-center justify-center gap-4 cursor-pointer pointer-events-auto
                            px-[18px] md:px-[22px] xl:px-[28px] 2xl:px-[32px] py-[12px] md:py-[14px] xl:py-[16px] 2xl:py-[18px]
                            bg-[#b4b4b425] border border-white
                            rounded-[10px] xl:rounded-[14px]
                            backdrop-blur-[8.54px]
                            shadow-[0_0_2.846px_#0000001a,0_1.423px_11.386px_#0000001f,inset_4.27px_4.27px_.712px_-4.27px_#ffffffbf,inset_-4.27px_-4.27px_.712px_-4.27px_#fffc,inset_1.423px_1.423px_1.423px_-.712px_#ffffffbf,inset_-1.423px_-1.423px_1.423px_-.712px_#ffffffbf,inset_0_0_1.423px_1.423px_#ffffff26,inset_0_0_1.423px_1.423px_#999,inset_0_0_22.771px_#f2f2f2]
                        "
                    >
                        <Image
                            src="/play.png"
                            alt="Play"
                            width={500}
                            height={500}
                            className="w-[15px] h-auto object-contain ml-2"
                        />
                        <h1 className="text-white text-center font-sourcesans3 font-semibold text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] tracking-wider uppercase">
                            PLAY VIDEO
                        </h1>
                    </div>
                </div>

                {/* The card that animates to fullscreen */}
                <div
                    ref={wrapperRef}
                    className="relative overflow-hidden shrink-0 pointer-events-auto"
                    style={{
                        width: "80vw",
                        height: "70vh",
                        borderRadius: "32px",
                        willChange: "width, height, border-radius, transform",
                    }}
                >
                    <Image
                        src="/card/1.webp"
                        alt="Ocean"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
            </div>

            <div style={{ height: "calc(100vh + 800px)" }} />

            {/* VIDEO MODAL */}
            {isModalOpen && (
                <div
                    onClick={() => setIsModalOpen(false)}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md animate-[fadeIn_0.25s_ease]"
                >
                    {/* Modal card */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-[min(900px,90vw)] bg-[#1a1a1a] rounded-2xl overflow-hidden
                        shadow-[0_32px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)]
                        animate-[scaleIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full
                            bg-white/15 hover:bg-white/25 border border-white/20
                            text-white text-lg flex items-center justify-center
                            backdrop-blur-md transition-colors duration-200 cursor-pointer"
                        >
                            ✕
                        </button>

                        {/* 16:9 video wrapper — percentage padding trick requires inline style */}
                        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                            <video
                                controls
                                autoPlay
                                className="absolute inset-0 w-full h-full bg-black block"
                            >
                                {/* Replace with your actual video source */}
                                <source src="/video/omaya.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.92); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </>
    )
}
