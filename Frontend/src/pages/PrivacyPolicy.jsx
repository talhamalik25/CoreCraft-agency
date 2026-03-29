import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../components/common/SectionLabel';

const PrivacyPolicy = () => {
    const fadeUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const sections = [
        {
            title: "1. Introduction",
            content: "CoreCraft Agency (\"we\", \"our\", \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website corecraft-agency.vercel.app or engage our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our site."
        },
        {
            title: "2. Information We Collect",
            content: (
                <>
                    <p className="mb-4 text-gray font-dm text-base leading-relaxed">a) Information You Provide Directly:</p>
                    <ul className="list-disc pl-4 space-y-2 mb-6 text-gray font-dm text-base">
                        <li>Full name and email address submitted via contact forms</li>
                        <li>Project details and requirements shared during consultations</li>
                        <li>Payment information (processed securely via third-party providers)</li>
                        <li>Any other information you voluntarily provide</li>
                    </ul>
                    <p className="mb-4 text-gray font-dm text-base leading-relaxed">b) Information Collected Automatically:</p>
                    <ul className="list-disc pl-4 space-y-2 text-gray font-dm text-base">
                        <li>IP address and browser type</li>
                        <li>Pages visited and time spent on site</li>
                        <li>Referring URLs and device information</li>
                        <li>Cookies and similar tracking technologies</li>
                    </ul>
                </>
            )
        },
        {
            title: "3. How We Use Your Information",
            content: (
                <ul className="list-disc pl-4 space-y-2 text-gray font-dm text-base">
                    <li>Respond to your inquiries and project requests</li>
                    <li>Provide, operate, and maintain our services</li>
                    <li>Send administrative information and project updates</li>
                    <li>Improve our website and service offerings</li>
                    <li>Comply with legal obligations</li>
                    <li>Prevent fraudulent activity and ensure security</li>
                    <li>Send occasional marketing communications (you may opt out anytime)</li>
                </ul>
            )
        },
        {
            title: "4. Sharing Your Information",
            content: (
                <>
                    <p className="mb-4 text-gray font-dm text-base leading-relaxed">We do not sell, trade, or rent your personal information to third parties. We may share your information only in these circumstances:</p>
                    <ul className="list-disc pl-4 space-y-2 text-gray font-dm text-base">
                        <li>With service providers who assist in operating our website (hosting, analytics) under strict confidentiality agreements</li>
                        <li>When required by law or to protect our legal rights</li>
                        <li>With your explicit consent for any other purpose</li>
                    </ul>
                </>
            )
        },
        {
            title: "5. Cookies Policy",
            content: (
                <>
                    <p className="mb-4 text-gray font-dm text-base leading-relaxed">We use cookies to enhance your browsing experience. Types we use:</p>
                    <ul className="list-disc pl-4 space-y-2 mb-4 text-gray font-dm text-base">
                        <li>Essential Cookies: Required for basic site functionality</li>
                        <li>Analytics Cookies: Help us understand how visitors use our site</li>
                        <li>Preference Cookies: Remember your settings and preferences</li>
                    </ul>
                    <p className="text-gray font-dm text-base leading-relaxed">You can control cookies through your browser settings. Disabling cookies may affect some site functionality.</p>
                </>
            )
        },
        {
            title: "6. Data Retention",
            content: "We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Project-related data is retained for a minimum of 3 years for business record purposes."
        },
        {
            title: "7. Your Rights",
            content: (
                <ul className="list-disc pl-4 space-y-2 text-gray font-dm text-base">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal data</li>
                    <li>Withdraw consent for marketing communications at any time</li>
                    <li>Lodge a complaint with relevant data protection authorities</li>
                </ul>
            )
        },
        {
            title: "8. Third-Party Links",
            content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies independently."
        },
        {
            title: "9. Security",
            content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure."
        },
        {
            title: "10. Changes to This Policy",
            content: "We may update this Privacy Policy periodically. We will notify you of significant changes by updating the date at the top of this page. Continued use of our services constitutes acceptance of the updated policy."
        },
        {
            title: "11. Contact Us",
            content: (
                <div className="space-y-2">
                    <p className="text-gray font-dm text-base">CoreCraft Agency</p>
                    <p className="text-gray font-dm text-base">Karachi, Pakistan</p>
                    <p className="text-gray font-dm text-base">Email: corecraftagency07@gmail.com</p>

                    <p className="text-gray font-dm text-base">Website: corecraft-agency.vercel.app</p>
                </div>
            )
        }
    ];

    return (
        <div className="bg-black pt-20 px-4 sm:px-6 md:px-20 min-h-screen">
            <div className="max-w-4xl mx-auto py-20">
                <motion.div {...fadeUp}>
                    <SectionLabel text="LEGAL" />
                    <h1 className="text-white font-syne font-extrabold text-[clamp(2rem,8vw,5rem)] uppercase leading-[0.9]">
                        PRIVACY / <br /> POLICY.
                    </h1>
                    <div className="w-16 h-px bg-teal mt-6 mb-12"></div>
                    <p className="text-gray-dim text-xs uppercase tracking-widest font-dm mb-20">
                        Last Updated: March 2026
                    </p>
                </motion.div>

                <div className="space-y-0">
                    {sections.map((section, index) => (
                        <motion.div 
                            key={index} 
                            {...fadeUp}
                            className="border-b border-white/5 pb-8 mb-12 last:border-b-0"
                        >
                            <h2 className="font-syne font-bold text-xl md:text-2xl uppercase text-white mb-4 mt-12">
                                {section.title}
                            </h2>
                            {typeof section.content === 'string' ? (
                                <p className="font-dm text-gray text-base leading-relaxed">
                                    {section.content}
                                </p>
                            ) : (
                                section.content
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
