import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../sanity/lib/client";
import Link from 'next/link';
import { Image } from "next-sanity/image";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

// ✅ Fetch only 3 posts + required fields
const POSTS_QUERY = `*[
  _type == "post" &&
  defined(slug.current)
]| order(publishedAt desc)[0...4]{
  _id,
  title,
  slug,
  publishedAt,
  image,
  body
}`;

const options = { next: { revalidate: 30 } };




const Stories = async () => {
    const posts = await client.fetch(POSTS_QUERY, {}, options);

    return (
        <div className="section-blog w-full min-h-screen bg-[#f3eee8] flex flex-col justify-center items-center py-20  2xl:py-40">

            <h1 className="text-[36px] 2xl:text-[60px] font-opensans font-light tracking-tight text-black [transform:scaleY(0.75)] mb-16 text-center">
                Latest stories
            </h1>
            <div className='w-full lg:max-w-5xl xl:lg:max-w-6xl 2xl:max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-8 lg:gap-20 xl:gap-28 2xl:gap-40 px-5 lg:px-12 xl:px-16 2xl:px-16'>
                {posts.map((post) => {
                    const imageUrl = post.image
                        ? urlFor(post.image).url()
                        : null;
                    return (
                        <div key={post._id} className='space-y-2 2xl:space-y-4'>
                            <div className="w-full aspect-4/3 bg-[#d9d9d9] rounded-[14px] overflow-hidden">
                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        alt={post.title}
                                        width={500}
                                        height={500}
                                        className="w-full h-full object-cover rounded-[14px] transition-transform duration-700 hover:scale-105"
                                    />
                                )}
                            </div>

                            <h2 className="text-[24px] font-opensans font-light text-black [transform:scaleY(0.75)]">
                                {post.title}
                            </h2>

                            <Link
                                href={`/blog/${post.slug.current}`}
                                className="text-black/70 cursor-pointer hover:underline">
                                Read more
                            </Link>
                        </div>
                    )
                }
                )
                }
            </div>
        </div>
    )
}

export default Stories