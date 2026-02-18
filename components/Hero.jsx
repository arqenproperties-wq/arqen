import React, { useEffect, useState } from 'react'
import IntroScreen from './IntroScreen'
import { VideoOnScroll2 } from './VideoOnScroll2'

const START_FRAME = 20
const END_FRAME = 531

const Hero = () => {
    const [showScroll, setShowScroll] = useState(false)
    const [preloadCanvas, setPreloadCanvas] = useState(false)  // NEW
    const [images, setImages] = useState([])
    const [framesReady, setFramesReady] = useState(false)

    useEffect(() => {
        const loadedImages = []
        const promises = []

        for (let i = START_FRAME; i <= END_FRAME; i++) {
            const img = new Image()

            const p = new Promise((res, rej) => {
                img.onload = res
                img.onerror = rej
            })

            img.src = `/frames/frame_${String(i).padStart(4, "0")}.webp`
            loadedImages.push(img)
            promises.push(p)
        }

        Promise.all(promises)
            .then(() => {
                setImages(loadedImages)
                setFramesReady(true)
            })
            .catch(console.error)
    }, [])

    return (
        <div>
            {!showScroll && (
                <IntroScreen
                    onExperienceEnd={() => setShowScroll(true)}
                    onNearEnd={() => setPreloadCanvas(true)}  // NEW
                />
            )}

            {/* Render canvas early but invisible, make visible when video ends */}
            {(preloadCanvas || showScroll) && framesReady && (
                <>
                    <div className="w-full h-[10000px] relative hero overflow-hidden" />
                    <div style={{ opacity: showScroll ? 1 : 0 }}>
                        <VideoOnScroll2 images={images} />
                    </div>
                </>
            )}
        </div>
    )
}

export default Hero
