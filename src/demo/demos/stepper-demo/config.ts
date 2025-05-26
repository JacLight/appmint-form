// Configuration for the stepper form experience
export interface StepperConfig {
  title: string;
  description: string;
  thankYouMessage: string;
  backgroundImage?: string;
  backgroundColor: string;
  brandColor: string;
}

export const stepperConfig: StepperConfig = {
  title: "Complete Your Application",
  description: "Please fill out the form below to get started. This should only take a few minutes.",
  thankYouMessage: "Thank you for your submission! We'll get back to you soon.",
  backgroundColor: "#667eea", // Clean gradient blue
  brandColor: "#4f46e5", // Indigo for buttons and accents
  // backgroundImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0" // Optional
};