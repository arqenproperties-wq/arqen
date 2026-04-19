'use client'
import Link from "next/link";
import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanity/lib/client";
import { useRouter } from "next/navigation";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);


const MoreStories = ({ posts }) => {
    const router = useRouter();

    return (
        <div className="w-full md:max-w-lg lg:max-w-xl xl:max-w-[750px] 2xl:max-w-[832px]  mx-auto p-5 2xl:p-8 2xl:mt-16">
            <h2 className="font-centrathin font-bold tracking-tight text-[30px] xl:text-[34px] 2xl:text-[38px] leading-10 2xl:leading-16   text-[#38433b]">
                More Stories worth sharing
            </h2>

            <div>
                {posts.map((post) => {
                    const imageUrl = post.image
                        ? urlFor(post.image).url()
                        : null;

                    return (
                        <div onClick={() => router.push(`/blog/${post.slug.current}`)} key={post._id}>
                            <div className="w-full flex flex-col lg:flex-row justify-evenly gap-4 2xl:gap-8 mt-8 2xl:mt-10 cursor-pointer">

                                <div className="w-full lg:w-1/2">
                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            alt={post.title}
                                            className="w-full aspect-[3/2.25] lg:h-full 2xl:h-auto  object-cover"
                                            width="1000"
                                            height="1000"
                                        />
                                    )}
                                </div>

                                <div className="w-full lg:w-1/2 flex flex-col justify-between">
                                    <div>
                                        <h1 className="font-centrathin font-bold text-[#38433b] tracking-tight text-[26px] lg:text-[27px] xl:text-[30px] 2xl:text-[34px] leading-9 xl:leading-10  2xl:leading-11  relative bottom-5 ">
                                            {post.title}
                                        </h1>

                                        <div className="hidden lg:block relative bottom-6 max-w-none font-sourcesans3 text-[13px] xl:text-[14px] 2xl:text-[16px] tracking-wide leading-5 2xl:leading-6 text-gray-500">
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
                                            {new Date(post.publishedAt).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-gray-500 scale-y-30 mt-8 2xl:mt-10" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MoreStories;

const components = {
    block: {
        normal: ({ children }) => (
            <p className="mb-4">{children}</p>
        ),
    },
};