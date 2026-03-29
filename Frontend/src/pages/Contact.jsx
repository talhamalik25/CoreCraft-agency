import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Clock } from 'lucide-react';
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import FAQSection from '../components/contact/FAQSection';

const Contact = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const infoCards = [
    { icon: <Mail className="text-teal" size={24} />, title: 'Email', detail: 'corecraftagency07@gmail.com', link: 'mailto:corecraftagency07@gmail.com' },

    { icon: <MessageSquare className="text-teal" size={24} />, title: 'WhatsApp', detail: '+92 300 1234567', link: '#' },
    { icon: <MapPin className="text-teal" size={24} />, title: 'Location', detail: 'Karachi, Pakistan', link: '#' },
    { icon: <Clock className="text-teal" size={24} />, title: 'Availability', detail: 'Open for Projects', badge: true },
  ];

  const faqs = [
    { q: 'What is your typical project timeline?', a: 'Most projects take between 4 to 12 weeks depending on complexity. We prioritize quality and precision over speed.' },
    { q: 'Do you work with international clients?', a: 'Yes, we are based in Karachi but serve clients worldwide, including North America, Europe, and the Middle East.' },
    { q: 'What technologies do you specialize in?', a: 'We are experts in the MERN stack, Next.js, Framer Motion, and custom AI integrations using LLMs.' },
    { q: 'How do you handle project payments?', a: 'We typically work on a milestone-based payment structure: 30% upfront, 40% mid-development, and 30% upon final delivery.' },
    { q: 'Can you help with existing projects?', a: 'Absolutely. We offer audit and optimization services for existing platforms that need a performance or aesthetic boost.' },
  ];

  return (
    <div className="bg-black pt-20">
      <ContactHero fadeUp={fadeUp} />

      <section className="px-4 sm:px-6 md:px-20 pb-20 md:pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          <ContactForm fadeUp={fadeUp} />
          <ContactInfo fadeUp={fadeUp} infoCards={infoCards} />
        </div>
      </section>

      <FAQSection
        fadeUp={fadeUp}
        faqs={faqs}
        activeFaq={activeFaq}
        setActiveFaq={setActiveFaq}
      />
    </div>
  );
};

export default Contact;
