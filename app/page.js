'use client';
import CardStack from "@/components/CardStack";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroScreen from "@/components/IntroScreen";
import Quote from "@/components/Quote";
import StackingImages from "@/components/StackingImages";
import Stories from "@/components/Stories";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";


const START_FRAME = 20
const END_FRAME = 531

export default function Home() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])


  const [showScroll, setShowScroll] = useState(false)
  const [preloadCanvas, setPreloadCanvas] = useState(false)
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
    <div className="">
      {!showScroll && (
        <IntroScreen
          onExperienceEnd={() => setShowScroll(true)}
          onNearEnd={() => setPreloadCanvas(true)}
        />
      )}
      {(preloadCanvas || showScroll) && framesReady && (
        <>
          <Header lenisRef={lenisRef} />
          <Hero showScroll={showScroll} images={images} />
          <Quote />
          <CardStack />
          <StackingImages />
          <Stories />
          <Form />
          <Footer />
        </>
      )}
    </div>
  );
}
