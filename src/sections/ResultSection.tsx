import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { campaignCopy } from '../data/campaignCopy';
import { RegistryHeader } from '../components/campaign/RegistryHeader';
import { CampaignLayout } from '../components/campaign/CampaignLayout';
import { Button } from '../components/campaign/Button';

import type { AssessmentFormData } from '../types/campaign';

interface ResultSectionProps {
  formData?: AssessmentFormData;
  onComplete: () => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ formData, onComplete }) => {
  const copy = campaignCopy.result;
  const [randomConfidence, setRandomConfidence] = React.useState(93);

  const isDeviant = formData && formData.age && formData.age >= 30 && 
    (formData.relationshipStatus === "Single" || formData.hasChildren === "No");

  useEffect(() => {
    // Generate random confidence score between 80 and 99
    setRandomConfidence(Math.floor(Math.random() * (99 - 80 + 1)) + 80);
  }, []);

  return (
    <>
      <RegistryHeader />
      <CampaignLayout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`max-w-xl w-full mx-auto ${isDeviant ? 'animate-flash-bg p-8 border-4 border-registry-red' : ''}`}
        >
          {isDeviant && (
            <div className="bg-registry-red text-white text-center font-bold uppercase py-2 mb-6 tracking-widest glitch-text">
              ANOMALY IN LIFE PATHWAY
            </div>
          )}
          <div className={`border-b-2 ${isDeviant ? 'border-registry-red' : 'border-registry-navy'} pb-4 mb-8`}>
            <h2 className={`text-2xl font-bold uppercase tracking-widest ${isDeviant ? 'text-registry-red' : 'text-registry-navy'}`}>
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
            className={`border-2 border-registry-red p-8 text-center mb-8 relative ${isDeviant ? 'animate-shake' : ''}`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-registry-light px-4">
              <span className={`text-xs font-bold uppercase tracking-widest ${isDeviant ? 'text-white bg-registry-red px-2 py-1' : 'text-registry-red'}`}>
                {isDeviant ? 'CORRECTION REQUIRED' : copy.predictionLabel}
              </span>
            </div>
            <h3 className="text-5xl md:text-6xl font-bold text-registry-red tracking-tight my-4">
              {copy.predictionValue}
            </h3>
            <p className={`text-sm font-mono mt-6 py-2 inline-block px-4 ${isDeviant ? 'bg-registry-red text-white' : 'text-registry-navy bg-registry-red/10'}`}>
              {copy.confidence.replace("93%", `${randomConfidence}%`)}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-registry-gray uppercase">
            {copy.metaInfo.map((info, idx) => (
              <div key={idx} className="border border-registry-border p-2">
                {info}
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 flex justify-center"
          >
            <Button onClick={onComplete} variant={isDeviant ? "red" : "default"} fullWidth>
              Continue
            </Button>
          </motion.div>
        </motion.div>
      </CampaignLayout>
    </>
  );
};
