import React from 'react';
import { motion } from 'framer-motion';

const ContactForm = ({ fadeUp }) => {
  return (
    <motion.div {...fadeUp} className="lg:col-span-7">
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-gray-dim text-[10px] uppercase tracking-widest font-dm ml-4">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe"
              className="w-full bg-card border border-white/10 rounded-2xl p-5 text-white placeholder:text-gray-dim focus:border-teal outline-none transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-dim text-[10px] uppercase tracking-widest font-dm ml-4">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com"
              className="w-full bg-card border border-white/10 rounded-2xl p-5 text-white placeholder:text-gray-dim focus:border-teal outline-none transition-all duration-300"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-gray-dim text-[10px] uppercase tracking-widest font-dm ml-4">Service Type</label>
            <select className="w-full bg-card border border-white/10 rounded-2xl p-5 text-white focus:border-teal outline-none transition-all duration-300 appearance-none">
              <option>Web Development</option>
              <option>AI Integration</option>
              <option>UI/UX Design</option>
              <option>SaaS Development</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-gray-dim text-[10px] uppercase tracking-widest font-dm ml-4">Project Budget</label>
            <select className="w-full bg-card border border-white/10 rounded-2xl p-5 text-white focus:border-teal outline-none transition-all duration-300 appearance-none">
              <option>$5k - $10k</option>
              <option>$10k - $25k</option>
              <option>$25k - $50k</option>
              <option>$50k+</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-gray-dim text-[10px] uppercase tracking-widest font-dm ml-4">Your Message</label>
          <textarea 
            rows="6"
            placeholder="Tell us about your vision..."
            className="w-full bg-card border border-white/10 rounded-2xl p-5 text-white placeholder:text-gray-dim focus:border-teal outline-none transition-all duration-300 resize-none"
          />
        </div>

        <button className="w-full md:w-fit px-12 py-5 bg-teal rounded-full text-black font-dm text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,168,150,0.3)]">
          Send Message
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
