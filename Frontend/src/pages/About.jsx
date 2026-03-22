import React from 'react';
import { Target, Zap, Eye } from 'lucide-react';
import AboutHero from '../components/about/AboutHero';
import StatsBar from '../components/about/StatsBar';
import GenesisSection from '../components/about/GenesisSection';
import ValuesSection from '../components/about/ValuesSection';
import TeamSection from '../components/about/TeamSection';

const About = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const stats = [
    { val: '25+', label: 'PROJECTS' },
    { val: '15+', label: 'CLIENTS' },
    { val: '4', label: 'SERVICES' },
    { val: '1', label: 'VISION' },
  ];

  const milestones = [
    { year: '2021', name: 'Foundation', desc: 'Launched with a small team of 3 specialized crafters focused on premium web architecture.' },
    { year: '2022', name: 'Expansion', desc: 'Formalized our Precision-First workflow, resulting in a 40% increase in client conversion rates.' },
    { year: '2023', name: 'Innovation', desc: 'Pioneered AI-integrated partnerships across Europe and MENA regions, scaling our impact.' },
    { year: 'Present', name: 'Vision', desc: 'Engineering next-gen digital identities for high-growth tech startups and established brands.' }
  ];

  const values = [
    { icon: <Target className="text-teal" />, name: 'Precision', desc: 'We obsess over the details others miss. Excellence is a series of small things done perfectly.' },
    { icon: <Zap className="text-teal" />, name: 'Innovation', desc: 'We don\'t follow trends. We set them by challenging convention through creative experimentation.' },
    { icon: <Eye className="text-teal" />, name: 'Transparency', desc: 'Honest communication is the cornerstone of great work. We build trust through absolute clarity.' }
  ];

  const team = [
    { name: 'Zayn Malik', role: 'Founding Director', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
    { name: 'Sarah Khan', role: 'Creative Lead', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' },
    { name: 'Omar Siddiqui', role: 'Technical Lead', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' }
  ];

  return (
    <div className="bg-black pt-20">
      <AboutHero fadeUp={fadeUp} />
      <StatsBar stats={stats} />
      <GenesisSection fadeUp={fadeUp} milestones={milestones} />
      <ValuesSection fadeUp={fadeUp} values={values} />
      <TeamSection fadeUp={fadeUp} team={team} />
    </div>
  );
};

export default About;
