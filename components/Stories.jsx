import Image from 'next/image'
import React from 'react'

const STORIES = [
    {
        id: 1,
        image: "/stories/4.jpg",
        title: "Arqen expands into Palm Jumeirah with exclusive waterfront villas",
    },
    {
        id: 2,
        image: "/stories/2.webp",
        title: "Arqen announces strategic partnership in Downtown Dubai",
    },
    {
        id: 3,
        image: "/stories/3.jpg",
        title: "Dubai Creek Harbour emerges as 2026’s prime investment hotspot",
    },
    {
        id: 4,
        image: "/stories/1.webp",
        title: "Arqen presents private off-market residences for global investors",
    },
];

const Stories = () => {
    return (
        <div className="section-blog w-full min-h-screen bg-[#f3eee8] flex flex-col justify-center items-center py-20  2xl:py-40">

            {/* Heading */}
            <h1 className="text-[36px] 2xl:text-[60px] font-opensans font-light tracking-tight text-black [transform:scaleY(0.75)] mb-16 text-center">
                Latest stories
            </h1>
            <div className='w-full lg:max-w-5xl xl:lg:max-w-6xl 2xl:max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-8 lg:gap-20 xl:gap-28 2xl:gap-40 px-5 lg:px-12 xl:px-16 2xl:px-16'>
                {STORIES.map((story) => (
                    <div key={story.id} className='space-y-2 2xl:space-y-4'>
                        <div className="w-full aspect-4/3 bg-[#d9d9d9] rounded-[14px] overflow-hidden">
                            <Image
                                src={story.image}
                                alt={story.title}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover rounded-[14px] transition-transform duration-700 hover:scale-105"
                            />
                        </div>

                        <h2 className="text-[24px] font-opensans font-light text-black [transform:scaleY(0.75)]">
                            {story.title}
                        </h2>

                        <p className="text-black/70 cursor-pointer hover:underline">
                            Read more
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stories