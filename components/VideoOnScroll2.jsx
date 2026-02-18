"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const VideoOnScroll2 = ({ images, startFrame = 1, endFrame = 531 }) => {
    const canvasRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !images.length) return

        const context = canvas.getContext("2d")
        const frame = { index: 0 }

        // Slice images to only use start-end range
        const end = endFrame ?? images.length - 1
        const frameImages = images.slice(startFrame, end + 1)

        // draw first frame instantly
        context.drawImage(frameImages[0], 0, 0, canvas.width, canvas.height)

        gsap.to(frame, {
            index: frameImages.length - 1,
            snap: "index",
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                pin: wrapperRef.current,
                pinSpacing: false,
            },
            onUpdate: () => {
                const img = frameImages[Math.floor(frame.index)]
                context.clearRect(0, 0, canvas.width, canvas.height)
                context.drawImage(img, 0, 0, canvas.width, canvas.height)
            },
        })

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill())
        }
    }, [images, startFrame, endFrame])

    return (
        <div ref={wrapperRef} className="w-full h-screen absolute top-0 left-0 z-10">
            <canvas
                ref={canvasRef}
                width={1920}
                height={1080}
                className="w-full h-screen object-cover"
            />
        </div>
    );
};