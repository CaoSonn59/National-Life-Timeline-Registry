import React, { useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { RegistryHeader } from '../components/campaign/RegistryHeader';
import { CampaignLayout } from '../components/campaign/CampaignLayout';

interface GlitchTransitionProps {
  onComplete: () => void;
}

export const GlitchTransition: React.FC<GlitchTransitionProps> = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Shorter transition if reduced motion is preferred
    const duration = prefersReducedMotion ? 600 : 4000;
    const timer = setTimeout(onComplete, duration);
    return () => clearTimeout(timer);
  }, [onComplete, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <CampaignLayout centered>
        <div className="w-full h-full bg-registry-navy transition-colors duration-500" />
      </CampaignLayout>
    );
  }

  return (
    <>
      {/* Glitching Header */}
      <RegistryHeader isGlitching />
      <CampaignLayout>
        <div className="relative w-full h-64 flex flex-col items-center justify-center overflow-hidden">
          
          <div className="absolute inset-0 bg-white/10 z-10 animate-pulse pointer-events-none" />
          
          {/* Horizontal scan line */}
          <div className="absolute w-full h-1 bg-registry-red opacity-50 z-20 top-1/3 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
          <div className="absolute w-full h-[2px] bg-registry-navy opacity-30 z-20 top-2/3" />

          {/* Glitching Text Elements */}
          <div className="text-center space-y-8 animate-glitch">
            <h2 className="text-4xl font-bold font-mono text-registry-navy transform -translate-x-2">
              ERROR: PATHWAY OVERRIDE
            </h2>
            <div className="text-registry-red text-2xl font-bold tracking-[0.2em] opacity-80 mix-blend-multiply">
              SYSTEM EXPECTATION REJECTED
            </div>
            
            <div className="w-full max-w-md mx-auto h-2 bg-registry-border mt-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 h-full bg-registry-red w-full origin-right animate-[shrink_4s_ease-out_forwards]" />
            </div>
          </div>
        </div>
        <style>{`
          @keyframes shrink {
            0% { transform: scaleX(1); }
            100% { transform: scaleX(0); }
          }
        `}</style>
      </CampaignLayout>
    </>
  );
};
