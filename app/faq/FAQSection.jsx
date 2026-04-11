'use client'
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
    {
        q: "What makes waterfront properties in Dubai so desirable?",
        a: `It’s hard to compete with the calm that comes from waking up to the sound of water. Waterfront homes in Dubai offer that peace but with the city just minutes away. You get a mix of privacy, open views, and resort-style living that people from all over the world look for. There aren’t many plots like these left, and that’s a big reason their value stays strong. Many residents say once they move near the water, they can’t imagine living anywhere else.`
    },
    {
        q: "Can foreigners buy villas or townhouses in Dubai?",
        a: `Yes, they can and that’s one of the reasons Dubai’s property market is so active. Foreigners can own homes in freehold areas, which means full ownership with the right to sell or rent whenever they like. Areas such as Palm Jumeirah, Dubai Marina, Downtown, and Arabian Ranches are some of the most popular choices. The process is pretty straightforward, and everything is handled through the Dubai Land Department, so it’s fully secure and transparent.`
    },
    {
        q: "Is now a good time to invest in Dubai’s property market?",
        a: `Most market watchers would say yes. Dubai continues to attract international buyers because of its stability, tax-free system, and lifestyle appeal. Prices have been strong, but not overheated, which is a healthy sign. Waterfront and villa communities, especially, are seeing steady demand. Buyers are drawn to how these homes blend strong long-term value with everyday comfort.`
    },
    {
        q: "What’s the difference between off-plan and ready properties?",
        a: `Off-plan properties are those still under construction. They are usually offered by developers with phased payment plans. They tend to come at lower prices with higher potential returns upon completion. Ready properties, on the other hand, offer immediate move-in or rental income opportunities.`
    },
    {
        q: "Which areas in Dubai are best for luxury villas and townhouses?",
        a: `Palm Jumeirah for iconic waterfront living, Dubai Hills Estate for golf-course views, and District One for space and privacy. Tilal Al Ghaf and Jumeirah Bay Island are also very popular for their design and exclusivity.`
    },
    {
        q: "How do experts assess a property’s long-term value in Dubai?",
        a: `Professionals evaluate several factors like location, developer reputation, construction quality, community planning, and access to daily needs. Waterfront or well-connected communities usually perform best.`
    },
    {
        q: "Are Dubai properties a good choice for generating rental income?",
        a: `Yes, Dubai offers some of the highest rental yields globally, especially in luxury and waterfront segments. Villas and townhouses in family-friendly communities can earn solid annual returns.`
    },
    {
        q: "What are the costs involved when buying property in Dubai?",
        a: `You’ll pay a 4% transfer fee to the Dubai Land Department, an agent’s commission (usually 2%), and some registration and service charges.`
    },
    {
        q: "What should first-time buyers in Dubai keep in mind?",
        a: `Start by getting clear on what you want, a home to live in, or an investment. Research the developer and area properly and always verify the property with the Dubai Land Department before paying anything.`
    },
    {
        q: "Why are townhouses gaining popularity among Dubai’s luxury buyers?",
        a: `Townhouses offer the perfect middle ground. Spacious layouts and privacy similar to villas, but with the convenience of community living.`
    }
]

export default function FAQSection() {

    const containerRef = useRef(null)
    const leftRef = useRef(null)

    useEffect(() => {

        const ctx = gsap.context(() => {

            ScrollTrigger.matchMedia({

                // only enable pin on large screens
                "(min-width: 1024px)": function () {

                    ScrollTrigger.create({
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        pin: leftRef.current,
                        pinSpacing: false
                    })

                }

            })

        }, containerRef)

        return () => ctx.revert()

    }, [])

    return (

        <section
            ref={containerRef}
            className="relative bg-[#f3eee8] px-5 lg:px-5 py-32"
        >

            <div className="max-w-5xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                {/* LEFT SIDE */}

                <div
                    ref={leftRef}
                    className="col-span-4 h-fit"
                >

                    <h2 className="text-[#38433b] font-centrathin font-bold  text-[36px] md:text-[40px] xl:text-[46px] 2xl:text-[54px]   leading-[44px] md:leading-[48px] xl:leading-[56px] 2xl:leading-[62px] ">
                        Frequently Asked<br />Questions
                    </h2>



                </div>

                {/* RIGHT SIDE */}

                <div className="col-span-8 space-y-16">

                    {faqs.map((item, i) => (
                        <div key={i} className="max-w-3xl">

                            <h3 className="text-[28px] md:text-[28px] xl:text-[32px] 2xl:text-[32px] font-centrathin font-bold text-[#38433b] ">
                                {item.q}
                            </h3>

                            <p className="text-[16px] md:text-[16px] xl:text-[18px] 2xl:text-[18px] text-[#38433b] font-centrathin font-bold opacity-80 tracking-wide">
                                {item.a}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </section>

    )

}