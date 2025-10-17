import React from 'react';

interface LogoProps {
    large?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ large = false }) => {
    return (
        <div className="flex items-center gap-3">
            <svg
                className={large ? "w-16 h-16" : "w-10 h-10"}
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="512" height="512" rx="96" fill="url(#logo-gradient)" />
                <path
                    d="M203 160C203 146.745 213.745 136 227 136H285C298.255 136 309 146.745 309 160V228.71C309 233.023 307.252 237.159 304.179 240.232L270.179 274.232C264.032 280.379 264.032 290.121 270.179 296.268L304.179 330.268C307.252 333.341 309 337.477 309 341.79V352"
                    stroke="white"
                    strokeWidth="24"
                    strokeLinecap="round"
                />
                <path
                    d="M228 352V288.5C228 283.806 226.105 279.306 222.828 276.029L203 256.201"
                    stroke="white"
                    strokeWidth="24"
                    strokeLinecap="round"
                />
                <defs>
                    <linearGradient id="logo-gradient" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00f2ea"/>
                        <stop offset="1" stopColor="#d400ff"/>
                    </linearGradient>
                </defs>
            </svg>
            <h1 className={`${large ? 'text-5xl' : 'text-3xl'} font-extrabold tracking-tight text-white`}>
                Reunify
            </h1>
        </div>
    );
};