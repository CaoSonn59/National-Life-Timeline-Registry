import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { campaignCopy } from '../data/campaignCopy';
import { CampaignLayout } from '../components/campaign/CampaignLayout';

interface AnalysingSectionProps {
  onComplete: () => void;
}

export const AnalysingSection: React.FC<AnalysingSectionProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const copy = campaignCopy.analysing;

  // Simulate progress
  useEffect(() => {
    const DURATION = 2500; // 2.5 seconds total analysing time
    const INTERVAL = 50;
    const steps = DURATION / INTERVAL;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(currentProgress);

      // Update textual steps based on progress
      if (currentProgress > 75) setStepIndex(3);
      else if (currentProgress > 50) setStepIndex(2);
      else if (currentProgress > 25) setStepIndex(1);

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(onComplete, 200); // slight pause before transition
      }
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <CampaignLayout centered>
      <div className="max-w-md w-full mx-auto" aria-live="polite" aria-busy="true">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-center uppercase tracking-wide">
          {copy.mainLabel}
        </h2>
        <p className="text-sm text-registry-gray text-center mb-8">
          {copy.secondaryText}
        </p>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-registry-border mb-6">
          <motion.div
            className="h-full bg-registry-navy"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
          />
        </div>

        {/* Current Step Text */}
        <div className="h-6 flex justify-between items-center text-xs font-mono uppercase text-registry-gray mb-12">
          <span>{copy.steps[stepIndex]}</span>
          <span>{Math.floor(progress)}%</span>
        </div>

        {/* Simulated Metadata scrolling */}
        <div className="space-y-2 opacity-50 border-l-2 border-registry-border pl-4">
          {copy.metadata.map((meta, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: stepIndex >= idx ? 1 : 0, x: stepIndex >= idx ? 0 : -10 }}
              className="text-xs font-mono text-registry-navy uppercase"
            >
              &gt; {meta} [OK]
            </motion.div>
          ))}
        </div>
      </div>
    </CampaignLayout>
  );
};
