import React from 'react';

interface CampaignLayoutProps {
  children: React.ReactNode;
  centered?: boolean;
}

export const CampaignLayout: React.FC<CampaignLayoutProps> = ({ 
  children,
  centered = false
}) => {
  return (
    <div className={`min-h-screen flex flex-col ${centered ? 'justify-center' : ''}`}>
      <main className="w-full max-w-3xl mx-auto px-6 py-8 flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};
