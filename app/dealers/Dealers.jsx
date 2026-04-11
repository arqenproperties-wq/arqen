"use client";

import {
    MapPin,
    Mail,
    Phone,
} from "lucide-react";

const distributors = [
    {
        title: "USA",
        company: "arqen ",
        address: "15 Lockwood Drive, SC 29401 Charleston, USA",
        email: "info@multihullcompany.com",
        phone: "+1-215-508-2704",
    },
    {
        title: "HQ Bulgaria",
        company: "arqen ",
        address:
            "18 Haralampi Dzhamdzhiev St., 7500 Silistra, Bulgaria",
        email: "info@arqen-.com",
        phone: "+359 899 943 497",
    },
    {
        title: "Türkiye",
        company: "arqen ",
        address:
            "352/29 Akyarlar mahallesi Atatürk caddesi, 48960 Bodrum / Muğla, Türkiye",
        email: "yenergayret@mirgi-yacht.com",
        phone: "+90 532 2055453",
    },
    {
        title: "Côte d'Azur",
        company: "arqen ",
        address:
            "Air promenade, 470 Promenade des Anglais, 06200 Nice, France",
        email: "nikolay@yachtblissfr.com",
        phone: "+33 6 77 01 44 58",
    },
    {
        title: "Varna",
        company: "arqen ",
        address: "Morska gara, 9000 Varna, Bulgaria",
        email: "info@lzyachting.com",
        phone: "+359 887 887 667",
    },
    {
        title: "Northern England",
        company: "arqen ",
        address:
            "5 Lake Rd, Bowness-on-Windermere, Windermere LA23 3BP, UK",
        email: "info@horizonboatsales.co.uk",
        phone: "+44 7525476783",
    },
    {
        title: "Côte d'Azur",
        company: "arqen ",
        address:
            "Air promenade, 470 Promenade des Anglais, 06200 Nice, France",
        email: "nikolay@yachtblissfr.com",
        phone: "+33 6 77 01 44 58",
    },
    {
        title: "Varna",
        company: "arqen ",
        address: "Morska gara, 9000 Varna, Bulgaria",
        email: "info@lzyachting.com",
        phone: "+359 887 887 667",
    },
    {
        title: "Northern England",
        company: "arqen ",
        address:
            "5 Lake Rd, Bowness-on-Windermere, Windermere LA23 3BP, UK",
        email: "info@horizonboatsales.co.uk",
        phone: "+44 7525476783",
    },
];

export default function Dealers() {
    return (
        <section className="bg-[#f3eee8] w-full px-5 md:px-8 xl:px-12 pt-32">
            <div className="w-full lg:max-w-[700px] xl:max-w-5xl 2xl:max-w-7xl mx-auto xl:px-8">

                {/* Heading */}
                <h2 className="text-[36px] md:text-[40px] xl:text-[60px] 2xl:text-[76px] font-centrathin font-bold mb-6 xl:mb-10 2xl:mb-16 text-[#38433b]">
                    Find a distributor
                </h2>

                {/* List */}
                <div className="space-y-10">
                    {distributors.map((item, index) => (
                        <div
                            key={index}
                            className="border-b border-neutral-300 pb-10"
                        >
                            <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-3 text-[#38433b]">

                                {/* Left */}
                                <div>
                                    <p className="text-[16px] xl:text-[18px] 2xl:text-[22px] font-centrathin font-bold tracking-wide ">
                                        {item.company}
                                    </p>

                                    <h3 className="text-[26px] xl:text-[30px] 2xl:text-[36px] font-centrathin font-bold tracking-wide ">
                                        {item.title}
                                    </h3>
                                </div>

                                {/* Right */}
                                <div className="space-y-2 font-centrathin font-bold text-[14px] xl:text-[16px] 2xl:text-[18px] ">

                                    <div className="flex items-start gap-3">
                                        <MapPin size={16} className="mt-1" />
                                        <p>{item.address}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mail size={16} />
                                        <p>{item.email}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Phone size={16} />
                                        <p>{item.phone}</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}