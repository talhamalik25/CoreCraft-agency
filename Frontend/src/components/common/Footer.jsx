import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Instagram, ArrowUpRight } from 'lucide-react';

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

  const footerLinks = {
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Story', path: '/about#genesis' },
    ],
    Services: [
      { name: 'Web Development', path: '/services#web' },
      { name: 'Custom Web Apps', path: '/services#custom' },
      { name: 'SaaS Development', path: '/services#saas' },
      { name: 'UI/UX Design', path: '/services#design' },
    ],
    Work: [
      { name: 'Portfolio', path: '/work' },
      { name: 'Process', path: '/services#process' },
    ],
  };

  const socialLinks = [
    { icon: <Linkedin size={18} />, path: 'https://www.linkedin.com/company/corecraftagency/' },
    { icon: <Facebook size={18} />, path: 'https://www.facebook.com/share/18K9EhcQhS/?mibextid=wwXIfr' },
    { icon: <Instagram size={18} />, path: 'https://www.instagram.com/corecraftagency/' },
    { icon: <Pinterest size={18} />, path: 'https://www.pinterest.com/corecraftagency/' },
  ];

  return (
    <footer className="bg-black border-t border-white/5 pt-12 md:pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 mb-12 md:mb-20">
          {/* Logo Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center group mb-6 md:mb-8">
              <img
                src="/logo.png"
                alt="CoreCraft Logo"
                className="h-10 md:h-12 lg:h-12 w-auto object-contain brightness-110 group-hover:scale-105 transition-all duration-500"
              />
            </Link>
            <p className="text-gray text-sm font-dm leading-relaxed max-w-xs mb-8">
              Crafting digital monoliths with architectural precision. Based in Karachi, delivering excellence worldwide.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-gray hover:text-teal hover:border-teal transition-all duration-300"
                >
                  {social.icon}
                </a>

              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-syne font-bold text-sm uppercase tracking-widest mb-6">
                {category}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
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
          <div>
            <h4 className="text-white font-syne font-bold text-sm uppercase tracking-widest mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <p className="text-gray text-xs font-dm leading-relaxed">
                Karachi, Pakistan
              </p>
              <a
                href="mailto:corecraftagency07@gmail.com"
                className="text-teal text-xs font-dm hover:underline block"
              >
                corecraftagency07@gmail.com
              </a>

              <p className="text-gray text-xs font-dm">
                +92 (300) 123-4567
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-dim text-[10px] uppercase tracking-widest font-dm">
            © {currentYear} CoreCraft Agency. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="text-gray-dim text-[10px] uppercase tracking-widest font-dm hover:text-teal transition-colors">
              Privacy Policy
            </Link>

            <Link to="/terms-conditions" className="text-gray-dim text-[10px] uppercase tracking-widest font-dm hover:text-teal transition-colors">
              Terms of Service
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
