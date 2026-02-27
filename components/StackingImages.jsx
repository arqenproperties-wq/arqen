"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
    "/stack/1.jpeg",
    "/stack/2.jpg",
    "/stack/3.jpg",
    "/stack/4.jpeg",
    "/stack/5.jpg",
    "/stack/6.jpg",
];

export default function StackingImages() {
    const sectionRef = useRef(null);
    const pinnedRef = useRef(null);
    const imagesRef = useRef([]);
    const textRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const pinned = pinnedRef.current;
        const images = imagesRef.current;
        const count = images.length;

        const startRadius =
            Math.max(window.innerWidth, window.innerHeight) * 0.45;

        const baseAngles = images.map((_, i) => (360 / count) * i - 90);
        const orbitSweep = 200;

        const PHASE1_END = 0.4;
        const PHASE2_START = 0.4;

        function applyTransforms(progress) {

            const textFadeEnd = 0.3;
            const textOpacity = gsap.utils.clamp(
                0.15,
                1,
                1 - progress / textFadeEnd
            );

            gsap.set(textRef.current, {
                opacity: textOpacity,
            });


            images.forEach((el, i) => {
                const sliceSize = (PHASE1_END / count) * 1.8;
                const phase1LocalStart = i * (PHASE1_END / count);

                const phase1Progress = gsap.utils.clamp(
                    0,
                    1,
                    (progress - phase1LocalStart) / sliceSize
                );

                const scale =
                    gsap.parseEase("power1.inOut")(phase1Progress);

                const phase2Progress = gsap.utils.clamp(
                    0,
                    1,
                    (progress - PHASE2_START) /
                    (1 - PHASE2_START)
                );

                const spiralEased =
                    gsap.parseEase("power2.inOut")(phase2Progress);

                const radius = startRadius * (1 - spiralEased);

                const fullEased =
                    gsap.parseEase("power1.in")(progress);

                const angle =
                    baseAngles[i] + orbitSweep * (1 - fullEased);

                const rad = (angle * Math.PI) / 180;

                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;

                gsap.set(el, {
                    x,
                    y,
                    rotation: 0,
                    scale,
                    transformOrigin: "center center",
                });
            });
        }

        applyTransforms(0);

        const trigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: pinned,
            anticipatePin: 1,
            scrub: 1.4,
            onUpdate(self) {
                applyTransforms(self.progress);
            },
        });

        return () => {
            trigger.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="h-[500vh] bg-[#f3eee8]"
        >
            <div ref={pinnedRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div ref={textRef} className="absolute text-center pointer-events-none select-none z-0">
                    <p className="text-[48px] xl:text-[84px] leading-16  font-opensans font-light [transform:scaleY(0.75)] text-black opacity-100">
                        Arqen
                    </p>
                    <p className="text-[28px] xl:text-[32px]  leading-6 xl:leading-16  font-opensans font-light [transform:scaleY(0.75)] italic text-[#2c2620] opacity-80">
                        A place designed for the life you envision
                    </p>
                </div>

                {IMAGES.map((src, i) => (
                    <div
                        key={i}
                        ref={(el) => (imagesRef.current[i] = el)}
                        className=" absolute w-[225px] md:w-[250px] xl:w-[320px] 2xl:w-[360px] aspect-square rounded-[14px] overflow-hidden will-change-transform"
                        style={{ zIndex: i + 1 }}
                    >
                        <img
                            src={src}
                            alt={`photo-${i}`}
                            className="w-full h-full object-cover block"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}