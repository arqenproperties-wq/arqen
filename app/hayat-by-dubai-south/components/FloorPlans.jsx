"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const plans = [
    "/floorplan7.webp",
    "/floorplan5.webp",
    "/floorplan7.webp",

];

export default function FloorPlans() {
    const [activeIndex, setActiveIndex] = useState(0);

    const prevSlide = () => {
        setActiveIndex((prev) =>
            prev === 0 ? plans.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setActiveIndex((prev) =>
            prev === plans.length - 1 ? 0 : prev + 1
        );
    };

    const getIndex = (offset) => {
        return (activeIndex + offset + plans.length) % plans.length;
    };

    return (
        <section className="overflow-hidden w-full xl:max-w-[1600px] mx-auto py-20">
            <div className="mb-6 md:mb-16 px-6 md:px-10">
                <h2 className="text-[36px] md:text-[48px]   font-normal  tracking-wide uppercase text-gray-900">
                    Floor Plans
                </h2>
            </div>

            <div className="relative flex items-center justify-center">

                <div className="hidden lg:block absolute left-0 xl:left-10">
                    <div className="relative h-[360px] w-[180px] overflow-hidden  opacity-70 scale-[0.88] transition-all duration-500">
                        <Image
                            width={1600}
                            height={1600}
                            src={plans[getIndex(-1)]}
                            alt=""
                            className="object-contain p-4"
                        />
                    </div>
                </div>

                <button
                    onClick={prevSlide}
                    className="absolute left-0 md:left-[18%] border border-black/10 z-20 flex h-10 md:h-20 w-10 md:w-20 items-center justify-center rounded-full bg-white  transition-all duration-300 hover:scale-105"
                >
                    <ChevronLeft
                        size={52}
                        strokeWidth={1.5}
                        className="text-black"
                    />
                </button>

                <div className="relative h-[260px] w-[90%] md:h-[500px] md:w-[760px] overflow-hidden  ">
                    <Image
                        key={plans[activeIndex]}
                        width={1600}
                        height={1600}
                        src={plans[activeIndex]}
                        alt=""
                        className="object-contain p-4 md:p-6 transition-all duration-500"
                    />
                </div>

                <button
                    onClick={nextSlide}
                    className="absolute right-0 md:right-[18%] border border-black/10 z-20 flex h-10 md:h-20 w-10 md:w-20 items-center justify-center rounded-full bg-white  transition-all duration-300 hover:scale-105"
                >
                    <ChevronRight
                        size={52}
                        strokeWidth={1.5}
                        className="text-black"
                    />
                </button>

                <div className="hidden lg:block absolute right-0 xl:right-10">
                    <div className="relative h-[360px] w-[180px] overflow-hidden  opacity-70 scale-[0.88] transition-all duration-500">
                        <Image
                            width={1600}
                            height={1600}
                            src={plans[getIndex(1)]}
                            alt=""
                            className="object-contain p-4"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3">
                {plans.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === index
                            ? "w-10 bg-[#1f2937]"
                            : "w-2.5 bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}