import React from "react";

const Form = () => {
    return (
        <div className="w-full  bg-[#f3eee8] flex flex-col justify-center items-center pt-32 md:pt-20  px-5 2xl:px-6">

            {/* Heading */}
            <h1 className="text-[36px] 2xl:text-[60px] font-opensans font-light tracking-tight text-black [transform:scaleY(0.75)] mb-10 2xl:mb-16 text-center">
                Get in touch with us
            </h1>

            {/* Form Container */}
            <div className="w-full lg:max-w-2xl 2xl:max-w-4xl font-sourcesans3">

                {/* Top Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 2xl:gap-12 mb-8 2xl:mb-12">

                    <div>
                        <label className="text-[15px] text-gray-600">Your Name*</label>
                        <input
                            type="text"
                            className="w-full bg-transparent border-b border-gray-400 focus:outline-none py-3"
                        />
                    </div>

                    <div>
                        <label className="text-[15px] text-gray-600">E-mail address*</label>
                        <input
                            type="email"
                            className="w-full bg-transparent border-b border-gray-400 focus:outline-none py-3"
                        />
                    </div>

                    <div>
                        <label className="text-[15px] text-gray-600">
                            Phone Number (optional)
                        </label>
                        <input
                            type="text"
                            className="w-full bg-transparent border-b border-gray-400 focus:outline-none py-3"
                        />
                    </div>

                </div>

                {/* Message */}
                <div className="mb-10">
                    <label className="text-[15px] text-gray-600">Message*</label>
                    <textarea
                        rows="4"
                        className="w-full bg-transparent border-b border-gray-400 focus:outline-none py-0 2xl:py-3 resize-none"
                    />
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3 mb-16">
                    <input type="checkbox" className="w-4 h-4 bg-black" />
                    <p className="text-[15px] text-gray-600">
                        By submitting this form, you agree to our cookie and privacy statement.
                    </p>
                </div>

                {/* Button */}
                <div className="flex justify-center">
                    <button className="px-6 2xl:px-10 py-3 2xl:py-4 rounded-[14px] lg:rounded-[12px] font-sourcesans3 font-bold text-[15px] lg:text-[18px] tracking-[2px] lg:tracking-[3px] uppercase text-white bg-black  ">
                        Send Inquiry
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Form;