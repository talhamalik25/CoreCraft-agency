import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Instagram, Dribbble, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Story', path: '/about#genesis' },
      { name: 'Careers', path: '#' },
      { name: 'News', path: '#' },
    ],
    Services: [
      { name: 'Web Development', path: '/services#web' },
      { name: 'AI Integration', path: '/services#ai' },
      { name: 'UI/UX Design', path: '/services#design' },
      { name: 'Digital Marketing', path: '/services#marketing' },
    ],
    Work: [
      { name: 'Portfolio', path: '/work' },
      { name: 'Case Studies', path: '#' },
      { name: 'Clients', path: '#' },
      { name: 'Process', path: '/services#process' },
    ],
  };

  const socialLinks = [
    { icon: <Linkedin size={18} />, path: '#' },
    { icon: <Github size={18} />, path: '#' },
    { icon: <Instagram size={18} />, path: '#' },
    { icon: <Dribbble size={18} />, path: '#' },
  ];

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Logo Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center group mb-8">
              <img 
                src="/logo.png" 
                alt="CoreCraft Logo" 
                className="h-32 md:h-40 w-auto object-contain brightness-110 group-hover:scale-105 transition-all duration-500" 
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
                DHA Phase 6, Karachi,<br />Pakistan
              </p>
              <a
                href="mailto:hello@corecraft.studio"
                className="text-teal text-xs font-dm hover:underline block"
              >
                hello@corecraft.studio
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
            © {currentYear} CoreCraft Studio. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link to="#" className="text-gray-dim text-[10px] uppercase tracking-widest font-dm hover:text-teal transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-dim text-[10px] uppercase tracking-widest font-dm hover:text-teal transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
