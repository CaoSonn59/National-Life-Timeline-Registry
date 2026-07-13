import React from 'react';
import { motion } from 'framer-motion';
import { campaignCopy } from '../data/campaignCopy';
import { RegistryHeader } from '../components/campaign/RegistryHeader';
import { Button } from '../components/campaign/Button';
import { CampaignLayout } from '../components/campaign/CampaignLayout';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface LandingSectionProps {
  onNext: () => void;
}

export const LandingSection: React.FC<LandingSectionProps> = ({ onNext }) => {
  const prefersReducedMotion = useReducedMotion();
  const copy = campaignCopy.landing;

  return (
    <>
      <RegistryHeader />
      <CampaignLayout>
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col justify-center max-w-2xl"
        >
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-registry-border text-registry-navy text-xs font-bold tracking-widest uppercase mb-6">
              {copy.registryId}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {copy.heading}
            </h2>
            <p className="text-lg md:text-xl text-registry-gray leading-relaxed">
              {copy.supportingText}
            </p>
          </div>

          <div className="mt-8 mb-16">
            <Button onClick={onNext} className="text-lg px-8 py-4">
              {copy.cta}
            </Button>
          </div>

          <div className="mt-auto pt-12 border-t border-registry-border">
            <ul className="text-xs text-registry-gray uppercase tracking-wider space-y-2 mb-8">
              {copy.footerInfo.map((info, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-registry-gray rounded-full"></div>
                  {info}
                </li>
              ))}
            </ul>
            <p className="text-xs text-registry-border/50">
              {copy.disclaimer}
            </p>
          </div>
        </motion.div>
      </CampaignLayout>
    </>
  );
};
