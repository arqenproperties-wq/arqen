import React, { useRef } from 'react'
import { VideoOnScroll } from './VideoOnScroll'
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = ({ showScroll, images }) => {
    const textRef = useRef(null);
    const headingRef = useRef(null)
    useGSAP(() => {
        gsap.to(textRef.current, {
            y: 0,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "top+=100 top",
                scrub: true,
            }
        });

        const letters = headingRef.current.querySelectorAll("span")

        gsap.from(letters, {
            yPercent: 150,
            duration: 1.0,
            ease: "expo.out",
            stagger: {
                each: 0.025,
                from: "start"
            }
        })

    }, []);
    return (
        <div className='relative  overflow-hidden'>
            <div className="w-full h-[10000px] relative hero overflow-hidden bg-[#f3eee8]" >
                {/* <Image
                    src="/frame_0020.webp"
                    alt="last frame"
                    width={1000}
                    height={1000}
                    className='w-full h-screen object-cover absolute top-0 left-0'
                /> */}
            </div>
            <div style={{ opacity: showScroll ? 1 : 0 }}>
                <VideoOnScroll images={images} />
            </div>
            <div className="w-full h-screen absolute -top-16 left-5 md:top-0 md:left-0 z-20 flex items-end md:justify-center md:items-center">
                <div className="overflow-hidden py-2">
                    <h1
                        ref={headingRef}
                        className="md:text-center text-[40px] xl:text-[60px] 2xl:text-[66px] 
  leading-12 2xl:leading-20 font-opensans font-light tracking-tight 
  text-white [transform:scaleY(0.8)]"
                    >
                        {"Experience Dubai,".split("").map((char, i) => (
                            <span key={`line1-${i}`} className="inline-block">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}

                        <br className="block md:hidden" />

                        {"reimagined".split("").map((char, i) => (
                            <span key={`line2-${i}`} className="inline-block">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h1>
                </div>
            </div>
            <div ref={textRef} className="w-full h-screen absolute top-0 right-0 z-20 md:hidden flex items-end ">
                <div className="flex items-center gap-1 absolute bottom-24 -right-10 rotate-90  text-[16px]  leading-8 font-opensans font-light tracking-[3px] text-white [transform:scaleY(0.8)]">
                    <div>
                        explore
                    </div>
                    <div className='w-[60px] h-[2px] bg-white '>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
