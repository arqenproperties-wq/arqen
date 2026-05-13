"use client";
import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
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
            setStatus("Please accept the privacy policy.");
            return;
        }

        setLoading(true);
        setStatus("");

        try {
            const res = await fetch("/api/contacthayat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    message: "Contact form submission",
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("Message sent successfully ✅");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    agree: false,
                });
            } else {
                setStatus(data.error || "Failed to send.");
            }
        } catch {
            setStatus("Something went wrong.");
        }

        setLoading(false);
    };

    const inputClass =
        "w-full border border-gray-300 rounded-sm px-4 py-4 mt-2 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-500 transition-colors duration-200 bg-white";

    const labelClass =
        "block text-[14px]   md:text-[15px] tracking-[0.1em] uppercase text-black font-semibold";

    return (
        <div id="contact" className="min-h-screen bg-white flex flex-col  justify-center items-start px-8 md:px-16 py-20 max-w-5xl mx-auto">

            <h2 className="text-[36px] md:text-[48px]  font-normal  tracking-wide uppercase text-gray-900 mb-10">
                How can we<br />help you?
            </h2>

            <form onSubmit={handleSubmit} className="w-full">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-6">
                    <div>
                        <label className={labelClass}>First Name</label>
                        <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            type="text"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Last Name</label>
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            type="text"
                            className={inputClass}
                        />
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
                    <div>
                        <label className={labelClass}>Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            type="email"
                            placeholder="example@domain.com"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Mobile Number</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="tel"
                            placeholder="+971-xxxxxxxxx"
                            className={inputClass}
                        />
                    </div>

                </div>

                <div className="flex items-start gap-3 mb-8">
                    <input
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        type="checkbox"
                        className="mt-0.5 w-4 h-4 accent-teal-500 cursor-pointer"
                    />
                    <p className="text-gray-500 text-[13px] leading-relaxed">
                        By submitting this form, you agree to our cookie and privacy statement.
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer w-full py-4 rounded-md bg-[#3A453C] hover:bg-[#3A453C] text-white text-[13px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 disabled:opacity-50"
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>

                {status && (
                    <p className="text-center mt-5 text-[13px] text-gray-500">
                        {status}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Contact;