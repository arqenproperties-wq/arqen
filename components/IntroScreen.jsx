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
    const [video2Ready, setVideo2Ready] = useState(false)
    const [progress, setProgress] = useState(0)
    const [showLoader, setShowLoader] = useState(true)
    const video1ReadyRef = useRef(false)
    const logoRef = useRef(null)
    const enterBtnRef = useRef(null)
    const withoutSoundRef = useRef(null)

    useEffect(() => {
        if (showLoader) return

        const tl = gsap.timeline({ delay: 0.75, defaults: { ease: 'power3.out' } })
        tl.from(logoRef.current, { y: 20, opacity: 0, duration: 1.0 })
            .from(enterBtnRef.current, { y: 30, opacity: 0, duration: 1.0 }, '-=0.6')
            .from(withoutSoundRef.current, { y: 30, opacity: 0, duration: 1.0 }, '-=0.6')
    }, [showLoader])

    useEffect(() => {
        video1ReadyRef.current = video1Ready
    }, [video1Ready])

    useEffect(() => {
        const t1 = setTimeout(() => setProgress(15), 300)
        const t2 = setTimeout(() => setProgress(prev => Math.max(prev, 35)), 1800)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [])

    useEffect(() => {
        if (!video1Ready) return
        setProgress(50)
        const t = setTimeout(() => setProgress(prev => Math.max(prev, 75)), 1000)
        return () => clearTimeout(t)
    }, [video1Ready])

    useEffect(() => {
        if (!video1Ready || !video2Ready) return
        setProgress(100)
        const t = setTimeout(() => setShowLoader(false), 700)
        return () => clearTimeout(t)
    }, [video1Ready, video2Ready])

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
            if (forward && video.currentTime >= video.duration - 0.05) {
                forward = false
                video.pause()
                playBackward()
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
        const handleCanPlay = () => setVideo2Ready(true)

        video2.addEventListener('ended', handleEnd)
        video2.addEventListener('canplaythrough', handleCanPlay)

        video2.load()

        return () => {
            video2.removeEventListener('ended', handleEnd)
            video2.removeEventListener('canplaythrough', handleCanPlay)
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

    const handleSkip = () => {
        const video2 = video2Ref.current
        if (!video2) return
        video2.currentTime = video2.duration
        onExperienceEnd?.()
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">

            <div
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-700"
                style={{ opacity: showLoader ? 1 : 0, pointerEvents: showLoader ? 'auto' : 'none' }}
            >
                <div className="relative w-[100px] xl:w-[125px] h-auto mb-46">
                    <Image
                        src="/newlogo2.png"
                        alt="Logo"
                        width={500}
                        height={500}
                        className="w-full h-auto object-contain opacity-10"
                    />
                    <div
                        className="absolute inset-0 transition-all duration-500 ease-out"
                        style={{ clipPath: `inset(${100 - progress}% 0% 0% 0%)` }}
                    >
                        <Image
                            src="/newlogo2.png"
                            alt="Logo Fill"
                            width={500}
                            height={500}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
                <SlotLoader progress={progress} />
            </div>

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
                <div className="w-full h-screen bg-black opacity-25 absolute top-0 left-0" />

                <div className="flex flex-col items-center justify-center absolute inset-0">
                    <div ref={logoRef} className="w-[225px] xl:w-[250px] h-auto mb-3 z-10">
                        <Image
                            src="/4.png"
                            alt="Logo"
                            width={500}
                            height={500}
                            className="w-[225px] xl:w-[250px] h-auto object-contain"
                        />
                    </div>
                    <h1 className="text-center opacity-80 text-[50px] xl:text-[58px] 2xl:text-[66px] leading-16 2xl:leading-20 font-centrathin font-bold text-white">
                        Welcome to arqen
                    </h1>
                    <div
                        ref={enterBtnRef}
                        onClick={() => handleEnter(true)}
                        className="
                            px-[20px] py-[12px] md:px-[28px] xl:px-[30px] xl:py-[12px]
                            bg-[#b4b4b450]
                            rounded-[16px] xl:rounded-[16px]
                            flex justify-center items-center
                            border border-white
                            mt-6 xl:mt-10 cursor-pointer
                            z-10 text-white hover:text-[#161d17]
                            hover:bg-white
                            backdrop-blur-[10px]
                            hover:shadow-none
                            shadow-[0_0_2.846px_#0000001a,0_1.423px_11.386px_#0000001f,inset_4.27px_4.27px_.712px_-4.27px_#ffffffbf,inset_-4.27px_-4.27px_.712px_-4.27px_#fffc,inset_1.423px_1.423px_1.423px_-.712px_#ffffffbf,inset_-1.423px_-1.423px_1.423px_-.712px_#ffffffbf,inset_0_0_1.423px_1.423px_#ffffff26,inset_0_0_1.423px_1.423px_#999,inset_0_0_22.771px_#f2f2f2]
                        "
                    >
                        <h1 className="text-center font-centrathin text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-wider">
                            Enter experience
                        </h1>
                    </div>
                    <h1
                        ref={withoutSoundRef}
                        onClick={() => handleEnter(false)}
                        className="z-10 absolute left-1/2 -translate-x-1/2 bottom-16 text-white text-center font-centrathin text-[16px] xl:text-[20px] tracking-wider underline decoration-2 underline-offset-2 decoration-[#ffffff80] cursor-pointer"
                    >
                        Enter without sound
                    </h1>
                </div>
            </div>

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
                        text-white font-centrathin text-[14px] xl:text-[20px] tracking-wider
                        cursor-pointer
                    "
                    style={{ pointerEvents: entered ? 'auto' : 'none' }}
                >
                    Skip intro
                </button>
            </div>
        </div>
    )
}

export default IntroScreen

const ReelDigit = ({ value, delay = 0, quick = false }) => {
    const [offset, setOffset] = useState(quick ? -90 : 0)
    const height = 90

    useEffect(() => {
        const finalOffset = quick ? 0 : -(1 * 10 * height + value * height)
        const t = setTimeout(() => setOffset(finalOffset), delay)
        return () => clearTimeout(t)
    }, [value, delay, quick])

    const strip = quick
        ? [value]
        : Array.from({ length: 40 }, (_, i) => i % 10)

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
                        style={{ height }}
                        className="font-centrathin font-bold text-[38px] lg:text-[56px] text-[#38433b]"
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
                <ReelDigit
                    key={i}
                    value={d}
                    delay={i * 140}
                    quick={digits.length === 3 && i === 0}
                />
            ))}
            <span className="text-[#38433b] text-[14px] lg:text-[16px] ml-2 mb-8">%</span>
        </div>
    )
}