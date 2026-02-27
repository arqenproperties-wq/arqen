"use client";
import React, { useState } from "react";

const Form = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        agree: false,
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.agree) {
            setStatus("Please accept privacy policy");
            return;
        }

        setLoading(true);
        setStatus("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("Inquiry sent successfully ✅");

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                    agree: false,
                });
            } else {
                setStatus(data.error || "Failed to send");
            }
        } catch (err) {
            setStatus("Something went wrong");
        }

        setLoading(false);
    };

    return (
        <div className="section-contact w-full  bg-[#f3eee8] flex flex-col justify-center items-center pt-32 md:pt-20  px-5 2xl:px-6">

            <h1 className="text-[36px] 2xl:text-[60px] font-opensans font-light tracking-tight text-black [transform:scaleY(0.75)] mb-10 2xl:mb-16 text-center">
                Get in touch with us
            </h1>

            <form
                onSubmit={handleSubmit}
                className="w-full lg:max-w-2xl 2xl:max-w-4xl font-sourcesans3"
            >

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 2xl:gap-12 mb-8 2xl:mb-12">

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
                            Phone Number (optional)
                        </label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="text"
                            className="w-full bg-transparent border-b border-gray-400 focus:outline-none py-3"
                        />
                    </div>

                </div>

                <div className="mb-10">
                    <label className="text-[15px] text-gray-600">Message*</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full bg-transparent border-b border-gray-400 focus:outline-none py-0 2xl:py-3 resize-none"
                    />
                </div>

                <div className="flex items-center gap-3 mb-16">
                    <input
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        type="checkbox"
                        className="w-4 h-4 bg-black"
                    />
                    <p className="text-[15px] text-gray-600">
                        By submitting this form, you agree to our cookie and privacy statement.
                    </p>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 2xl:px-10 py-3 2xl:py-4 rounded-[14px] lg:rounded-[12px] font-sourcesans3 font-bold text-[15px] lg:text-[18px] tracking-[2px] lg:tracking-[3px] uppercase text-white bg-black"
                    >
                        {loading ? "Sending..." : "Send Inquiry"}
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

export default Form;