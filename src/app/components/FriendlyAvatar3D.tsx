import React from 'react';

interface FriendlyAvatar3DProps {
    isSpeaking: boolean;
    className?: string;
}

export function FriendlyAvatar3D({ isSpeaking, className = "" }: FriendlyAvatar3DProps) {
    return (
        <div className={`relative ${className} transition-transform duration-500 ease-in-out ${isSpeaking ? 'scale-105' : 'scale-100'}`}
        >
            <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-xl"
            >
                {/* Definitions for gradients and filters to simulate 3D depth */}
                <defs>
                    <radialGradient id="bodyGradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                        <stop offset="0%" stopColor="#fdf4ff" />
                        <stop offset="100%" stopColor="#f5d0fe" />
                    </radialGradient>
                    <radialGradient id="faceGradient" cx="50%" cy="50%" r="50%" fx="45%" fy="45%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#f5f3ff" />
                    </radialGradient>
                    <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                        <feOffset dx="2" dy="2" />
                        <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadow" />
                        <feFlood floodColor="#d8b4fe" floodOpacity="0.5" />
                        <feComposite in2="shadow" operator="in" />
                        <feMerge>
                            <feMergeNode in="SourceGraphic" />
                            <feMergeNode />
                        </feMerge>
                    </filter>
                </defs>

                {/* Main Body */}
                <circle cx="100" cy="110" r="85" fill="url(#bodyGradient)" />
                <path d="M100 25 C145 25 185 65 185 110 C185 155 145 195 100 195 C55 195 15 155 15 110 C15 65 55 25 100 25Z" fill="url(#bodyGradient)" filter="url(#innerShadow)" />

                {/* Face Area */}
                <ellipse cx="100" cy="105" rx="65" ry="55" fill="url(#faceGradient)" />

                {/* Eyes */}
                <g className="eyes">
                    {/* Left Eye */}
                    <circle cx="75" cy="100" r="10" fill="#312e81" />
                    <circle cx="78" cy="96" r="3.5" fill="white" />
                    {/* Right Eye */}
                    <circle cx="125" cy="100" r="10" fill="#312e81" />
                    <circle cx="128" cy="96" r="3.5" fill="white" />
                </g>

                {/* Mouth - Animates when speaking */}
                <g className={`transition-all duration-200 ${isSpeaking ? 'translate-y-1' : ''}`}
                >
                    {isSpeaking ? (
                        <path
                            d="M85 130 Q100 150 115 130"
                            stroke="#701a75"
                            strokeWidth="4"
                            strokeLinecap="round"
                            className="animate-pulse"
                        />
                    ) : (
                        <path
                            d="M90 135 Q100 142 110 135"
                            stroke="#701a75"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                    )}
                </g>

                {/* Blush */}
                <circle cx="60" cy="120" r="8" fill="#fbcfe8" fillOpacity="0.6" />
                <circle cx="140" cy="120" r="8" fill="#fbcfe8" fillOpacity="0.6" />

                {/* Hair/Head Detail */}
                <path d="M60 35 Q100 20 140 35" stroke="#d8b4fe" strokeWidth="8" strokeLinecap="round" opacity="0.6" />

                {/* Antenna/Heart */}
                <line x1="100" y1="25" x2="100" y2="10" stroke="#f472b6" strokeWidth="3" />
                <path d="M96 5 Q94 2 97 0 Q100 3 100 3 Q100 3 103 0 Q106 2 104 5 L100 10 L96 5Z" fill="#f472b6" />
            </svg>

            {/* Speaking visualizer rings */}
            {isSpeaking && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full border-4 border-purple-300 rounded-full animate-ping opacity-20"></div>
                </div>
            )}
        </div>
    );
}
