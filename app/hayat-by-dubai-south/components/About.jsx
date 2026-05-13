"use client";
import Image from "next/image";
import React from "react";

const About = () => {
    return (
        <section className="w-full  bg-white px-4 md:px-16 py-16 xl:max-w-[1600px] mx-auto">

            <h1 className="text-[36px] md:text-[48px]   font-normal  tracking-wide uppercase text-gray-900 mb-6">
                HAYAT BY DUBAI SOUTH
            </h1>

            <p className="text-[16px] text-gray-600  mb-8 max-w-5xl">
                HAYAT by Dubai South is a luxury master-planned community spanning 10 million square feet in the Golf District, minutes from Al Maktoum International Airport. Designed around wellness and nature, it offers around 2,500 residences—including townhouses, semi-attached and standalone villas, mansions, apartments, and hotel apartments—with layouts from one to five bedrooms.
            </p>

            <p className="text-[16px] text-gray-600  mb-8 max-w-5xl">
                The community features lush parks, shaded walking trails, play areas, fitness and wellness facilities, pools, landscaped gardens, and a retail boulevard with cafés, shops, and daily essentials. Strategically located, HAYAT provides seamless access to major roads and key business hubs, offering an ideal balance of tranquillity, connectivity, and contemporary living.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">

                {/* <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-gray-300 -translate-x-1/2" /> */}

                <div className="pr-0 md:pr-8">
                    <Image
                        width={500}
                        height={500}
                        src="/about.webp"
                        alt="Hayat by Dubai South aerial view"
                        className="w-full h-auto md:h-[420px] object-cover"
                    />
                </div>

                <div className="flex items-center pl-0 md:pl-16 pt-10 md:pt-0">
                    <div className="inline-block border-l-4 border-[#3A453C] pl-6">

                        <h2 className="text-[24px] md:text-[28px]  font-light text-gray-800 mb-5">
                            Hayat. New Launch
                        </h2>

                        <ul className="space-y-3 text-[14px] text-gray-600 list-disc list-outside pl-4">
                            <li>
                                <span className="font-medium text-gray-700">Type:</span> 3-, 4- and 5- Bedroom Townhouses
                            </li>

                            <li>
                                <span className="font-medium text-gray-700">Sizes:</span>  3,217 SQ FT. - 4,953 SQ FT.
                            </li>

                            <li>
                                <span className="font-medium text-gray-700">Payment Plan:</span> 10% Down Payment + 4% DLD + 5K AED (Admin fees), 55% During Construction, 25% at Handover, 10% Post-Handover (over 12 months in 2 installments)
                            </li>

                            <li>
                                <span className="font-medium text-gray-700">Handover:</span> Q3 2028
                            </li>

                            <li>
                                <span className="font-medium text-gray-700">Starting Prices:</span> AED 3.6 M
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;