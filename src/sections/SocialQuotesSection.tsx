import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { campaignCopy } from '../data/campaignCopy';
import { CampaignLayout } from '../components/campaign/CampaignLayout';
import { Button } from '../components/campaign/Button';

interface SocialQuotesSectionProps {
  onNext: () => void;
}

export const SocialQuotesSection: React.FC<SocialQuotesSectionProps> = ({ onNext }) => {
  const [visibleQuotes, setVisibleQuotes] = useState<number>(0);
  const copy = campaignCopy.quotes;

  // Multiply the phrases to create an overwhelming effect
  const allPhrases = useMemo(() => {
    return [...copy.phrases, ...copy.phrases, ...copy.phrases, ...copy.phrases, ...copy.phrases].sort(() => Math.random() - 0.5);
  }, [copy.phrases]);

  useEffect(() => {
    // Reveal quotes one by one, faster towards the end to simulate panic
    const getDelay = (index: number) => Math.max(800 - (index * 40), 100);
    
    let currentIdx = 0;
    const nextQuote = () => {
      if (currentIdx < allPhrases.length) {
        setVisibleQuotes((prev) => prev + 1);
        currentIdx++;
        setTimeout(nextQuote, getDelay(currentIdx));
      }
    };
    
    const initialDelay = setTimeout(nextQuote, 1000);
    return () => clearTimeout(initialDelay);
  }, [allPhrases.length]);

  // Pre-calculate positions and styles so they don't jump around
  const quoteStyles = useMemo(() => {
    const positions: {top: number, left: number, scale: number}[] = [];
    
    for (let idx = 0; idx < allPhrases.length; idx++) {
      const progress = idx / (allPhrases.length - 1);
      const scale = 0.5 + (progress * 3) + (Math.random() * 1);
      
      let top = 0;
      let left = 0;
      let isValid = false;
      let attempts = 0;
      
      while (!isValid && attempts < 50) {
        // Allow phrases to go off screen (0% to 100% or more)
        top = -10 + Math.random() * 120;
        left = -10 + Math.random() * 120;
        
        // Check distance against previous positions to avoid overlap
        isValid = true;
        for (const pos of positions) {
          if (Math.abs(top - pos.top) < 12 && Math.abs(left - pos.left) < 20) {
            isValid = false;
            break;
          }
        }
        attempts++;
      }
      
      positions.push({ top, left, scale });
    }
    
    return positions.map(pos => ({
      top: `${pos.top}%`, 
      left: `${pos.left}%`, 
      scale: pos.scale 
    }));
  }, [allPhrases]);

  return (
    <div className={`min-h-screen bg-black text-white ${visibleQuotes >= allPhrases.length ? 'animate-shake' : ''}`}>
      {/* Absolute full screen wrapper for phrases to escape CampaignLayout constraints */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {allPhrases.map((phrase, idx) => {
          const style = quoteStyles[idx];
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{ 
                opacity: visibleQuotes > idx ? (0.4 + (idx / allPhrases.length) * 0.6) : 0, 
                scale: visibleQuotes > idx ? style.scale : 0.1
              }}
              transition={{ type: "spring", stiffness: 50 }}
              className="absolute whitespace-nowrap font-bold italic text-registry-red mix-blend-screen"
              style={{ 
                top: style.top, 
                left: style.left,
                transform: 'translate(-50%, -50%)',
                zIndex: idx
              }}
            >
              {phrase}
            </motion.div>
          );
        })}
      </div>

      <CampaignLayout centered>
        <div className="w-full max-w-4xl mx-auto py-12 relative flex flex-col items-center min-h-[60vh] justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleQuotes >= allPhrases.length ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full max-w-xl text-center space-y-12 z-10 bg-black/95 p-8 border-2 border-registry-red relative shadow-[0_0_50px_rgba(220,38,38,0.5)]"
          >
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-registry-gray">{copy.summary1}</p>
              <p className="text-2xl md:text-3xl font-black text-white">{copy.summary2}</p>
            </div>

            <Button onClick={onNext} variant="red" fullWidth className="text-xl tracking-widest py-6 glitch-text">
              {copy.cta}
            </Button>
          </motion.div>

        </div>
      </CampaignLayout>
    </div>
  );
};
