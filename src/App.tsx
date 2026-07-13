import { useCampaignFlow } from './hooks/useCampaignFlow';

import { LandingSection } from './sections/LandingSection';
import { AssessmentFormSection } from './sections/AssessmentFormSection';
import { AnalysingSection } from './sections/AnalysingSection';
import { ResultSection } from './sections/ResultSection';
import { QuestioningSection } from './sections/QuestioningSection';
import { GlitchTransition } from './sections/GlitchTransition';
import { RevealSection } from './sections/RevealSection';
import { SocialQuotesSection } from './sections/SocialQuotesSection';
import { FinalMessageSection } from './sections/FinalMessageSection';
import { ExperienceTransitionSection } from './sections/ExperienceTransitionSection';

function App() {
  const { currentStep, formData, goToStep, updateFormData, resetFlow } = useCampaignFlow();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "landing":
        return <LandingSection onNext={() => goToStep("form")} />;
      case "form":
        return (
          <AssessmentFormSection 
            formData={formData} 
            updateFormData={updateFormData} 
            onSubmit={() => goToStep("analysing")} 
            onBack={resetFlow} 
          />
        );
      case "analysing":
        return <AnalysingSection onComplete={() => goToStep("result")} />;
      case "result":
        return <ResultSection onComplete={() => goToStep("question")} />;
      case "question":
        return <QuestioningSection onNext={() => goToStep("transition")} />;
      case "transition":
        return <GlitchTransition onComplete={() => goToStep("reveal")} />;
      case "reveal":
        return <RevealSection onNext={() => goToStep("quotes")} />;
      case "quotes":
        return <SocialQuotesSection onNext={() => goToStep("final")} />;
      case "final":
        return <FinalMessageSection onNext={() => goToStep("experience")} />;
      case "experience":
        return <ExperienceTransitionSection />;
      default:
        return <LandingSection onNext={() => goToStep("form")} />;
    }
  };

  return (
    <div className="w-full min-h-screen">
      {renderCurrentStep()}
    </div>
  );
}

export default App;
