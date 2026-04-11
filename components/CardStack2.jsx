"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
    {
        id: 1,
        bg: "bg-[#02737C]",
        bgImage: "/card/1.webp",
        zIndex: "z-[5]",
        headline: <>Signature Residences.<br />Dubai's finest addresses.</>,
        body: "From Palm Jumeirah penthouses to Downtown sky suites — Arqen curates only the residences that set the standard, not follow it.",
        images: [

        ],
    },
    {
        id: 2,
        bg: "bg-[#38433b]",
        bgImage: "",
        zIndex: "z-[4]",
        headline: <>Investment<br />Intelligence.</>,
        body: "We identify emerging districts before they peak — Business Bay, Dubai Creek Harbour, JVT — so your portfolio moves ahead of the market.",
        images: [
            "/stack/1.jpeg",
            "/stack/2.jpg",
            "/stack/3.jpg",
        ],
    },
    {
        id: 3,
        bg: "bg-[#792f13]",
        bgImage: "",
        zIndex: "z-[3]",
        headline: <>Live Ahead.<br />Live Arqen.</>,
        body: "A boutique real estate agency redefining Dubai living. Every client gets a dedicated advisor, private viewings, and off-market access.",
        images: [
            "/stack/4.jpeg",
            "/stack/5.jpg",
            "/stack/6.jpg",

        ],
    },
];

export default function CardStack2() {
    const wrapperRef = useRef(null);
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const cards = cardsRef.current;
        const totalCards = cards.length;
        const segmentSize = 1 / totalCards;

        const cardYOffset = 5;
        const cardScaleStep = 0.075;

        cards.forEach((card, index) => {
            gsap.set(card, {
                xPercent: -50,
                yPercent: -50 + index * cardYOffset,
                scale: 1 - index * cardScaleStep,
            });
        });

        const trigger = ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom+=700 bottom",
            pin: sectionRef.current,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const activeIndex = Math.min(
                    Math.floor(progress / segmentSize),
                    totalCards - 1
                );
                const segProgress =
                    (progress - activeIndex * segmentSize) / segmentSize;

                cards.forEach((card, index) => {
                    if (index < activeIndex) {
                        gsap.set(card, { yPercent: -250, rotationX: 35 });
                    } else if (index === activeIndex) {
                        gsap.set(card, {
                            yPercent: gsap.utils.interpolate(-50, -200, segProgress),
                            rotationX: gsap.utils.interpolate(0, 35, segProgress),
                            scale: 1,
                        });
                    } else {
                        const behindIndex = index - activeIndex;
                        gsap.set(card, {
                            yPercent: -50 + (behindIndex - segProgress) * cardYOffset,
                            rotationX: 0,
                            scale: 1 - (behindIndex - segProgress) * cardScaleStep,
                        });
                    }
                });
            },
        });

        return () => {
            trigger.kill();
            ScrollTrigger.killAll();
        };
    }, []);

    return (
        <div ref={wrapperRef} style={{ height: "400vh" }} className="bg-[#f3eee8] section-about relative">
            <section
                ref={sectionRef}
                className="relative h-screen perspective-[850px]  pointer-events-none"
            >
                {CARDS.map((card, i) => (
                    <div
                        key={card.id}
                        ref={(el) => (cardsRef.current[i] = el)}
                        className={`absolute top-1/2 left-1/2 w-[95%] h-[90%] p-4 md:p-6 xl:pl-10 xl:py-10 rounded-[24px] md:rounded-[30px] xl:rounded-[40px]
                                 text-white flex gap-4 origin-bottom will-change-transform overflow-hidden
                                 ${card.bgImage ? "" : card.bg} ${card.zIndex}`}
                        style={card.bgImage ? {
                            backgroundImage: `url(${card.bgImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        } : {}}
                    >
                        {card.id === 1 && (
                            <div className="w-full h-full bg-[#00000040] absolute top-0 left-0"></div>
                        )}                        <div className="w-full flex flex-col justify-between overflow-hidden">
                            <div className="h-fit relative z-10">
                                <p className='text-[32px] md:text-[40px] xl:text-[54px] leading-10 md:leading-12 xl:leading-16 font-centrathin tracking-tight  text-white'>
                                    {card.headline}
                                </p>
                            </div>

                            <div className="md:hidden w-full h-full gap-4">
                                <div className="w-full h-1/2 flex justify-end items-end relative top-10 z-10">
                                    <div
                                        className="h-[85%] aspect-2/2 rounded-[14px] bg-cover bg-center"
                                        style={{ backgroundImage: `url(${card.images[0]})` }}
                                    />
                                </div>

                                <div className="w-full h-1/2 flex justify-start relative bottom-10">
                                    <div
                                        className="h-[85%] aspect-2/2 rounded-[14px] bg-cover bg-center"
                                        style={{ backgroundImage: `url(${card.images[1]})` }}
                                    />
                                </div>
                            </div>

                            <div className="relative w-full h-fit xl:h-[35%] flex flex-col-reverse xl:flex-row gap-10 z-10">
                                <h1 className="w-full xl:w-[40%] font-centrathin text-[16px] md:text-[18px] xl:text-[24px]">
                                    {card.body}
                                </h1>
                                <div className="hidden md:flex w-full gap-4 overflow-hidden">
                                    {card.images.slice(0, 3).map((img, index) => (
                                        <div
                                            key={index}
                                            className="w-full aspect-3/2 rounded-[14px] bg-cover bg-center"
                                            style={{ backgroundImage: `url(${img})` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}