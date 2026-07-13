import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CreepyEyes: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateEyeTransform = (eyeX: number, eyeY: number) => {
    const dx = mousePos.x - eyeX;
    const dy = mousePos.y - eyeY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(Math.hypot(dx, dy) / 20, 4); // Max pupil distance
    
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  };

  // Static eye positions (can be adjusted or randomized)
  const eyes = [
    { id: 1, top: '20%', left: '10%' },
    { id: 2, top: '15%', left: '80%' },
    { id: 3, top: '70%', left: '5%' },
    { id: 4, top: '80%', left: '85%' },
    { id: 5, top: '50%', left: '90%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      {eyes.map((eye) => {
        // Approximate screen coordinates based on percentages for initial render
        const eyeX = (parseFloat(eye.left) / 100) * window.innerWidth;
        const eyeY = (parseFloat(eye.top) / 100) * window.innerHeight;
        const transform = calculateEyeTransform(eyeX, eyeY);

        return (
          <div
            key={eye.id}
            className="absolute flex gap-2"
            style={{ top: eye.top, left: eye.left }}
          >
            {/* Left Eye */}
            <div className="w-8 h-4 bg-registry-navy rounded-[100%] flex items-center justify-center overflow-hidden border border-registry-border/50">
              <motion.div
                animate={{ x: transform.x, y: transform.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-2 h-2 bg-registry-red rounded-full"
              />
            </div>
            {/* Right Eye */}
            <div className="w-8 h-4 bg-registry-navy rounded-[100%] flex items-center justify-center overflow-hidden border border-registry-border/50">
              <motion.div
                animate={{ x: transform.x, y: transform.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-2 h-2 bg-registry-red rounded-full"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
