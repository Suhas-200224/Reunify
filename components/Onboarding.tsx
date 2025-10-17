import React, { useState, useEffect } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    title: "The space where timelines collapse.",
    subtitle: "Welcome to Reunify.",
  },
  {
    title: "Forge a new memory.",
    subtitle: "Bring your past and present together.",
  },
  {
    title: "Ready to meet yourself?",
    subtitle: "Two photos are all it takes.",
  },
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const nextStep = () => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        if (step < onboardingSteps.length - 1) {
          setStep(prev => prev + 1);
          setIsAnimatingOut(false);
        } else {
          setIsExiting(true);
          setTimeout(onComplete, 800);
        }
      }, 500); // Animation out duration
    };

    const timer = setTimeout(nextStep, 2500); // Time each step is visible

    return () => clearTimeout(timer);
  }, [step, onComplete]);

  const currentStep = onboardingSteps[step];

  return (
    <div className={`w-full max-w-2xl text-center flex flex-col items-center justify-center transition-opacity duration-500 ${isExiting ? 'opacity-0 animate-fade-out' : 'opacity-100'}`}>
      <div key={step} className={`transition-opacity duration-500 ${isAnimatingOut ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white">{currentStep.title}</h1>
        <p className="mt-4 text-lg text-primary">{currentStep.subtitle}</p>
      </div>
    </div>
  );
};