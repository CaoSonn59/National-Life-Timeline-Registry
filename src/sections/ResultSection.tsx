import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { campaignCopy } from '../data/campaignCopy';
import { RegistryHeader } from '../components/campaign/RegistryHeader';
import { CampaignLayout } from '../components/campaign/CampaignLayout';

interface ResultSectionProps {
  onComplete: () => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ onComplete }) => {
  const copy = campaignCopy.result;

  useEffect(() => {
    // Automatically transition to questioning screen after 2 seconds
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <>
      <RegistryHeader />
      <CampaignLayout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-xl w-full mx-auto"
        >
          <div className="border-b-2 border-registry-navy pb-4 mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-registry-navy">
              {copy.header}
            </h2>
          </div>

          <div className="space-y-4 mb-12">
            {copy.statusList.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-registry-border">
                <span className="text-registry-gray uppercase text-sm tracking-wider">{item.label}</span>
                <span className={`uppercase font-mono text-sm ${item.highlight ? 'text-registry-red font-bold' : 'text-registry-navy'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="border-2 border-registry-red p-8 text-center mb-8 relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-registry-light px-4">
              <span className="text-registry-red text-xs font-bold uppercase tracking-widest">{copy.predictionLabel}</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-bold text-registry-red tracking-tight my-4">
              {copy.predictionValue}
            </h3>
            <p className="text-sm font-mono text-registry-navy mt-6 bg-registry-red/10 py-2 inline-block px-4">
              {copy.confidence}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-registry-gray uppercase">
            {copy.metaInfo.map((info, idx) => (
              <div key={idx} className="border border-registry-border p-2">
                {info}
              </div>
            ))}
          </div>
        </motion.div>
      </CampaignLayout>
    </>
  );
};
