'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { client } from '../../sanity/lib/client'
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const components = {
    block: {
        normal: ({ children }) => (
            <p className="mb-4">{children}</p>
        ),
    },
};

gsap.registerPlugin(ScrollTrigger);

function BlogList({ posts }) {
    const headingRef = useRef(null);
    const postsRef = useRef(null);
    const containerRef = useRef(null);
    const router = useRouter();

    useGSAP(() => {
        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${postsRef.current.scrollHeight - headingRef.current.offsetHeight}`,
            pin: headingRef.current,
            pinSpacing: false,
        });

        return () => trigger.kill();
    }, []);

    return (
        <div ref={containerRef} className="w-full lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto  pt-32">
            <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-8 text-[#38433b]">

                {/* ── Pinned heading (left) ── */}
                <div ref={headingRef} className="hidden lg:block w-full lg:w-[35%] flex-shrink-0 px-5 md:px-10 lg:px-0">
                    <h2 className=" font-centrathin font-bold  tracking-tight  text-[36px] md:text-[38px] xl:text-[48px] 2xl:text-[66px] 2xl:leading-18  pt-10 text-[#38433b] ">
                        Stories worth your time
                    </h2>
                </div>
                <div className="lg:hidden w-full lg:w-[35%] flex-shrink-0 px-5 md:px-10 lg:px-0">
                    <h2 className=" font-centrathin font-bold  tracking-tight  text-[36px] md:text-[38px] xl:text-[48px] 2xl:text-[66px] 2xl:leading-18 relative top-10  text-[#38433b] ">
                        Stories worth your time
                    </h2>
                </div>
                {/* ── Scrolling posts (right) ── */}
                <div ref={postsRef} className="w-full lg:w-[65%] ">
                    {posts.map((post) => {
                        const imageUrl = post.image ? urlFor(post.image).url() : null;

                        return (
                            <div
                                onClick={() => router.push(`/blog/${post.slug.current}`)}
                                key={post._id} className="px-5 md:px-10 lg:px-0 cursor-pointer">
                                <div className="w-full flex flex-col lg:flex-row gap-8 mt-8 lg:mt-10">

                                    {/* Image */}
                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            alt={post.title}
                                            className="w-full lg:w-1/2 aspect-[3/2.2] lg:h-auto object-cover"
                                            width="1000"
                                            height="1000"
                                        />
                                    )}

                                    {/* Content */}
                                    <div className="w-full lg:w-1/2 flex flex-col justify-between gap-4">
                                        <div>
                                            <h1 className="font-centrathin font-bold tracking-tight text-[26px] lg:text-[27px] xl:text-[30px] 2xl:text-[34px] leading-9 xl:leading-10  2xl:leading-11  relative bottom-5 text-[#38433b]">
                                                {post.title}
                                            </h1>
                                            <div className="hidden lg:block relative bottom-6 max-w-none font-centrathin text-[13px] xl:text-[14px] 2xl:text-[16px] tracking-wide leading-5 2xl:leading-6 text-gray-500">
                                                {Array.isArray(post.body) && (
                                                    <PortableText
                                                        value={[post.body[0]]}
                                                        components={components}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <Link
                                                href={`/blog/${post.slug.current}`}
                                                className="font-centrathin text-[14px] xl:text-[15px] 2xl:text-[16px] text-[#38433b]"
                                            >
                                                Read more
                                            </Link>
                                            <p className="font-centrathin text-[14px] xl:text-[15px] 2xl:text-[16px] text-[#4c5950]">
                                                {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-gray-500 scale-y-30 mt-8 lg:mt-10" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default BlogList