"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const div1Ref = useRef(null);
    const div2Ref = useRef(null);
    const div3Ref = useRef(null);
    const div4Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax on the whole image div
            gsap.to(div1Ref.current, {
                yPercent: -100,
                ease: "easeIn",
                scrollTrigger: {
                    trigger: div1Ref.current,
                    start: "top bottom",
                    end: "bottom top-=800",
                    scrub: true,
                },
            });

            gsap.to(div2Ref.current, {
                yPercent: -100,
                ease: "easeIn",
                scrollTrigger: {
                    trigger: div2Ref.current,
                    start: "top bottom",
                    end: "bottom top-=800",
                    scrub: true,
                },
            });

            gsap.to(div3Ref.current, {
                yPercent: -125,
                ease: "easeIn",
                scrollTrigger: {
                    trigger: div3Ref.current,
                    start: "top bottom",
                    end: "bottom top-=800",
                    scrub: true,
                },
            });

            gsap.to(div4Ref.current, {
                yPercent: -125,
                ease: "easeIn",
                scrollTrigger: {
                    trigger: div4Ref.current,
                    start: "top bottom",
                    end: "bottom top-=800",
                    scrub: true,
                },
            });
        })


        return () => ctx.revert();
    }, []);

    return (
        <section className="bg-[#f3eee8] px-6 xl:px-10 2xl:px-12  py-20 xl:py-24 2xl:py-28 w-full  min-h-screen relative z-10">
            <div className="w-full flex flex-col gap-100 xl:gap-100 relative top-0 left-0">

                {/* Text block — top right aligned (offset left via padding) */}
                <div className="xl:max-w-[85%] xl:pl-[38%] ">
                    {/* <p
                        className="text-[#7a9e8e] text-[10px] md:text-[12px] xl:text-[14px] 2xl:text-[15px] tracking-[0.22em] uppercase font-sourcesans3 "
                    >
                        Powered by Elica Group
                    </p> */}
                    <h2
                        className="text-black font-opensans [transform:scaleY(0.75)] text-[32px] md:text-[38px] xl:text-[44px] 2xl:text-[50px]  font-light leading-[44px] md:leading-[48px] xl:leading-[56px] 2xl:leading-[62px] "
                    >
                        Buying a home in Dubai can feel exciting, but also confusing. There are so many communities and options. Getting advice from experts makes buying easier.
                    </h2>
                </div>
                <div className="xl:max-w-[50%]  relative xl:pl-20">
                    <h2
                        className="text-black font-opensans [transform:scaleY(0.75)] text-[32px] md:text-[38px] xl:text-[44px] 2xl:text-[50px]  font-light leading-[44px] md:leading-[48px] xl:leading-[56px] 2xl:leading-[62px] "
                    >
                        We believe good property decisions come from knowledge, not guesswork. That’s why we focus on the most popular areas, waterfront communities, luxury villas, and townhouses with strong growth potential.
                    </h2>
                </div>
                <div className="xl:max-w-[100%] xl:pl-[50%] ">

                    <h2
                        className="text-black font-opensans [transform:scaleY(0.75)] text-[32px] md:text-[38px] xl:text-[44px] 2xl:text-[50px]  font-light leading-[44px] md:leading-[48px] xl:leading-[56px] 2xl:leading-[62px] "
                    >
                        We study market trends, compare communities and check new launches. This helps buyers choose properties that fit their lifestyle and long-term plans.
                        <br /> No hype. No pressure. Just real expertise.

                    </h2>
                </div>
                <div className="xl:max-w-[45%]  relative xl:pl-20">
                    <h2
                        className="text-black font-opensans [transform:scaleY(0.75)] text-[32px] md:text-[38px] xl:text-[44px] 2xl:text-[50px]  font-light leading-[44px] md:leading-[48px] xl:leading-[56px] 2xl:leading-[62px] "
                    >
                        Dubai keeps growing and changing. Our goal is to help people make smart property choices with confidence.                    </h2>
                </div>
                {/* Two images staggered — image1 left, image2 right overlapping vertically */}

            </div>

            <div className="w-full h-full absolute top-120 xl:top-150 left-0 px-6 xl:px-10">
                <div className="relative w-full flex justify-start">

                    {/* Image 1 — left, starts below the text */}
                    <div
                        ref={div1Ref}
                        className="xl:w-[46%] rounded-xl xl:rounded-2xl overflow-hidden will-change-transform"
                    >
                        <img
                            src="/stack/1.jpeg"
                            alt="Yacht building team"
                            className="w-full md:w-[80%] xl:w-full aspect-3/2 xl:aspect-[3/1.9] rounded-xl xl:rounded-2xl  object-cover block"
                        />
                    </div>
                </div>
                <div className="relative w-full flex justify-end items-end top-20 xl:-top-30  xl:right-20">

                    <div
                        ref={div2Ref}
                        className="w-[60%] xl:w-[32%] rounded-xl xl:rounded-2xl  will-change-transform "
                    >
                        <img
                            src="/stack/2.jpg"
                            alt="Luxury catamaran at sunset"
                            className="w-full md:w-[80%] xl:w-full aspect-[2/2.5] xl:aspect-[2/2.5] rounded-xl xl:rounded-2xl  object-cover block"
                        />
                    </div>
                </div>


                <div className="relative w-full flex justify-center top-130 xl:-top-0 xl:right-32 ">

                    <div
                        ref={div3Ref}
                        className="w-[95%] xl:w-[40%] rounded-xl xl:rounded-2xl overflow-hidden will-change-transform "
                    >
                        <img
                            src="/stack/3.jpg"
                            alt="Luxury catamaran at sunset"
                            className="w-full md:w-[80%] xl:w-full aspect-[3/2.2] xl:aspect-[3/2] rounded-xl xl:rounded-2xl  object-cover block"
                        />
                    </div>
                </div>
                <div className="relative w-full flex justify-start top-300 lg:top-100 ">

                    {/* Image 1 — left, starts below the text */}
                    <div
                        ref={div4Ref}
                        className="xl:w-[46%] rounded-xl xl:rounded-2xl overflow-hidden will-change-transform"
                    >
                        <img
                            src="/stack/1.jpeg"
                            alt="Yacht building team"
                            className="w-full md:w-[80%] xl:w-full aspect-3/2 xl:aspect-[3/1.9] rounded-xl xl:rounded-2xl  object-cover block"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}