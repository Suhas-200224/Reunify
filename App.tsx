import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { Spinner } from './components/Spinner';
import { SplashScreen } from './components/SplashScreen';
import { Background } from './components/Background';
import { ResultView } from './components/ResultView';
import { Onboarding } from './components/Onboarding';

type AppState = 'splash' | 'onboarding' | 'uploader' | 'loading' | 'result';
type ImageFile = File | null;

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [childPhoto, setChildPhoto] = useState<ImageFile>(null);
  const [adultPhoto, setAdultPhoto] = useState<ImageFile>(null);
  const [childPhotoPreview, setChildPhotoPreview] = useState<string | null>(null);
  const [adultPhotoPreview, setAdultPhotoPreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppState('onboarding');
    }, 2500); // Splash screen duration
    return () => clearTimeout(timer);
  }, []);
  
  const handleOnboardingComplete = () => {
      setAppState('uploader');
  }

  const handleFileChange = (
    file: File,
    setter: React.Dispatch<React.SetStateAction<ImageFile>>,
    previewSetter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setter(file);
    previewSetter(URL.createObjectURL(file));
    setError(null);
  };

  const fileToBase64 = (file: File): Promise<{mimeType: string, data: string}> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const [header, data] = result.split(',');
        const mimeType = header.match(/:(.*?);/)?.[1] || 'application/octet-stream';
        resolve({ mimeType, data });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleGenerate = useCallback(async () => {
    if (!childPhoto || !adultPhoto) {
      setError("Please upload both photos to bend the timeline.");
      return;
    }

    setAppState('loading');
    setError(null);
    setGeneratedImage(null);

    try {
        const childPhotoDetails = await fileToBase64(childPhoto);
        const adultPhotoDetails = await fileToBase64(adultPhoto);

        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                childPhoto: childPhotoDetails,
                adultPhoto: adultPhotoDetails,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `The server had a problem (status: ${response.status}).`);
        }

        const data = await response.json();
        
        if (data.imageData) {
            setGeneratedImage(`data:image/png;base64,${data.imageData}`);
            setAppState('result');
        } else {
            throw new Error("The AI did not return a valid image. Please try again.");
        }

    } catch (err: any) {
        console.error(err);
        setError(err.message || "A glitch in the timeline occurred. Please try again.");
        setAppState('uploader');
    }
  }, [childPhoto, adultPhoto]);

  const handleReset = () => {
      setChildPhoto(null);
      setAdultPhoto(null);
      setChildPhotoPreview(null);
      setAdultPhotoPreview(null);
      setGeneratedImage(null);
      setError(null);
      setAppState('uploader');
  }

  const isButtonDisabled = !childPhoto || !adultPhoto;

  const loadingMessages = [ "Brewing a time paradox...", "Syncing timelines...", "Contacting the past...", "High-fiving your inner child...", "Stitching memories together...", "Consulting the chronomancers...", "Bending the space-time continuum...", "Painting with pixels of the past...", "Warming up the quantum loom...", "Translating nostalgia into data...", "Requesting clearance from the Time Keepers...", "Unpacking childhood memories...", "Carefully merging temporal streams...", "Focusing the lens of time...", "The flux capacitor is... fluxing.", "Recalibrating memory matrix...", "Shaking the digital polaroid...", "Adding a pinch of stardust...", "Charging the nostalgia drive...", "Rendering a beautiful impossibility...", "Weaving threads of then and now...", "Asking the AI to get sentimental...", "Polishing the lens of memory...", "Downloading temporal data packets..."];
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [usedMessageIndexes, setUsedMessageIndexes] = useState(new Set<number>());

  useEffect(() => {
      if (appState === 'loading') {
          const getNextMessage = () => {
            let availableIndexes = loadingMessages.map((_, i) => i).filter(i => !usedMessageIndexes.has(i));
            if (availableIndexes.length === 0) {
                setUsedMessageIndexes(new Set());
                availableIndexes = loadingMessages.map((_, i) => i);
            }
            const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
            setUsedMessageIndexes(prev => new Set(prev).add(randomIndex));
            setLoadingMessage(loadingMessages[randomIndex]);
          };
          
          getNextMessage();
          const interval = setInterval(getNextMessage, 2200);
          return () => clearInterval(interval);
      }
  }, [appState, usedMessageIndexes]);

  const renderContent = () => {
      switch(appState) {
          case 'splash': return <SplashScreen />;
          case 'onboarding': return <Onboarding onComplete={handleOnboardingComplete} />;
          case 'uploader': return (
              <div className={`transition-opacity duration-500 animate-fade-in`}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ImageUploader id="child-photo" label="1. The Origin Story" previewUrl={childPhotoPreview} onChange={(e) => e.target.files && handleFileChange(e.target.files[0], setChildPhoto, setChildPhotoPreview)} />
                        <ImageUploader id="adult-photo" label="2. The Current Chapter" previewUrl={adultPhotoPreview} onChange={(e) => e.target.files && handleFileChange(e.target.files[0], setAdultPhoto, setAdultPhotoPreview)} />
                    </div>
                     <div className="mt-12 text-center">
                        {error && <p className="text-red-400 mb-4 animate-subtle-pulse">{error}</p>}
                         <button onClick={handleGenerate} disabled={isButtonDisabled} className={`px-12 py-4 text-lg font-bold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-primary ${ isButtonDisabled ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-secondary text-white animate-glow' }`}>
                            REUNIFY
                        </button>
                    </div>
              </div>
          );
          case 'loading': return (
              <div className="flex flex-col items-center justify-center animate-fade-in">
                  <Spinner />
                  <p className="mt-6 text-xl font-medium text-gray-200">{loadingMessage}</p>
                  <p className="mt-2 text-sm text-primary">This is where the magic happens...</p>
              </div>
          );
          case 'result': return generatedImage ? <ResultView generatedImage={generatedImage} onReset={handleReset} /> : null;
          default: return null;
      }
  }

  return (
    <>
      <Background />
      <div className="min-h-screen text-gray-100 font-sans flex flex-col p-4 overflow-hidden relative">
        <Header />
        <main className="w-full max-w-4xl mx-auto flex-grow flex flex-col justify-center">
            {renderContent()}
        </main>
      </div>
    </>
  );
};

export default App;