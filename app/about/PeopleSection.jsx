"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PeopleSection() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const centerColRef = useRef(null);
    const rightColRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const text = textRef.current;
        const centerCol = centerColRef.current;
        const rightCol = rightColRef.current;

        gsap.set([centerCol, rightCol], { y: 0 });


        /* ===============================
           COLUMN MOVEMENT
        =============================== */

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section-bg',
                start: "top bottom",
                end: `bottom top`,
                scrub: 1,
                // markers: true
            }
        });

        tl.to(centerCol, {
            y: -400,
            ease: "easeIn"
        }, 0)
            .to(rightCol, {
                y: -1000,
                ease: "easeIn"
            }, 0);

        /* ===============================
           TEXT PIN
        =============================== */

        ScrollTrigger.matchMedia({

            // ✅ Mobile
            "(min-width: 768px)": function () {

                ScrollTrigger.create({
                    trigger: ".section-bg",
                    start: "top top",
                    end: "bottom top+=20%",
                    pin: text,
                    pinSpacing: false,
                    anticipatePin: 1,
                    // markers: true
                });

            },

            // ✅ Tablet + Desktop
            "(max-width: 768px)": function () {

                ScrollTrigger.create({
                    trigger: ".section-bg",
                    start: "top top",
                    end: "bottom top+=20%",
                    pin: false, // no pin
                });

            }

        });

        // return () => {
        //     tl.scrollTrigger.kill();
        //     tl.kill();
        //     pinST.kill();
        // };

    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-[#f3eee8] w-full h-fit py-12 px-5  relative z-20"
        >
            <div className="section-bg w-full h-[125vh] xl:h-[125vh] absolute top-0 left-0 "></div>
            <div className="max-w-full mx-auto ">

                <div className="grid grid-cols-12 gap-6 h-[125vh] xl:h-[150vh] ">

                    {/* ✅ PINNED TEXT */}
                    <div
                        ref={textRef}
                        className=" col-span-10 md:col-span-6 "
                    >
                        <h2 className="text-[36px] xl:text-[48px] font-opensans font-light tracking-tight [transform:scaleY(0.75)]">
                            The people of <br /> ELICA Yard
                        </h2>
                    </div>

                    {/* CENTER */}
                    <div
                        ref={centerColRef}
                        className="col-span-6 md:col-span-3 h-fit flex flex-col gap-3 xl:gap-6 relative top-80 lg:top-40 overflow-hidden"
                    >
                        {[1, 2, 3].map(i => (
                            <div key={i} className="rounded-xl xl:rounded-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800"
                                    className="w-full aspect-[2.25/2.75] object-cover"
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>

                    {/* RIGHT */}
                    <div
                        ref={rightColRef}
                        className="col-span-6 md:col-span-3 h-fit flex flex-col gap-3 xl:gap-6  relative top-200 lg:top-100 overflow-hidden"
                    >
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className=" rounded-xl xl:rounded-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800"
                                    className="w-full aspect-[2.25/2.75] object-cover"
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div >
        </section >
    );
}