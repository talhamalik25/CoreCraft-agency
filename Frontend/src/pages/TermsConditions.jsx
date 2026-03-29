import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../components/common/SectionLabel';

const TermsConditions = () => {
    const fadeUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const sections = [
        {
            title: "1. Agreement to Terms",
            content: "By accessing our website or engaging CoreCraft Agency for services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services. These terms apply to all visitors, clients, and others who access our services."
        },
        {
            title: "2. Our Services",
            content: (
                <>
                    <p className="mb-4 text-gray font-dm text-base leading-relaxed">CoreCraft Agency provides the following digital services:</p>
                    <ul className="list-disc pl-4 space-y-2 mb-6 text-gray font-dm text-base">
                        <li>Website Development (custom websites, landing pages)</li>
                        <li>Custom Web Applications (client-specific web tools and portals)</li>
                        <li>SaaS Development (multi-tenant software products)</li>
                        <li>UI/UX Design (user interface and experience design)</li>
                    </ul>
                    <p className="text-gray font-dm text-base leading-relaxed italic">
                        All services are subject to a separate project agreement signed before work commences. Service scope, timelines, and deliverables will be defined in that agreement.
                    </p>
                </>
            )
        },
        {
            title: "3. Project Engagement & Payment Terms",
            content: (
                <>
                    <p className="mb-4 text-gray font-dm text-base leading-relaxed font-bold">a) Project Initiation:</p>
                    <ul className="list-disc pl-4 space-y-2 mb-6 text-gray font-dm text-base">
                        <li>All projects require a signed project agreement before work begins</li>
                        <li>A non-refundable deposit of 50% of the total project fee is required upfront to secure your project slot</li>
                        <li>Remaining 50% is due upon project completion before final delivery</li>
                    </ul>
                    <p className="mb-4 text-gray font-dm text-base leading-relaxed font-bold">b) Payment Methods:</p>
                    <ul className="list-disc pl-4 space-y-2 mb-6 text-gray font-dm text-base">
                        <li>Bank transfer, JazzCash, EasyPaisa, or other agreed methods</li>
                        <li>International clients: bank transfer or agreed digital payment</li>
                    </ul>
                    <p className="mb-4 text-gray font-dm text-base leading-relaxed font-bold">c) Late Payments:</p>
                    <ul className="list-disc pl-4 space-y-2 text-gray font-dm text-base">
                        <li>Invoices unpaid after 7 days may result in project suspension</li>
                        <li>Resumed work requires full payment of outstanding balance</li>
                    </ul>
                </>
            )
        },
        {
            title: "4. Project Revisions & Changes",
            content: (
                <ul className="list-disc pl-4 space-y-2 text-gray font-dm text-base">
                    <li>Each project includes a defined number of revision rounds as specified in the project agreement</li>
                    <li>Revisions must be within the original project scope</li>
                    <li>Additional revisions beyond the agreed number will be billed at our standard hourly rate</li>
                    <li>Significant scope changes will require a new agreement and additional fees</li>
                </ul>
            )
        },
        {
            title: "5. Intellectual Property & Ownership",
            content: (
                <ul className="list-disc pl-4 space-y-2 text-gray font-dm text-base">
                    <li>Upon receipt of full payment, the client owns all final deliverables including code, designs, and assets</li>
                    <li>CoreCraft Agency retains the right to showcase completed work in our portfolio, case studies, and marketing materials unless explicitly agreed otherwise in writing</li>
                    <li>Any third-party assets (fonts, stock images, plugins) used in the project remain subject to their respective licenses</li>
                </ul>
            )
        },
        {
            title: "6. Client Responsibilities",
            content: (
                <>
                    <p className="mb-4 text-gray font-dm text-base leading-relaxed">The client agrees to:</p>
                    <ul className="list-disc pl-4 space-y-2 mb-4 text-gray font-dm text-base">
                        <li>Provide timely feedback and required content/assets</li>
                        <li>Designate a point of contact for project communication</li>
                        <li>Ensure all provided content does not infringe third-party rights</li>
                        <li>Make payments according to the agreed schedule</li>
                    </ul>
                    <p className="text-gray font-dm text-base leading-relaxed italic">
                        Delays caused by the client may affect delivery timelines without any liability on CoreCraft Agency.
                    </p>
                </>
            )
        },
        {
            title: "7. Confidentiality",
            content: "Both parties agree to keep confidential any proprietary information shared during the project. This includes business strategies, technical details, and any sensitive data shared in the course of our engagement."
        },
        {
            title: "8. Limitation of Liability",
            content: (
                <ul className="list-disc pl-4 space-y-2 text-gray font-dm text-base">
                    <li>Any indirect, incidental, or consequential damages</li>
                    <li>Loss of revenue, data, or business opportunities</li>
                    <li>Damages arising from third-party services or integrations</li>
                    <li className="font-bold">Our total liability shall not exceed the total fees paid by the client for the specific project in question.</li>
                </ul>
            )
        },
        {
            title: "9. Warranties & Disclaimers",
            content: (
                <ul className="list-disc pl-4 space-y-2 text-gray font-dm text-base">
                    <li>We warrant that our work will be performed professionally and in accordance with the agreed specifications</li>
                    <li>We do not warrant that deliverables will be error-free or uninterrupted after handover</li>
                    <li>Post-launch support requires a separate maintenance agreement</li>
                </ul>
            )
        },
        {
            title: "10. Termination",
            content: (
                <>
                    <p className="mb-4 text-gray font-dm text-base leading-relaxed">Either party may terminate a project agreement with 14 days written notice. In the event of termination:</p>
                    <ul className="list-disc pl-4 space-y-2 text-gray font-dm text-base">
                        <li>Work completed to date will be billed proportionally</li>
                        <li>The initial deposit is non-refundable</li>
                        <li>All work completed and paid for will be delivered to the client</li>
                    </ul>
                </>
            )
        },
        {
            title: "11. Governing Law",
            content: "These terms are governed by the laws of Pakistan. Any disputes shall be resolved through mutual negotiation. If unresolved, disputes shall be subject to the jurisdiction of courts in Karachi, Pakistan."
        },
        {
            title: "12. Changes to Terms",
            content: "We reserve the right to modify these Terms at any time. Continued use of our services after changes constitutes acceptance of the new terms. We will notify active clients of significant changes."
        },
        {
            title: "13. Contact Us",
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
                        TERMS & / <br /> CONDITIONS.
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

export default TermsConditions;
