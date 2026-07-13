import React from 'react';
import { campaignCopy } from '../../data/campaignCopy';

interface RegistryHeaderProps {
  isGlitching?: boolean;
}

export const RegistryHeader: React.FC<RegistryHeaderProps> = ({ isGlitching = false }) => {
  return (
    <header className={`w-full py-6 border-b border-registry-border mb-12 transition-opacity duration-300 ${isGlitching ? 'opacity-50' : 'opacity-100'}`}>
      <div className="max-w-3xl mx-auto px-6 flex items-center gap-4">
        {isGlitching ? (
          <div className="w-12 h-12 bg-registry-pink rounded-full flex items-center justify-center text-white text-2xl font-bold animate-glitch">
            D
          </div>
        ) : (
          <div className="w-12 h-12 bg-registry-navy flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white rounded-sm rotate-45"></div>
          </div>
        )}
        
        <div>
          <h1 className={`text-xl font-bold tracking-tight uppercase ${isGlitching ? 'animate-glitch text-registry-pink' : 'text-registry-navy'}`}>
            {isGlitching ? "DEFAULT" : campaignCopy.landing.systemName}
          </h1>
          <p className="text-xs text-registry-gray uppercase tracking-wider mt-1">
            {isGlitching ? "SYSTEM OVERRIDE" : campaignCopy.landing.department}
          </p>
        </div>
      </div>
    </header>
  );
};
