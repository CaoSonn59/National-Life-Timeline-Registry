import { useState, useCallback, useRef, useEffect } from "react";
import type { CampaignStep, AssessmentFormData } from "../types/campaign";

const INITIAL_FORM_DATA: AssessmentFormData = {
  age: null,
  relationshipStatus: "",
  occupation: "",
  hasChildren: "",
};

export function useCampaignFlow() {
  const [currentStep, setCurrentStep] = useState<CampaignStep>("landing");
  const [formData, setFormData] = useState<AssessmentFormData>(INITIAL_FORM_DATA);
  const timeoutRef = useRef<number | null>(null);

  const clearFlowTimeout = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const goToStep = useCallback((step: CampaignStep) => {
    clearFlowTimeout();
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [clearFlowTimeout]);

  const scheduleNextStep = useCallback((step: CampaignStep, delay: number) => {
    clearFlowTimeout();
    timeoutRef.current = window.setTimeout(() => {
      goToStep(step);
    }, delay);
  }, [clearFlowTimeout, goToStep]);

  const updateFormData = useCallback((data: Partial<AssessmentFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const resetFlow = useCallback(() => {
    clearFlowTimeout();
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep("landing");
    window.scrollTo(0, 0);
  }, [clearFlowTimeout]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return clearFlowTimeout;
  }, [clearFlowTimeout]);

  return {
    currentStep,
    formData,
    goToStep,
    scheduleNextStep,
    updateFormData,
    resetFlow,
  };
}
