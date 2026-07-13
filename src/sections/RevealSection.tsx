import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { campaignCopy } from '../data/campaignCopy';
import { CampaignLayout } from '../components/campaign/CampaignLayout';

interface RevealSectionProps {
  onNext: () => void;
}

export const RevealSection: React.FC<RevealSectionProps> = ({ onNext }) => {
  const [step, setStep] = useState(0);
  const copy = campaignCopy.reveal;

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1500);
    const t2 = setTimeout(() => setStep(2), 3000);
    const t3 = setTimeout(() => setStep(3), 5000);
    const t4 = setTimeout(() => setStep(4), 7000);
    const t5 = setTimeout(() => setStep(5), 9000);

    // Auto-advance after showing everything
    const tNext = setTimeout(onNext, 20000); // Increased significantly to let user read the whole page

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(tNext);
    };
  }, [onNext]);

  return (
    <div className={`min-h-screen text-white selection:bg-registry-pink selection:text-white transition-colors duration-200 ${step >= 3 ? 'bg-[#1a0000]' : 'bg-black'}`}>
      <CampaignLayout centered>
        <div className="w-full max-w-3xl mx-auto space-y-16 py-12">

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold leading-tight"
          >
            {copy.main1}
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="text-3xl md:text-4xl font-bold leading-tight"
          >
            {copy.main2}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            className="pt-8"
          >
            <p className="text-xl md:text-2xl text-registry-gray mb-6">
              {copy.main3}
            </p>
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: step >= 3 ? 1 : 0.9, opacity: step >= 3 ? 1 : 0 }}
              transition={{ duration: 0.1 }}
              className="text-7xl md:text-9xl font-black text-registry-pink tracking-tighter glitch-text-pink"
            >
              {copy.society}
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 4 ? 1 : 0 }}
            className="pt-16 border-t border-registry-gray/30 space-y-8"
          >
            <p className="text-lg md:text-xl text-registry-light/80">
              {copy.support1}
            </p>

            {/* Timeline display */}
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 font-mono text-sm uppercase text-registry-pink">
              {copy.timeline.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="px-4 py-2 border border-registry-pink/30 bg-registry-pink/5">
                    {item}
                  </div>
                  {idx < copy.timeline.length - 1 && (
                    <div className="hidden md:block w-4 h-[1px] bg-registry-pink/50" />
                  )}
                  {idx < copy.timeline.length - 1 && (
                    <div className="block md:hidden h-4 w-[1px] bg-registry-pink/50" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 5 ? 1 : 0 }}
            className="space-y-4 text-lg md:text-xl text-registry-light/80 pt-8"
          >
            <p>{copy.support2}</p>
            <p className="font-bold text-white">{copy.support3}</p>
          </motion.div>

        </div>
      </CampaignLayout>
    </div>
  );
};
