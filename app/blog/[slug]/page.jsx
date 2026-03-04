import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../sanity/lib/client";
import Header2 from "../../../components/Header2";
import Footer from "../../../components/Footer";
import SmoothScroll from "../../../components/SmoothScroll";
import MoreStories from "../More";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const builder = imageUrlBuilder(client);

const urlFor = (source) => builder.image(source);

const POSTS_QUERY2 = `*[
  _type == "post" &&
  defined(slug.current)
]| order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  publishedAt,
  image,
  body
}`;

const options = { next: { revalidate: 30 } };


export default async function PostPage({
    params,
}) {
    const post = await client.fetch(POST_QUERY, await params, options);
    const postImageUrl = post.image
        ? urlFor(post.image)?.url()
        : null;
    const posts = await client.fetch(POSTS_QUERY2, {}, options);

    return (
        <div className="bg-[#f3eee8] ">
            <SmoothScroll />
            <Header2 />
            <main className="w-full bg-[#f3eee8] pt-26">
                <div className="w-full md:max-w-lg lg:max-w-xl xl:max-w-[750px] 2xl:max-w-[832px]  mx-auto p-5 2xl:p-8 ">
                    <p className="font-sourcesans3 text-[16px] md:text-[17px] xl:text-[18px] 2xl:text-[20px] text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                    <h1 className="font-opensans font-light tracking-tight leading-10 md:leading-12 xl:leading-14  2xl:leading-16 text-[32px] md:text-[36px] xl:text-[42px] 2xl:text-[50px] text-black [transform:scaleY(0.8)] ">{post.title}</h1>
                    {postImageUrl && (
                        <img
                            src={postImageUrl}
                            alt={post.title}
                            className="w-full aspect-[3/2.5] 2xl:h-auto py-4 2xl:py-6"
                            width="1000"
                            height="1000"
                        />
                    )}
                    <div className="prose max-w-none font-sourcesans3 text-[16px] xl:text-[17px] 2xl:text-[19px] tracking-wide leading-7 2xl:leading-8 text-[#313131] prose-p:mb-6 prose-headings:mt-10 prose-headings:mb-4">
                        {Array.isArray(post.body) && <PortableText value={post.body} components={components} />}
                    </div>
                </div >
            </main >
            <MoreStories posts={posts} />
            <Footer />
        </div>
    );
}

const components = {
    block: {
        normal: ({ children }) => (
            <p className="mb-[32px]">
                {children}
            </p>
        ),
    },
};