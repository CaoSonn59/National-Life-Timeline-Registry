import React from 'react';
import { motion } from 'framer-motion';
import { campaignCopy } from '../data/campaignCopy';
import { CampaignLayout } from '../components/campaign/CampaignLayout';
import { Button } from '../components/campaign/Button';

interface FinalMessageSectionProps {
  onNext: () => void;
}

export const FinalMessageSection: React.FC<FinalMessageSectionProps> = ({ onNext }) => {
  const copy = campaignCopy.final;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="w-full py-6 border-b border-registry-red mb-12">
        <div className="max-w-3xl mx-auto px-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-registry-red flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-black rounded-sm rotate-45"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase text-registry-red">
              {copy.identity}
            </h1>
            <p className="text-xs text-registry-gray uppercase tracking-wider mt-1">
              {copy.tagline}
            </p>
          </div>
        </div>
      </header>

      <CampaignLayout>
        <div className="max-w-2xl mx-auto space-y-12 pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-xl md:text-2xl text-registry-gray"
          >
            <p>{copy.body1}</p>
            <p className="font-bold text-white">{copy.body2}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="space-y-6 text-xl md:text-2xl text-registry-gray pt-8 border-t border-registry-gray/20"
          >
            <p>{copy.body3}</p>
            <p>{copy.body4}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="py-12"
          >
            <h2 className="text-3xl md:text-5xl font-black text-registry-red leading-tight">
              {copy.statement}
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4 }}
            className="pt-16 mt-16 border-t-2 border-registry-red flex flex-col items-center text-center space-y-8"
          >
            <p className="text-xl text-registry-light">{copy.ctaLead}</p>
            <Button onClick={onNext} variant="red" className="text-xl py-6 px-8 max-w-md w-full">
              {copy.cta}
            </Button>
          </motion.div>
        </div>
      </CampaignLayout>
    </div>
  );
};
