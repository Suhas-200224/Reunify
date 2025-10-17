import React, { useState, useEffect } from 'react';

interface ResultViewProps {
    generatedImage: string;
    onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ generatedImage, onReset }) => {
    const [isSharingSupported, setIsSharingSupported] = useState(false);

    useEffect(() => {
        if (navigator.share) {
            setIsSharingSupported(true);
        }
    }, []);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = 'reunify-creation.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const handleShare = async () => {
        if (!navigator.share) return;
        try {
            const response = await fetch(generatedImage);
            const blob = await response.blob();
            const file = new File([blob], 'reunify.png', { type: 'image/png' });
            
            await navigator.share({
                title: 'My Reunify Creation!',
                text: 'I reunited with my inner child using the Reunify app! ✨',
                files: [file],
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };
    
    return (
        <div className="w-full text-center animate-fade-in">
            <div className="mb-8 animate-slide-up">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">Timeline Synced!</h2>
                <p className="text-lg text-primary">Your past and present have officially reunited.</p>
            </div>
            
            <div className="relative group max-w-2xl mx-auto rounded-3xl p-2 bg-glass backdrop-blur-xl border border-white/10 shadow-2xl shadow-primary/10">
                <img src={generatedImage} alt="Generated reunification" className="w-full aspect-[4/3] object-cover rounded-2xl"/>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <button
                    onClick={handleDownload}
                    className="px-6 py-3 text-md font-semibold rounded-xl shadow-md transition-all duration-300 bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-primary flex items-center gap-2"
                >
                    <svg xmlns="http://www.w.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                    Download
                </button>
                {isSharingSupported && (
                     <button
                        onClick={handleShare}
                        className="px-6 py-3 text-md font-semibold rounded-xl shadow-md transition-all duration-300 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-primary flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" /></svg>
                        Share
                    </button>
                )}
                 <button
                    onClick={onReset}
                    className="px-6 py-3 text-md font-semibold rounded-xl shadow-md transition-all duration-300 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-secondary"
                >
                    Create Another
                </button>
            </div>
        </div>
    );
};