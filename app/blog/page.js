import Header2 from "../../components/Header2";
import Footer from "../../components/Footer";
import SmoothScroll from "../../components/SmoothScroll";
import { client } from '../../sanity/lib/client'
import BlogList from "./BlogList";


const POSTS_QUERY = `*[
  _type == "post" &&
  defined(slug.current)
]| order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  image,
  body
}`;

const options = { next: { revalidate: 30 } };



export default async function Page() {

    const posts = await client.fetch(POSTS_QUERY, {}, options);

    return (
        <div className="bg-[#f3eee8]">
            <SmoothScroll />
            <Header2 />
            <BlogList posts={posts} />

            <Footer />
        </div>
    );
}