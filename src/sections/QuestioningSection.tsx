import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { campaignCopy } from '../data/campaignCopy';
import { CampaignLayout } from '../components/campaign/CampaignLayout';
import { Button } from '../components/campaign/Button';

interface QuestioningSectionProps {
  onNext: () => void;
}

export const QuestioningSection: React.FC<QuestioningSectionProps> = ({ onNext }) => {
  const [step, setStep] = useState(0);
  const copy = campaignCopy.questioning;
  const resultCopy = campaignCopy.result;

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 2400);
    const t3 = setTimeout(() => setStep(3), 4000);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <CampaignLayout centered>
      <div className="relative w-full max-w-2xl mx-auto h-[60vh] flex flex-col items-center justify-center">
        
        {/* Faded background result text spanning full screen with marquee effect */}
        <div className="fixed inset-0 flex items-center opacity-[0.03] pointer-events-none select-none overflow-hidden z-0">
          <div className="animate-marquee whitespace-nowrap">
            <h1 className="text-[15rem] md:text-[25rem] font-black text-registry-navy leading-none tracking-tighter mix-blend-multiply pr-12">
              {resultCopy.predictionValue} • {resultCopy.predictionValue} • {resultCopy.predictionValue} • {resultCopy.predictionValue}
            </h1>
          </div>
        </div>

        <div className="relative z-10 w-full text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
            className="text-2xl md:text-3xl font-bold text-registry-navy"
          >
            {copy.q1}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 10 }}
            className="text-xl md:text-2xl text-registry-gray"
          >
            {copy.a1}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 10 }}
            className="text-2xl md:text-3xl font-bold text-registry-red"
          >
            {copy.a2}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 3 ? 1 : 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-0 w-full max-w-sm mx-auto"
        >
          <Button onClick={onNext} variant="red" fullWidth>
            {copy.cta}
          </Button>
        </motion.div>
      </div>
    </CampaignLayout>
  );
};
