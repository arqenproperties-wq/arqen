"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT_PANELS = [
    {
        id: "panel-1",
        side: "left",
        progressStart: 0.15,
        progressEnd: 0.38,
        headline: "Beyond the skyline",
        body: "Dubai's most coveted addresses",
    },
    {
        id: "panel-2",
        side: "right",
        progressStart: 0.40,
        progressEnd: 0.65,
        headline: "Curated for the few",
        body: "Residences that define a new standard",
    },
    {
        id: "panel-3",
        side: "left",
        progressStart: 0.68,
        progressEnd: 0.90,
        headline: "Live Ahead",
        body: "Live Arqen",
    },
];

export const VideoOnScroll = ({ images, startFrame = 1, endFrame = 531 }) => {
    const canvasRef = useRef(null);
    const wrapperRef = useRef(null);
    const textRef = useRef(null);
    const panelRefs = useRef({});

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !images.length) return;

        const context = canvas.getContext("2d");
        const frame = { index: 0 };

        const end = endFrame ?? images.length - 1;
        const frameImages = images.slice(startFrame, end + 1);

        context.drawImage(frameImages[0], 0, 0, canvas.width, canvas.height);

        gsap.to(textRef.current, {
            y: -80,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "top+=300 top",
                scrub: true,
            },
        });

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
                onUpdate: (self) => {
                    const progress = self.progress;

                    const img = frameImages[Math.floor(frame.index)];
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);

                    if (progress >= 0.9) {
                        gsap.to(wrapperRef.current, { opacity: 0, duration: 0.4, ease: "power2.out", overwrite: true });
                    } else {
                        gsap.to(wrapperRef.current, { opacity: 1, duration: 0.2, overwrite: true });
                    }

                    TEXT_PANELS.forEach((panel) => {
                        const el = panelRefs.current[panel.id];
                        if (!el) return;

                        const { progressStart, progressEnd, side } = panel;
                        const midPoint = (progressStart + progressEnd) / 2;
                        const offsetX = side === "left" ? -60 : 60;

                        if (progress < progressStart) {
                            gsap.set(el, { opacity: 0, x: offsetX });
                        } else if (progress < midPoint) {
                            const t = (progress - progressStart) / (midPoint - progressStart);
                            gsap.set(el, { opacity: t, x: offsetX * (1 - t) });
                        } else if (progress < progressEnd) {
                            const t = (progress - midPoint) / (progressEnd - midPoint);
                            gsap.set(el, { opacity: 1 - t, x: offsetX * t });
                        } else {
                            gsap.set(el, { opacity: 0, x: offsetX });
                        }
                    });
                },
            },
            onUpdate: () => {
                const img = frameImages[Math.floor(frame.index)];
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, [images, startFrame, endFrame]);

    return (
        <div ref={wrapperRef} className="w-full h-screen absolute top-0 left-0 z-10">


            <div
                ref={textRef}
                className="text-white text-center hidden md:flex  flex-col justify-center items-center font-centrathin text-[20px] xl:text-[20px] absolute bottom-6 left-1/2 -translate-x-1/2 "
            >
                <p className="relative -left-4 leading-6">scroll</p>
                <p className="relative left-0 leading-6">to</p>
                <p className="relative left-6 leading-6">explore</p>
            </div>


            {TEXT_PANELS.map((panel) => (
                <div
                    key={panel.id}
                    ref={(el) => (panelRefs.current[panel.id] = el)}
                    style={{ opacity: 0 }}
                    className={` font-centrathin
            absolute bottom-14  pointer-events-none
            ${panel.side === "left" ? "left-10 md:left-16 text-left" : "right-10 md:right-16 text-right"}
          `}
                >

                    <div
                        className={`
              h-px w-16 bg-white/60 mb-4
              ${panel.side === "right" ? "ml-auto" : ""}
            `}
                    />
                    <h2
                        className="text-white font-centrathin tracking-tight   text-[40px] xl:text-[60px] 2xl:text-[66px] leading-12 2xl:leading-20"

                    >
                        {panel.headline}
                    </h2>
                    <p
                        className="text-white font-centrathin   text-[18px] xl:text-[22px] 2xl:text-[24px] mt-2"

                    >
                        {panel.body}
                    </p>
                </div>
            ))}
            <div className="w-full h-screen bg-[#00000010] absolute top-0 left-0"></div>
            <canvas
                ref={canvasRef}
                width={1920}
                height={1080}
                className="w-full h-screen object-cover"
            />
        </div>
    );
};