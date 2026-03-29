import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = ({ fadeUp }) => {
  const [result, setResult] = useState("");
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setResult("");

    const formData = new FormData(event.target);
    formData.append("access_key", "bd26128c-8582-46c3-a185-e9aedba8e4af");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message Sent Successfully!");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error", error);
      setResult("Server error. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div {...fadeUp} className="lg:col-span-7">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-gray-dim text-[10px] uppercase tracking-widest font-dm ml-4">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="CoreCraft Agency"
              className="w-full bg-card border border-white/10 rounded-2xl p-5 text-white placeholder:text-gray-dim focus:border-teal outline-none transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-dim text-[10px] uppercase tracking-widest font-dm ml-4">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="corecraftagency07@gmail.com"
              className="w-full bg-card border border-white/10 rounded-2xl p-5 text-white placeholder:text-gray-dim focus:border-teal outline-none transition-all duration-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-gray-dim text-[10px] uppercase tracking-widest font-dm ml-4">Service Type</label>
          <select
            name="service"
            className="w-full bg-card border border-white/10 rounded-2xl p-5 text-white focus:border-teal outline-none transition-all duration-300 appearance-none"
          >
            <option>Web Development</option>
            <option>Custom Web Apps</option>
            <option>SaaS Development</option>
            <option>UI/UX Design</option>
          </select>
        </div>


        <div className="space-y-2">
          <label className="text-gray-dim text-[10px] uppercase tracking-widest font-dm ml-4">Your Message</label>
          <textarea
            name="message"
            required
            rows="6"
            placeholder="Tell us about your vision..."
            className="w-full bg-card border border-white/10 rounded-2xl p-5 text-white placeholder:text-gray-dim focus:border-teal outline-none transition-all duration-300 resize-none"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <button
            type="submit"
            disabled={isSending}
            className="w-full md:w-fit px-12 py-5 bg-teal rounded-full text-black font-dm text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,168,150,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>

          {result && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-xs uppercase tracking-widest font-dm ${result.includes("Success") ? "text-teal" : "text-red-500"}`}
            >
              {result}
            </motion.p>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
