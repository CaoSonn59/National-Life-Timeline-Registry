import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { campaignCopy } from '../data/campaignCopy';
import { CampaignLayout } from '../components/campaign/CampaignLayout';
import { Button } from '../components/campaign/Button';

interface SocialQuotesSectionProps {
  onNext: () => void;
}

export const SocialQuotesSection: React.FC<SocialQuotesSectionProps> = ({ onNext }) => {
  const [visibleQuotes, setVisibleQuotes] = useState<number>(0);
  const copy = campaignCopy.quotes;

  useEffect(() => {
    // Reveal quotes one by one
    const interval = setInterval(() => {
      setVisibleQuotes((prev) => {
        if (prev < copy.phrases.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [copy.phrases.length]);

  return (
    <div className="min-h-screen bg-black text-white">
      <CampaignLayout centered>
        <div className="w-full max-w-4xl mx-auto py-12 relative flex flex-col items-center min-h-[60vh]">
          
          <div className="w-full flex-1 relative mb-16">
            {copy.phrases.map((phrase, idx) => {
              // Deterministic semi-random positioning for visual interest
              const isEven = idx % 2 === 0;
              const yOffset = idx * 15;
              const alignClass = isEven ? 'text-left pl-4 md:pl-12' : 'text-right pr-4 md:pr-12';
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: visibleQuotes > idx ? 1 : 0, 
                    y: visibleQuotes > idx ? 0 : 20 
                  }}
                  transition={{ duration: 0.8 }}
                  className={`w-full py-4 text-2xl md:text-4xl font-semibold italic text-registry-gray/80 ${alignClass}`}
                  style={{ top: `${yOffset}%` }}
                >
                  {phrase}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleQuotes >= copy.phrases.length ? 1 : 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-full max-w-xl text-center space-y-12 z-10 bg-black/80 p-8 backdrop-blur-sm border border-registry-gray/20"
          >
            <div className="space-y-4">
              <p className="text-xl md:text-2xl">{copy.summary1}</p>
              <p className="text-xl md:text-2xl font-bold text-registry-red">{copy.summary2}</p>
            </div>

            <Button onClick={onNext} variant="red" fullWidth className="text-lg tracking-widest">
              {copy.cta}
            </Button>
          </motion.div>

        </div>
      </CampaignLayout>
    </div>
  );
};
