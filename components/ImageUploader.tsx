import React from 'react';

interface ImageUploaderProps {
  id: string;
  label: string;
  previewUrl: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, label, previewUrl, onChange }) => {
  return (
    <div className="flex flex-col items-center group">
        <h2 className="text-xl font-bold text-gray-100 tracking-wide">{label}</h2>
        <label htmlFor={id} className="mt-4 w-full h-80 cursor-pointer flex flex-col items-center justify-center border border-white/10 rounded-3xl bg-glass backdrop-blur-lg hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 relative overflow-hidden">
            {previewUrl ? (
                <img src={previewUrl} alt={`${label} preview`} className="w-full h-full object-cover rounded-3xl transition-transform duration-300 group-hover:scale-105" />
            ) : (
                <div className="text-center text-gray-400 group-hover:text-white transition-colors duration-300 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 18.75V16.5a6.75 6.75 0 016.75-6.75h1.5a6.75 6.75 0 016.75 6.75v2.25m-15 0h15M3 18.75a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0018 18.75m-15 0V9a2.25 2.25 0 012.25-2.25h10.5A2.25 2.25 0 0118 9v9.75m-15 0h15" />
                    </svg>
                    <p className="font-semibold text-lg">Upload a Photo</p>
                    <p className="text-sm opacity-80">Drop an image or click</p>
                </div>
            )}
        </label>
        <input
            id={id}
            name={id}
            type="file"
            className="sr-only"
            accept="image/png, image/jpeg, image/webp"
            onChange={onChange}
        />
    </div>
  );
};