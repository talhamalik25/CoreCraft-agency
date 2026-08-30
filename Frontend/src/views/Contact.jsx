"use client";

import React, { useState } from 'react';
import { ArrowUpRight, Clock, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useGSAPAnimations } from '../hooks/useGSAP';
import { WEB3FORMS_ACCESS_KEY } from '../lib/forms';

const PROJECT_TYPES = ['Custom SaaS', 'AI & Automation', 'Digital Experience', 'Mobile App'];

const Contact = () => {
  const portalRef = React.useRef(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [result, setResult] = useState('');
  const [isSending, setIsSending] = useState(false);

  useGSAPAnimations((gsap) => {
    gsap.fromTo(
      portalRef.current.querySelectorAll('[data-form-line]'),
      { autoAlpha: 0, y: 15 },
      { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'back.out(1.4)' }
    );
  }, { scope: portalRef });

  const toggleProjectType = (type) => {
    setSelectedTypes((current) => (
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type]
    ));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setResult('');

    const formData = new FormData(event.target);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.set('project_types', selectedTypes.join(', '));

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await response.json();

      if (data.success) {
        setResult('Message Sent Successfully!');
        setSelectedTypes([]);
        event.target.reset();
      } else {
        setResult(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setResult('Server error. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div ref={portalRef} className="bg-black section-x pb-20 pt-28 md:pb-40 md:pt-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 border border-white/10 lg:grid-cols-[40%_60%]">
        <aside className="border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-14">
          <div data-form-line>
            <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-teal">Project intake</div>
            <h1 className="max-w-md text-white font-syne text-4xl font-extrabold uppercase leading-[0.9] sm:text-5xl md:text-6xl">Let&apos;s craft something amazing.</h1>
            <p className="mt-8 max-w-md text-gray font-dm text-base leading-relaxed md:text-lg">Bring us the ambition, the rough sketch, or the problem you cannot quite name yet. We&apos;ll shape the next move together.</p>
          </div>

          <div data-form-line className="mt-16 border-t border-white/10 pt-6">
            <div className="flex items-start gap-4">
              <Clock className="mt-1 text-teal" size={18} />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">Response time</p>
                <p className="mt-2 font-dm text-sm text-white">Expect a reply within 12 hours.</p>
              </div>
            </div>
          </div>

          <div data-form-line className="mt-8 grid grid-cols-1 border border-white/10 sm:grid-cols-2 lg:grid-cols-1">
            <Link href="mailto:corecraftagency07@gmail.com" className="group border-b border-white/10 p-5 transition-colors hover:bg-card sm:border-b-0 sm:border-r lg:border-b lg:border-r-0">
              <Mail className="mb-8 text-teal" size={18} />
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">Direct email</span>
              <span className="mt-2 block break-words font-dm text-sm text-white transition-colors group-hover:text-teal">corecraftagency07@gmail.com</span>
            </Link>
            <div className="p-5">
              <MapPin className="mb-8 text-teal" size={18} />
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">Studio base</span>
              <span className="mt-2 block font-dm text-sm text-white">Karachi, Pakistan</span>
            </div>
          </div>

          <div data-form-line className="mt-8 flex gap-5 border-t border-white/10 pt-5">
            <Link href="https://www.linkedin.com/company/corecraftagency/" target="_blank" rel="noopener noreferrer" aria-label="CoreCraft on LinkedIn" className="text-white/50 transition-colors hover:text-teal"><Linkedin size={18} /></Link>
            <Link href="https://www.instagram.com/corecraftagency/" target="_blank" rel="noopener noreferrer" aria-label="CoreCraft on Instagram" className="text-white/50 transition-colors hover:text-teal"><Instagram size={18} /></Link>
            <ArrowUpRight className="ml-auto text-teal" size={18} />
          </div>
        </aside>

        <section className="p-7 sm:p-10 md:p-14">
          <div data-form-line className="mb-12 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-teal">The brief</div>
              <h2 className="text-white font-syne text-3xl font-bold uppercase leading-none sm:text-4xl">Tell us what you&apos;re building.</h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 sm:block">Open for projects</span>
          </div>

          <form onSubmit={onSubmit} className="space-y-9">
            <fieldset data-form-line>
              <legend className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">Select project type</legend>
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = selectedTypes.includes(type);

                  return (
                    <button key={type} type="button" aria-pressed={isSelected} onClick={() => toggleProjectType(type)} className={`min-h-11 rounded-full border px-4 py-2.5 font-dm text-xs transition-all duration-300 ${isSelected ? 'border-teal bg-teal text-black shadow-[0_0_22px_rgba(0,230,217,0.24)]' : 'border-white/10 text-white/65 hover:border-teal/60 hover:text-white'}`}>
                      {type}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <input type="hidden" name="project_types" value={selectedTypes.join(', ')} />

            <div data-form-line className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <Field label="Full name" name="name" placeholder="Your name" required />
              <Field label="Email address" name="email" type="email" placeholder="you@company.com" required />
            </div>

            <div data-form-line className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <Field label="Company / organization" name="company" placeholder="Your company" />
              <Field label="Budget range" name="budget" placeholder="e.g. $10k - $25k" />
            </div>

            <div data-form-line className="group border-b border-white/10 transition-all duration-300 focus-within:border-teal focus-within:shadow-[0_12px_24px_-20px_rgba(0,230,217,0.95)]">
              <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">Project brief</label>
              <textarea id="message" name="message" required rows="5" placeholder="Tell us about your vision, timeline, and what success looks like..." className="mt-3 w-full resize-none rounded-none border-0 bg-transparent px-0 py-3 font-dm text-white outline-none placeholder:text-white/25" />
            </div>

            <div data-form-line className="flex flex-col items-start gap-5 pt-3 sm:flex-row sm:items-center">
              <button type="submit" disabled={isSending} className="btn-primary w-full sm:w-auto">
                {isSending ? 'Sending...' : 'Send inquiry'}
                <ArrowUpRight size={16} />
              </button>
              {result && <p className={`font-dm text-xs uppercase tracking-widest ${result.includes('Success') ? 'text-teal' : 'text-danger'}`}>{result}</p>}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

const Field = ({ label, name, type = 'text', placeholder, required = false }) => (
  <div className="group border-b border-white/10 transition-all duration-300 focus-within:border-teal focus-within:shadow-[0_12px_24px_-20px_rgba(0,230,217,0.95)]">
    <label htmlFor={name} className="block font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{label}</label>
    <input id={name} name={name} type={type} placeholder={placeholder} required={required} className="mt-3 w-full rounded-none border-0 bg-transparent px-0 py-3 font-dm text-white outline-none placeholder:text-white/25" />
  </div>
);

export default Contact;