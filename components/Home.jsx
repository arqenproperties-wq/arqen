'use client';
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import CardStack from "@/components/CardStack";
import StackingImages from "@/components/StackingImages";
import Form from "@/components/Form";
import Footer from "@/components/Footer";
import IntroScreen from "@/components/IntroScreen";

const START_FRAME = 20;
const END_FRAME = 531;

export default function HomeClient({ stories }) {
    const lenisRef = useRef(null);
    const [showScroll, setShowScroll] = useState(false);
    const [preloadCanvas, setPreloadCanvas] = useState(false);
    const [images, setImages] = useState([]);
    const [framesReady, setFramesReady] = useState(false);

    useEffect(() => {
        const lenis = new Lenis();
        lenisRef.current = lenis;
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    useEffect(() => {
        const loadedImages = [];
        const promises = [];
        for (let i = START_FRAME; i <= END_FRAME; i++) {
            const img = new Image();
            const p = new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
            img.src = `/frames/frame_${String(i).padStart(4, "0")}.webp`;
            loadedImages.push(img);
            promises.push(p);
        }
        Promise.all(promises)
            .then(() => { setImages(loadedImages); setFramesReady(true); })
            .catch(console.error);
    }, []);

    return (
        <div>
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
                    {stories}  {/* 👈 Stories is passed as a prop (a React node) */}
                    <Form />
                    <Footer />
                </>
            )}
        </div>
    );
}