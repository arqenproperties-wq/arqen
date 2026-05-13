"use client";

import Image from "next/image";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
    const [isBlurred, setIsBlurred] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsBlurred(true);
            } else {
                setIsBlurred(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToContact = () => {
        const section = document.getElementById("contact");

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <Navbar />

            <Image
                width={1600}
                height={1600}
                src="/bgg.jpg"
                alt="Dubai South"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 
                    }`}
            />

            <div
                className={`absolute inset-0 bg-black/10 z-10 transition-all duration-500 ${isBlurred ? "backdrop-blur-[20px]" : "backdrop-blur-0 "
                    }`}
            />
            <div className="relative top-10 z-10 flex h-full flex-col items-center justify-center text-center text-white px-6">
                <h1 className="   md:hidden text-[38px] md:text-[56px] md:tracking-[0.08em] font-medium uppercase">
                    OFF-PLAN DEALS
                </h1>
                <h1 className="  font-poppins hidden md:block text-[38px] md:text-[56px] md:tracking-[0.08em] font-medium uppercase">
                    OFF-PLAN DEALS
                </h1>
                <div className="mt-5 space-y-1.5">

                    <p className="text-xs md:text-[16px]  font-semibold uppercase tracking-[0.06em]">
                        Booking Closing Soon - 15th May Deadline
                    </p>
                </div>
                <Link href="tel:+971 56 1425554" className="cursor-pointer mt-10 backdrop-blur-[2px] rounded-full border-2 font-semibold border-white px-8 py-3 md:text-md uppercase tracking-[0.02em] transition-all duration-300 hover:bg-white hover:text-black">
                    Call Us Now
                </Link>
            </div>

            <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
                <Image
                    width={100}
                    height={100}
                    src="/scroll.png"
                    alt="scroll down"
                    className="w-[36px] md:w-[40px] h-auto"
                />
            </div>

            <button
                onClick={scrollToContact}
                className="hidden md:block fixed -right-12 md:-right-13 top-1/2 z-50 border md:border-[#3A453C]  -translate-y-1/2 -rotate-90 rounded-t-xl bg-white px-4 md:pt-2 py-2 md:py-3 text-[#3A453C] shadow-lg transition-all duration-300 cursor-pointer hover:bg-[#3A453C] hover:text-white"
            >
                <span className="text-sm md:text-md font-bold tracking-[0.1em] uppercase">
                    Contact Us
                </span>
            </button>
        </section>
    );
}