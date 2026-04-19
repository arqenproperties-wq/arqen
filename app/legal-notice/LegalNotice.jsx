import React from "react";

const LegalNotice = () => {
    return (
        <section className="bg-[#f3eee8] w-full px-5 xl:px-12 pt-32">
            <div className="w-full md:max-w-[550px] lg:max-w-[700px] xl:max-w-5xl 2xl:max-w-7xl mx-auto  xl:px-8">

                <h1 className="text-[36px] md:text-[40px] xl:text-[60px] 2xl:text-[72px] font-opensans font-light mb-6 xl:mb-10  text-black ">
                    Legal notice
                </h1>

                <div className="space-y-8 xl:space-y-12 2xl:space-y-16 text-[#313131] font-sourcesans3">

                    <div>
                        <h2 className="text-[20px] xl:text-[24px] 2xl:text-[28px] font-light mb-2 xl:mb-4 ">
                            Terms and conditions of use
                        </h2>
                        <p className="leading-[24px] text-[16px]  xl:text-[17px] 2xl:text-[18px]">
                            The website is an online information service provided by arqen.
                            Its use is subject to the terms and conditions set forth herein.
                            If you do not agree to them, do not use the website and do not
                            download any materials from it.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-[20px] xl:text-[24px] 2xl:text-[28px] font-light mb-2 xl:mb-4">Limited use</h2>
                        <p className="leading-[24px] text-[16px]  xl:text-[17px] 2xl:text-[18px]">
                            The contents of the website are subject to rights. All rights
                            reserved. The contents of the website, arqen-yachts.com, cannot,
                            in whole or in part, be copied, reproduced, transferred,
                            uploaded, published or distributed in any way without prior
                            written consent, except for personal use only. The website
                            mentions products or trademarks related to the services provided
                            by our company. Such trademarks belong to their respective
                            owners.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-[20px] xl:text-[24px] 2xl:text-[28px] font-light mb-2 xl:mb-4">
                            Limits of liability
                        </h2>
                        <p className="leading-[24px]text-[16px]  xl:text-[17px] 2xl:text-[18px]">
                            The information on this website is provided in good faith and is
                            believed to be accurate. Anyone wishing to purchase goods should
                            make specific inquiries concerning the nature of the products and
                            their suitability for intended use. All information is provided
                            without any guarantee, implicit or explicit, including but not
                            limited to product quality or fitness for a particular purpose.
                            arqen shall not be liable for any direct or indirect damages
                            caused by use of this website. Information may contain technical
                            inaccuracies or typographical errors and may be updated without
                            notice.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-[20px] xl:text-[24px] 2xl:text-[28px] font-light mb-2 xl:mb-4">Links</h2>
                        <p className="leading-[24px] text-[16px]  xl:text-[17px] 2xl:text-[18px]">
                            arqen assumes no responsibility for material created or published
                            by third parties linked to this website. Users who visit linked
                            websites do so at their own risk and must take precautions
                            against viruses or destructive elements. Links do not imply that
                            arqen sponsors or is affiliated with any entity.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-[20px] xl:text-[24px] 2xl:text-[28px] font-light mb-2 xl:mb-4">
                            Information from arqen
                        </h2>
                        <p className="leading-[24px]text-[16px]  xl:text-[17px] 2xl:text-[18px]">
                            Any material sent to the website via e-mail or web pages shall be
                            deemed non-confidential. arqen has no obligation regarding such
                            materials and may reproduce, use, disclose or distribute them
                            freely. Submitted materials may include ideas, concepts,
                            techniques or know-how for any purpose including development,
                            manufacturing or marketing of products. The sender guarantees the
                            material is publishable and agrees to hold arqen harmless from
                            third-party actions related to such materials.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-[20px] xl:text-[24px] 2xl:text-[28px] font-light mb-2 xl:mb-4">
                            Law and jurisdiction
                        </h2>
                        <p className="leading-[24px] text-[16px]  xl:text-[17px] 2xl:text-[18px]">
                            These conditions are governed by Bulgarian law. The Court of
                            Silistra, Bulgaria, shall have exclusive jurisdiction over any
                            disputes arising from these conditions. arqen reserves the right,
                            if necessary, to proceed before courts of other countries to
                            protect its interests and enforce its rights.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LegalNotice;