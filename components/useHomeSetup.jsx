'use client';
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

const START_FRAME = 20;
const END_FRAME = 531;

export default function useHomeSetup() {
    const lenisRef = useRef(null);
    const [showScroll, setShowScroll] = useState(false);
    const [preloadCanvas, setPreloadCanvas] = useState(false);
    const [images, setImages] = useState([]);
    const [framesReady, setFramesReady] = useState(false);

    useEffect(() => {
        const lenis = new Lenis();
        lenisRef.current = lenis;
        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    useEffect(() => {
        const loadedImages = [];
        const promises = [];
        for (let i = START_FRAME; i <= END_FRAME; i++) {
            const img = new Image();
            const p = new Promise((res, rej) => {
                img.onload = res;
                img.onerror = rej;
            });
            img.src = `/frames/frame_${String(i).padStart(4, "0")}.webp`;
            loadedImages.push(img);
            promises.push(p);
        }
        Promise.all(promises)
            .then(() => {
                setImages(loadedImages);
                setFramesReady(true);
            })
            .catch(console.error);
    }, []);

    return {
        lenisRef,
        showScroll, setShowScroll,
        preloadCanvas, setPreloadCanvas,
        images,
        framesReady,
    };
}