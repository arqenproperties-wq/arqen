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
        <section className="bg-[#f3eee8] px-6 lg:px-16 xl:px-0 2xl:px-0 py-0 xl:py-24 2xl:py-28 w-full  relative z-10">
            <div className="w-full flex flex-col  relative top-0 left-0">

                <div className="xl:max-w-[100%] xl:pl-[20%] 2xl:pl-[25%] xl:pr-20 2xl:pr-40">
                    <h2 className="text-[#38433b] font-centrathin font-bold  text-[30px] md:text-[36px] xl:text-[42px] 2xl:text-[48px]  leading-[44px] md:leading-[48px] xl:leading-[56px] 2xl:leading-[62px]">

                        <span className="block mb-10 xl:mb-14">
                            Arqen was built on more than 20 years of combined experience in Dubai real estate.
                        </span>

                        <span className="block mb-10 xl:mb-14">
                            The company was created in response to a market that often prioritises speed over quality.
                            Arqen takes a different approach: clear advice, strong systems, and service built on trust.
                        </span>

                        <span className="block mb-10 xl:mb-14">
                            With expertise across luxury apartments, villas, waterfront properties, and investment portfolios,
                            Arqen combines market knowledge with a long-term view. The focus is not only on helping
                            clients buy or sell property, but on creating better standards within the industry through
                            discipline, transparency, training, and consistency.
                        </span>

                        <span className="block">
                            Where you live shapes how you live, and what you invest in reflects what matters.
                            Think ahead. Think Arqen.
                        </span>

                    </h2>
                </div>

            </div>

            {/* <div className="w-full h-full absolute top-120 xl:top-150 left-0 px-6 xl:px-10">
                <div className="relative w-full flex justify-start">

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
            </div> */}
        </section>
    );
}