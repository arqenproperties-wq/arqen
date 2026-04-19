'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const InstagramEmbed = dynamic(
    () =>
        import('react-social-media-embed').then((mod) => mod.InstagramEmbed),
    { ssr: false }
)

export default function Post() {
    const containerRef = useRef(null)
    const isPausedRef = useRef(false)
    const isInViewRef = useRef(false)
    const animationRef = useRef(null)

    useEffect(() => {
        const el = containerRef.current
        let scrollAmount = 0

        const observer = new IntersectionObserver(
            ([entry]) => {
                isInViewRef.current = entry.isIntersecting
            },
            {
                threshold: 0.3,
            }
        )

        if (el) observer.observe(el)

        const autoScroll = () => {
            if (!el) return

            if (isInViewRef.current && !isPausedRef.current) {
                scrollAmount += 0.4
                el.scrollLeft = scrollAmount

                if (scrollAmount >= el.scrollWidth / 2) {
                    scrollAmount = 0
                }
            }

            animationRef.current = requestAnimationFrame(autoScroll)
        }

        autoScroll()

        const handleMouseEnter = () => (isPausedRef.current = true)
        const handleMouseLeave = () => (isPausedRef.current = false)

        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            cancelAnimationFrame(animationRef.current)
            observer.disconnect()

            el.removeEventListener('mouseenter', handleMouseEnter)
            el.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    const posts = [
        "https://www.instagram.com/arqenproperties/reel/DVvL8DWDvcC",
        "https://www.instagram.com/arqenproperties/p/DVdQkQ-Clo5",
        "https://www.instagram.com/arqenproperties/p/DXEQig3Cki7",
        "https://www.instagram.com/arqenproperties/p/DW_St2QjJk1",
        "https://www.instagram.com/arqenproperties/p/DW_GZClFLAY",
        "https://www.instagram.com/arqenproperties/p/DW05ujbCsUJ",
        "https://www.instagram.com/arqenproperties/p/DWwDttMDYFl",
    ]

    return (
        <div className="w-full overflow-hidden pt-40 bg-[#f3eee8] ">
            <div>
                <h2 className="text-3xl  font-centrabook text-center mb-8 text-[#475049]">Follow Us on Instagram</h2>
            </div>
            <div
                ref={containerRef}
                className="flex gap-6 overflow-x-scroll no-scrollbar"
            >
                {[...posts, ...posts].map((url, i) => (
                    <div key={i} className="min-w-[328px]">
                        <InstagramEmbed url={url} width={328} />
                    </div>
                ))}
            </div>
        </div>
    )
}