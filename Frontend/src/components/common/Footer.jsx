"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Linkedin, Facebook, Instagram, ArrowUpRight } from 'lucide-react';
import ContactForm from '../contact/ContactForm';
import SmartImage from './SmartImage';

const Pinterest = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8 22c.11-1.33.22-3.33.56-4.67C8.89 16 10.33 11 10.33 11s-.44-1-.44-2.33c0-2.11 1.22-3.78 2.78-3.78 1.44 0 2.11 1.11 2.11 2.44 0 1.44-.89 3.67-1.33 5.78-.44 1.78.89 3.22 2.67 3.22 3.22 0 5.67-3.44 5.67-8.33 0-4.33-3.11-7.33-7.56-7.33-5.11 0-8.11 3.78-8.11 7.78 0 1.56.56 3.11 1.33 4 .11.11.22.22.11.44 0 .33-.33 1-.33 1.11-.11.22-.33.33-.56.22-1.44-.67-2.33-2.78-2.33-4.56 0-3.67 2.67-7.11 7.78-7.11 4.11 0 7.22 2.89 7.22 6.78 0 4-2.56 7.33-6 7.33-1.22 0-2.33-.67-2.78-1.44l-.78 3c-.22.89-.89 2.11-1.33 2.78z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const showIntakeForm = pathname !== "/contact";

  const footerLinks = {
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Story', path: '/about#genesis' },
    ],
    Services: [
      { name: 'Digital Experiences', path: '/services#digital-experiences' },
      { name: 'Digital Products', path: '/services#digital-products' },
      { name: 'AI & Automation', path: '/services#ai-automation' },
      { name: 'E-Commerce', path: '/services#ecommerce' },
      { name: 'Mobile Apps', path: '/services#mobile-apps' },
    ],
    Work: [
      { name: 'Portfolio', path: '/work' },
      { name: 'Process', path: '/services#process' },
    ],
  };

  const socialLinks = [
    { icon: <Linkedin size={18} />, path: 'https://www.linkedin.com/company/corecraftagency/', name: 'LinkedIn' },
    { icon: <Facebook size={18} />, path: 'https://www.facebook.com/share/18K9EhcQhS/?mibextid=wwXIfr', name: 'Facebook' },
    { icon: <Instagram size={18} />, path: 'https://www.instagram.com/corecraftagency/', name: 'Instagram' },
    { icon: <Pinterest size={18} />, path: 'https://www.pinterest.com/corecraftagency/', name: 'Pinterest' },
  ];

  return (
    <footer className="bg-black border-t border-white/5 pt-12 md:pt-20 pb-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showIntakeForm && (
        <div className="mb-16 grid grid-cols-1 gap-14 border-b border-white/10 pb-16 lg:grid-cols-2 lg:gap-24 lg:pb-24">
          <div className="max-w-xl min-w-0">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-teal">Start a conversation</p>
            <h2 className="font-syne text-4xl font-extrabold uppercase leading-[0.92] text-white sm:text-5xl md:text-7xl break-words hyphens-auto">
              Let&apos;s craft something <span className="text-teal">extraordinary.</span>
            </h2>
            <p className="mt-8 max-w-md font-dm text-base leading-relaxed text-gray">
              Have a sharp idea or a complex problem? Tell us where you want to go and we&apos;ll help shape the route.
            </p>
            <div className="mt-10 space-y-3 font-dm text-sm">
              <Link href="mailto:corecraftagency07@gmail.com" className="block text-white/70 transition-colors hover:text-teal">corecraftagency07@gmail.com</Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-teal transition-colors hover:text-white">Open project brief <ArrowUpRight size={15} /></Link>
            </div>
          </div>
          <ContactForm
            className="lg:col-span-1"
            fadeUp={{ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7 } }}
          />
        </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 md:gap-12 mb-12 md:mb-20">
          {/* Logo Column — full width on mobile */}
          <div className="col-span-2 lg:col-span-2 mb-4 lg:mb-0">
            <Link href="/" className="flex items-center group mb-4 sm:mb-6 md:mb-8">
              <SmartImage
                src="/corecraft-logo.png"
                alt="CoreCraft Agency logo"
                width={192}
                height={55}
                className="w-full h-auto max-w-[12rem] object-contain brightness-110 group-hover:scale-105 transition-all duration-500"
              />
            </Link>
            <p className="text-gray text-xs sm:text-sm font-dm leading-relaxed max-w-xs mb-6 sm:mb-8">
              A senior engineering team in Karachi. We design, build, and ship custom web platforms, AI automation, and commerce systems — no hand-offs, no bloat.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-11 h-11 rounded-full border border-white/5 flex items-center justify-center text-gray hover:text-teal hover:border-teal transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3 className="text-white font-syne font-bold text-xs sm:text-sm uppercase tracking-widest mb-4 sm:mb-6">
                {category}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-gray text-xs font-dm hover:text-teal transition-colors duration-300 flex items-center group"
                    >
                      {link.name}
                      <ArrowUpRight
                        size={12}
                        className="ml-1 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="col-span-1 sm:col-span-1">
            <h3 className="text-white font-syne font-bold text-xs sm:text-sm uppercase tracking-widest mb-4 sm:mb-6">
              Contact
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-gray text-xs font-dm leading-relaxed">
                Karachi, Pakistan
              </p>
              <Link
                href="mailto:corecraftagency07@gmail.com"
                className="text-teal text-xs font-dm hover:underline block break-all"
              >
                corecraftagency07@gmail.com
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center sm:text-left">
          <p className="text-gray-dim text-[10px] sm:text-xs uppercase tracking-widest font-dm">
            © {currentYear} CoreCraft Agency. All rights reserved.
          </p>
          <div className="flex gap-6 sm:gap-8">
            <Link href="/privacy-policy" className="text-gray-dim text-[10px] sm:text-xs uppercase tracking-widest font-dm hover:text-teal transition-colors">
              Privacy Policy
            </Link>

            <Link href="/terms-conditions" className="text-gray-dim text-[10px] sm:text-xs uppercase tracking-widest font-dm hover:text-teal transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
