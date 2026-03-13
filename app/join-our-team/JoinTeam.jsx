"use client";
import React, { useState } from "react";

const JoinTeamPage = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        cv: null,
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setStatus("");

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("message", formData.message);
        data.append("cv", formData.cv);

        try {
            const res = await fetch("/api/join-our-team", {
                method: "POST",
                body: data,
            });

            if (res.ok) {
                setStatus("Application submitted successfully ✅");

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                    cv: null,
                });
            } else {
                setStatus("Failed to submit application");
            }
        } catch (err) {
            setStatus("Something went wrong");
        }

        setLoading(false);
    };

    return (
        <div className="w-full bg-[#f3eee8] flex flex-col items-center pt-32 md:pt-32 px-5 xl:px-6">

            {/* PAGE HEADING */}
            <h1 className="text-[28px] xl:text-[44px] font-opensans font-light tracking-tight text-black [transform:scaleY(0.8)] mb-4 text-center">
                Why Arqen ?
            </h1>

            <p className="max-w-3xl text-center text-[16px] xl:text-[19px] font-sourcesans3 text-gray-600 mb-16 leading-relaxed">
                At Arqen, we provide our advisors with structured training, marketing
                support, and access to the tools needed to perform at a high level.
                We also help our agents build their own personal brand. Our team
                benefits from strong operational support, quality marketing
                resources, and lead generation tools, allowing our advisors to focus
                on building meaningful client relationships and closing deals.
            </p>

            {/* JOB VACANCY */}
            <div className="w-full lg:max-w-3xl xl:max-w-4xl bg-[#ffffff] rounded-[10px] px-8 py-8 xl:px-10 xl:py-8 shadow-sm mb-20">

                <h2 className="font-opensans text-[26px] xl:text-[32px] font-light tracking-tight mb-2 [transform:scaleY(0.8)] ">
                    Videographer
                </h2>

                <p className="font-sourcesans3 text-gray-700 text-[15px] xl:text-[17px] leading-relaxed">
                    <span className="font-semibold">Job description:</span> Full time,
                    onsite position responsible for recording and editing high
                    quality, engaging and informative videos of our property
                    listings, podcasts and agency content.
                </p>

            </div>

            {/* APPLICATION FORM */}
            <form
                onSubmit={handleSubmit}
                className="w-full lg:max-w-xl xl:max-w-4xl font-sourcesans3"
            >

                <h3 className="font-opensans text-[26px] xl:text-[36px] font-light text-center mb-12 [transform:scaleY(0.8)] ">
                    Apply for this position
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

                    <div>
                        <label className="text-[15px] text-gray-600">Your Name*</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            type="text"
                            className="w-full bg-transparent border-b border-gray-400 focus:outline-none py-3"
                        />
                    </div>

                    <div>
                        <label className="text-[15px] text-gray-600">E-mail address*</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            type="email"
                            className="w-full bg-transparent border-b border-gray-400 focus:outline-none py-3"
                        />
                    </div>

                    <div>
                        <label className="text-[15px] text-gray-600">
                            Phone Number
                        </label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="text"
                            className="w-full bg-transparent border-b border-gray-400 focus:outline-none py-3"
                        />
                    </div>

                    <div>
                        <label className="text-[15px] text-gray-600">
                            Upload CV*
                        </label>
                        <input
                            name="cv"
                            onChange={handleChange}
                            required
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="w-full py-3 text-gray-600"
                        />
                    </div>

                </div>

                <div className="mb-12">
                    <label className="text-[15px] text-gray-600">
                        Message (optional)
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full bg-transparent border-b border-gray-400 focus:outline-none py-3 resize-none"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 rounded-[14px] font-sourcesans3 font-bold text-[15px] tracking-[2px] uppercase text-white bg-black"
                    >
                        {loading ? "Submitting..." : "Submit Application"}
                    </button>
                </div>

                {status && (
                    <p className="text-center mt-6 text-[14px]">
                        {status}
                    </p>
                )}

            </form>

        </div>
    );
};

export default JoinTeamPage;