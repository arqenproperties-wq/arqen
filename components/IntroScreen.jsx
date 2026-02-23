'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
const IntroScreen = ({ onExperienceEnd }) => {
    const canvasRef = useRef(null)
    const videoRef = useRef(null)
    const video2Ref = useRef(null)
    const [entered, setEntered] = useState(false)
    const [muted, setMuted] = useState(true)
    const [video1Ready, setVideo1Ready] = useState(false)
    const [progress, setProgress] = useState(0)
    const [showLoader, setShowLoader] = useState(true) // New state for loader visibility
    const video1ReadyRef = useRef(false)
    const logoRef = useRef(null)
    const enterBtnRef = useRef(null)
    const withoutSoundRef = useRef(null)

    useEffect(() => {
        if (showLoader) return

        const tl = gsap.timeline({ delay: 0.75, defaults: { ease: "power3.out" } })

        tl.from(logoRef.current, {
            y: 20,
            opacity: 0,
            duration: 1.0,
        })
            .from(
                enterBtnRef.current,
                {
                    y: 30,
                    opacity: 0,
                    duration: 1.0,
                },
                "-=0.6"
            )
            .from(
                withoutSoundRef.current,
                {
                    y: 30,
                    opacity: 0,
                    duration: 1.0,
                },
                "-=0.6"
            )

    }, [showLoader])
    // keep ref in sync with state
    useEffect(() => {
        video1ReadyRef.current = video1Ready
    }, [video1Ready])

    // Handle loading sequence with manual 4-second timing
    useEffect(() => {
        const earlyStops = [31, 57, 100]
        let index = 0
        let timeout

        const showNextStop = () => {
            if (index < earlyStops.length) {
                // Show current stop
                setProgress(earlyStops[index])
                index++

                // Schedule next stop
                if (index < earlyStops.length) {
                    timeout = setTimeout(showNextStop, 800)
                }
            }
        }

        // Start showing numbers after a short delay
        timeout = setTimeout(showNextStop, 400)

        // Hide loader exactly at 4 seconds
        const hideLoaderTimeout = setTimeout(() => {
            setShowLoader(false)
        }, 4000)

        return () => {
            clearTimeout(timeout)
            clearTimeout(hideLoaderTimeout)
        }
    }, []) // Empty deps array - runs once on mount

    useEffect(() => {
        const video = videoRef.current
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        let animationId
        let forward = true
        let backwardInterval

        const draw = () => {
            if (!video || video.readyState < 2) {
                animationId = requestAnimationFrame(draw)
                return
            }
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            animationId = requestAnimationFrame(draw)
        }

        const handleTimeUpdate = () => {
            const duration = video.duration
            if (forward) {
                if (video.currentTime >= duration - 0.05) {
                    forward = false
                    video.pause()
                    playBackward()
                }
            }
        }

        const playBackward = () => {
            backwardInterval = setInterval(() => {
                if (video.currentTime <= 0.05) {
                    clearInterval(backwardInterval)
                    forward = true
                    video.play()
                } else {
                    video.currentTime -= 0.033
                }
            }, 33)
        }

        const handleCanPlay = () => {
            setVideo1Ready(true)
            video1ReadyRef.current = true
        }

        video.addEventListener('canplaythrough', handleCanPlay)
        video.addEventListener('timeupdate', handleTimeUpdate)
        video.play()
        draw()

        return () => {
            cancelAnimationFrame(animationId)
            clearInterval(backwardInterval)
            video.removeEventListener('timeupdate', handleTimeUpdate)
            video.removeEventListener('canplaythrough', handleCanPlay)
        }
    }, [])

    useEffect(() => {
        const video2 = video2Ref.current
        if (!video2) return

        const handleEnd = () => onExperienceEnd?.()

        video2.addEventListener('ended', handleEnd)

        return () => {
            video2.removeEventListener('ended', handleEnd)
        }
    }, [onExperienceEnd])

    const handleEnter = (withSound) => {
        setMuted(!withSound)
        setEntered(true)
        const video2 = video2Ref.current
        if (video2) {
            video2.muted = !withSound
            video2.play()
        }
    }

    // const handleSkip = () => {
    //     const video2 = video2Ref.current
    //     if (!video2) return
    //     video2.playbackRate = 8
    // }

    const handleSkip = () => {
        const video2 = video2Ref.current
        if (!video2) return

        // Jump to last frame
        video2.currentTime = video2.duration

        // Make sure end callback triggers
        onExperienceEnd?.()
    }

    // const handleSkip = () => {
    //     const video2 = video2Ref.current
    //     if (!video2 || !video2.duration) return

    //     // Go slightly before the end (about 0.12s = ~3–4 frames at 30fps)
    //     const framesToShow = 1.5

    //     video2.currentTime = Math.max(video2.duration - framesToShow, 0)

    //     video2.play()
    // }

    return (
        <div className="relative w-full h-screen overflow-hidden">

            {/* ── LOADER ── */}
            <div
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-700"
                style={{ opacity: showLoader ? 1 : 0, pointerEvents: showLoader ? 'auto' : 'none' }}
            >
                <div className="relative w-[225px] xl:w-[250px] h-auto mb-46">

                    {/* Base Light Logo */}
                    <Image
                        src="/3.png"
                        alt="Logo"
                        width={500}
                        height={500}
                        className="w-full h-auto object-contain opacity-10"
                    />

                    {/* Fill Logo */}
                    <div
                        className="absolute inset-0 transition-all duration-500 ease-out"
                        style={{
                            clipPath: `inset(${100 - progress}% 0% 0% 0%)`
                        }}
                    >
                        <Image
                            src="/3.png"
                            alt="Logo Fill"
                            width={500}
                            height={500}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
                <SlotLoader progress={progress} />
            </div>

            {/* ── INTRO CANVAS LAYER ── */}
            <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: entered ? 0 : 1, pointerEvents: entered ? 'none' : 'auto' }}
            >
                <video
                    ref={videoRef}
                    src="/1.mp4"
                    muted
                    playsInline
                    preload="auto"
                    className="hidden"
                />
                <canvas
                    ref={canvasRef}
                    className="w-full h-screen object-cover absolute top-0 left-0"
                />
                <div className='w-full h-screen bg-black opacity-25 absolute top-0 left-0' />

                <div className="flex flex-col items-center justify-center absolute inset-0">
                    <div ref={logoRef} className="w-[225px] xl:w-[250px] h-auto mb-3 z-10">
                        <Image
                            src="/4.png"
                            alt="Logo"
                            width={500}
                            height={500}
                            className="w-[225px] xl:w-[250px] h-auto object-contain "
                        />
                    </div>
                    <h1 className="text-center text-[52px] xl:text-[64px] 2xl:text-[72px] leading-16 2xl:leading-20 font-opensans font-light tracking-tight text-white [transform:scaleY(0.75)]">
                        Welcome to arqen
                    </h1>
                    <div
                        ref={enterBtnRef}
                        onClick={() => handleEnter(true)}
                        className="
                            px-[20px] py-[12px] md:px-[28px] xl:px-[26px] xl:py-[14px]
                            bg-[#b4b4b450]
                            rounded-[16px] xl:rounded-[20px]
                            flex justify-center items-center
                            border border-white
                            mt-6 xl:mt-10 cursor-pointer
                            z-10 text-white hover:text-black
                            hover:bg-white
                            backdrop-blur-[10px]
                            hover:shadow-none
                            shadow-[0_0_2.846px_#0000001a,0_1.423px_11.386px_#0000001f,inset_4.27px_4.27px_.712px_-4.27px_#ffffffbf,inset_-4.27px_-4.27px_.712px_-4.27px_#fffc,inset_1.423px_1.423px_1.423px_-.712px_#ffffffbf,inset_-1.423px_-1.423px_1.423px_-.712px_#ffffffbf,inset_0_0_1.423px_1.423px_#ffffff26,inset_0_0_1.423px_1.423px_#999,inset_0_0_22.771px_#f2f2f2]
                        "
                    >
                        <h1 className=" text-center font-sourcesans3 font-semibold text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-wider uppercase">
                            Enter Experience
                        </h1>
                    </div>
                    <h1
                        ref={withoutSoundRef}
                        onClick={() => handleEnter(false)}
                        className="z-10 absolute left-1/2 -translate-x-1/2 bottom-16 text-white text-center font-sourcesans3 font-semibold text-[15px] xl:text-[18px] tracking-wider uppercase underline decoration-2 underline-offset-2 decoration-[#ffffff80] cursor-pointer"
                    >
                        Enter Without Sound
                    </h1>
                </div>
            </div>

            {/* ── EXPERIENCE VIDEO ── */}
            <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: entered ? 1 : 0 }}
            >
                <video
                    ref={video2Ref}
                    src="/output.mp4"
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={handleSkip}
                    className="
                        absolute bottom-4 right-4 md:bottom-16 md:right-16  
                        gap-2
                        underline decoration-2 underline-offset-2 xl:underline-offset-6 decoration-[#ffffff]
                        text-white font-sourcesans3 font-medium text-[14px] xl:text-[20px] tracking-wider uppercase
                        cursor-pointer
                    "
                    style={{ pointerEvents: entered ? 'auto' : 'none' }}
                >
                    Skip Intro
                </button>
            </div>
        </div>
    )
}

export default IntroScreen

const ReelDigit = ({ value, delay = 0 }) => {
    const [offset, setOffset] = useState(0)
    const height = 90

    useEffect(() => {
        const spins = 1
        const finalOffset = -(spins * 10 * height + value * height)

        const t = setTimeout(() => {
            setOffset(finalOffset)
        }, delay)

        return () => clearTimeout(t)
    }, [value, delay])

    const strip = Array.from({ length: 40 }, (_, i) => i % 10)

    return (
        <div style={{ height, overflow: 'hidden' }}>
            <div
                style={{
                    transform: `translateY(${offset}px)`,
                    transition: 'transform 1.0s cubic-bezier(.2,.8,.2,1)',
                }}
            >
                {strip.map((n, i) => (
                    <div
                        key={i}
                        style={{
                            height,
                        }}
                        className='font-opensans tracking-tighter text-[40px] lg:text-[60px] font-light text-black [transform:scaleY(0.75)]'
                    >
                        {n}
                    </div>
                ))}
            </div>
        </div>
    )
}

const SlotLoader = ({ progress }) => {
    const digits = String(progress).padStart(2, '0').split('').map(Number)

    return (
        <div className="absolute bottom-0 flex items-center gap-1 mt-6">
            {digits.map((d, i) => (
                <ReelDigit key={i} value={d} delay={i * 140} />
            ))}
            <span className="text-black text-[14px] lg:text-[16px] ml-2 mb-8">%</span>
        </div>
    )
}