import React from 'react';
import { motion } from 'framer-motion';
import { campaignCopy } from '../data/campaignCopy';
import { CampaignLayout } from '../components/campaign/CampaignLayout';

export const ExperienceTransitionSection: React.FC = () => {
  const copy = campaignCopy.experience;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <CampaignLayout centered>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto space-y-8 border border-registry-red/50 p-12 bg-registry-red/5"
        >
          <div className="w-16 h-16 mx-auto border-4 border-registry-red rotate-45 mb-12"></div>
          
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-registry-red mb-6">
            {copy.title}
          </h1>
          
          <p className="text-xl text-registry-gray">
            {copy.body}
          </p>
          
          <div className="pt-12 mt-12 border-t border-registry-red/30">
            <p className="text-sm uppercase tracking-widest text-registry-red/80 font-mono">
              {copy.comingSoon}
            </p>
          </div>
        </motion.div>
      </CampaignLayout>
    </div>
  );
};
