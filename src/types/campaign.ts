export type CampaignStep =
  | "landing"
  | "form"
  | "analysing"
  | "result"
  | "question"
  | "transition"
  | "reveal"
  | "quotes"
  | "final"
  | "experience";

export type AssessmentFormData = {
  age: number | null;
  relationshipStatus: string;
  occupation: string;
  hasChildren: string;
};
