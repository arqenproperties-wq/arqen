"use client";
import React from "react";

const team = [
    {
        name: "Shehzam",
        role: "Co-Founder",
        image: "/team/shehzam.jpg",
    },
    {
        name: "Raza",
        role: "Co-Founder",
        image: "/team/raza.jpg",
    },
];

const MeetTeamPage = () => {
    return (
        <div className="w-full bg-[#f3eee8] flex flex-col items-center pt-32 md:pt-32 px-5 xl:px-6">

            {/* PAGE HEADING */}
            <h1 className="text-[28px] xl:text-[44px] font-opensans font-light tracking-tight text-black  mb-4 text-center">
                Meet the Team
            </h1>

            <p className="max-w-3xl text-center text-[16px] xl:text-[19px] font-sourcesans3 text-gray-600 mb-16 leading-relaxed">
                Meet <span className="text-black font-medium">Shehzam and Raza</span>, who bring a combined  <span className="text-black font-medium">17 years of experience in
                    Dubai’s real estate market.</span> Both founders have worked with leading real
                estate companies in the region and have extensive experience across
                <span className="text-black font-medium">luxury properties, villa communities, and investor portfolios.</span>
            </p>

            {/* TEAM CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full lg:max-w-3xl">

                {team.map((member, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    >

                        {/* IMAGE */}
                        <div className="w-full h-[350px] bg-black overflow-hidden">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* INFO */}
                        <div className="px-6 py-6 text-center">

                            <h3 className="font-opensans text-[22px] font-light tracking-tight mb-1 [transform:scaleY(0.85)]">
                                {member.name}
                            </h3>

                            <p className="font-sourcesans3 text-gray-600 text-[15px]">
                                {member.role}
                            </p>

                        </div>

                    </div>
                ))}

            </div>

        </div >
    );
};

export default MeetTeamPage;