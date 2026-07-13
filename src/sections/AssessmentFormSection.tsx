import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { campaignCopy } from '../data/campaignCopy';
import { RegistryHeader } from '../components/campaign/RegistryHeader';
import { Button } from '../components/campaign/Button';
import { CampaignLayout } from '../components/campaign/CampaignLayout';
import type { AssessmentFormData } from '../types/campaign';

interface AssessmentFormSectionProps {
  formData: AssessmentFormData;
  updateFormData: (data: Partial<AssessmentFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const AssessmentFormSection: React.FC<AssessmentFormSectionProps> = ({
  formData,
  updateFormData,
  onSubmit,
  onBack
}) => {
  const [error, setError] = useState<string | null>(null);
  const [showJudgment, setShowJudgment] = useState(false);
  const copy = campaignCopy.form;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.age || formData.age < 18 || formData.age > 100) {
      setError("Please enter a valid age between 18 and 100.");
      return;
    }
    
    if (!formData.relationshipStatus || !formData.occupation || !formData.hasChildren) {
      setError("All fields are required to complete the assessment.");
      return;
    }

    setError(null);
    onSubmit();
  };

  return (
    <>
      <RegistryHeader />
      <CampaignLayout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl w-full mx-auto"
        >
          <button 
            onClick={onBack}
            className="text-sm text-registry-gray hover:text-registry-navy mb-8 transition-colors flex items-center gap-2"
          >
            ← Back to start
          </button>

          <h2 className="text-3xl font-bold mb-8">Demographic Profile</h2>

          <form data-testid="assessment-form" onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-red-50 border border-registry-red text-registry-red text-sm font-medium" role="alert">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="age" className="registry-label">
                {copy.ageLabel}
              </label>
              <input
                type="number"
                id="age"
                min="18"
                max="100"
                required
                className="registry-input"
                value={formData.age || ''}
                onChange={(e) => updateFormData({ age: parseInt(e.target.value, 10) || null })}
              />
            </div>

            <div>
              <label htmlFor="relationship" className="registry-label">
                {copy.relationshipLabel}
              </label>
              <select
                id="relationship"
                required
                className="registry-input bg-none"
                value={formData.relationshipStatus}
                onChange={(e) => updateFormData({ relationshipStatus: e.target.value })}
              >
                <option value="" disabled>Select status...</option>
                {copy.relationshipOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="occupation" className="registry-label">
                {copy.occupationLabel}
              </label>
              <select
                id="occupation"
                required
                className="registry-input bg-none"
                value={formData.occupation}
                onChange={(e) => updateFormData({ occupation: e.target.value })}
              >
                <option value="" disabled>Select occupation...</option>
                {copy.occupationOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label htmlFor="children" className="registry-label">
                {copy.childrenLabel}
              </label>
              <select
                id="children"
                required
                className="registry-input bg-none relative z-10"
                value={formData.hasChildren}
                onChange={(e) => {
                  updateFormData({ hasChildren: e.target.value });
                  if (e.target.value === "No") setShowJudgment(true);
                  else setShowJudgment(false);
                }}
                onMouseEnter={() => {
                  if (formData.hasChildren === "No") setShowJudgment(true);
                }}
                onMouseLeave={() => setShowJudgment(false)}
              >
                <option value="" disabled>Select option...</option>
                {copy.childrenOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {showJudgment && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-1 text-xs text-registry-red font-bold bg-white px-2 py-1 border border-registry-red z-20 shadow-sm"
                >
                  Are you sure about that?
                </motion.div>
              )}
            </div>

            <div className="pt-6 border-t border-registry-border">
              <Button type="submit" fullWidth className="py-4 text-lg">
                {copy.submitCta}
              </Button>
            </div>
          </form>
        </motion.div>
      </CampaignLayout>
    </>
  );
};
