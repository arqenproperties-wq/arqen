'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const IntroScreen = ({ onExperienceEnd }) => {
    const canvasRef = useRef(null)
    const videoRef = useRef(null)
    const video2Ref = useRef(null)
    const [entered, setEntered] = useState(false)
    const [muted, setMuted] = useState(true)

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

        video.addEventListener('timeupdate', handleTimeUpdate)
        video.play()
        draw()

        return () => {
            cancelAnimationFrame(animationId)
            clearInterval(backwardInterval)
            video.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])

    useEffect(() => {
        const video2 = video2Ref.current
        if (!video2) return

        const handleEnd = () => {
            onExperienceEnd?.()
        }

        video2.addEventListener("ended", handleEnd)

        return () => {
            video2.removeEventListener("ended", handleEnd)
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
        video2.playbackRate = 4
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Intro canvas layer — fades out on enter */}
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
                    <div>
                        <Image
                            src="/4.png"
                            alt="Logo"
                            width={500}
                            height={500}
                            className="w-[250px] h-auto object-contain"
                        />
                    </div>
                    <h1 className="text-[72px] leading-20 font-opensans font-light text-white [transform:scaleY(0.75)]">
                        Welcome to arqen
                    </h1>
                    <div
                        onClick={() => handleEnter(true)}
                        className="
                            w-[275px] h-[65px]
                            bg-[#b4b4b425]
                            rounded-[20px]
                            flex justify-center items-center
                            border border-white
                            mt-10 cursor-pointer
                            z-10
                            transition-all duration-300
                            backdrop-blur-[8.54px]
                            shadow-[0_0_2.846px_#0000001a,0_1.423px_11.386px_#0000001f,inset_4.27px_4.27px_.712px_-4.27px_#ffffffbf,inset_-4.27px_-4.27px_.712px_-4.27px_#fffc,inset_1.423px_1.423px_1.423px_-.712px_#ffffffbf,inset_-1.423px_-1.423px_1.423px_-.712px_#ffffffbf,inset_0_0_1.423px_1.423px_#ffffff26,inset_0_0_1.423px_1.423px_#999,inset_0_0_22.771px_#f2f2f2]
                        "
                    >
                        <h1 className="text-white text-center font-sourcesans3 font-semibold text-[22px] tracking-wider uppercase">
                            Enter Experience
                        </h1>
                    </div>
                    <h1
                        onClick={() => handleEnter(false)}
                        className="z-10 absolute left-1/2 -translate-x-1/2 bottom-16 text-white text-center font-sourcesans3 font-semibold text-[18px] tracking-wider uppercase underline decoration-2 underline-offset-2 decoration-[#ffffff80] cursor-pointer"
                    >
                        Enter Without Sound
                    </h1>
                </div>
            </div>

            {/* Experience video — fades in on enter */}
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

                {/* Skip button — only visible after entering */}
                <button
                    onClick={handleSkip}
                    className="
                        absolute bottom-20 right-20
                       gap-2 
                        
                     underline decoration-2 underline-offset-6 decoration-[#ffffff]
                        text-white font-sourcesans3 font-medium text-[24px] tracking-wider uppercase
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