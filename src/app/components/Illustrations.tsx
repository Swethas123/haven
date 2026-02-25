import React from 'react';

export const EmpowermentIllustration = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <linearGradient id=" empowerment_grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9333ea" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#db2777" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="15" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        {/* Background elements */}
        <circle cx="400" cy="300" r="250" fill="url(# empowerment_grad)" />
        <path d="M400 100 Q600 150 700 350 T400 550 Q200 500 100 350 T400 100" fill="white" fillOpacity="0.3" stroke="#e879f9" strokeWidth="2" strokeDasharray="10 5" />

        {/* Stylized Women Silhouettes in Solidarity */}
        <g transform="translate(400, 350)">
            {/* Central Figure */}
            <path d="M-40 0 C-40 -80 40 -80 40 0 L30 150 L-30 150 Z" fill="#9333ea" />
            <circle cx="0" cy="-60" r="30" fill="#9333ea" />

            {/* Left Figure */}
            <g transform="translate(-100, 20) scale(0.9)">
                <path d="M-40 0 C-40 -80 40 -80 40 0 L30 150 L-30 150 Z" fill="#7c3aed" />
                <circle cx="0" cy="-60" r="30" fill="#7c3aed" />
            </g>

            {/* Right Figure */}
            <g transform="translate(100, 20) scale(0.9)">
                <path d="M-40 0 C-40 -80 40 -80 40 0 L30 150 L-30 150 Z" fill="#c026d3" />
                <circle cx="0" cy="-60" r="30" fill="#c026d3" />
            </g>

            {/* Connecting Hands/Arms representation */}
            <path d="M-85 70 Q0 40 85 70" stroke="white" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.5" />
        </g>

        {/* Safe symbols */}
        <path d="M720 120 L740 140 L780 100" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="750" cy="120" r="60" stroke="#22c55e" strokeWidth="2" strokeDasharray="5 5" />
    </svg>
);

export const SafeHavenIllustration = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <linearGradient id="haven_grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f3e8ff" />
                <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
        </defs>

        <rect width="600" height="400" rx="40" fill="url(#haven_grad)" />

        {/* Abstract Serenity House/Shield */}
        <g transform="translate(300, 220)">
            {/* Glow */}
            <circle r="120" fill="#f0abfc" fillOpacity="0.3">
                <animate attributeName="r" values="110;130;110" dur="4s" repeatCount="indefinite" />
            </circle>

            {/* Shield/House shape */}
            <path d="M-80 40 L-80 -40 L0 -100 L80 -40 L80 40 C80 90 0 120 0 120 C0 120 -80 90 -80 40Z" fill="white" stroke="#9333ea" strokeWidth="4" />

            {/* Internal Heart */}
            <path d="M0 -15 C-10 -25 -25 -15 -25 0 C-25 15 0 30 0 35 C0 30 25 15 25 0 C25 -15 10 -25 0 -15Z" fill="#ec4899" />
        </g>

        {/* Soft floating particles */}
        <circle cx="100" cy="100" r="8" fill="#d8b4fe" />
        <circle cx="500" cy="150" r="12" fill="#fbcfe8" />
        <circle cx="150" cy="300" r="6" fill="#c084fc" />
    </svg>
);

export const AuthorityNetworkIllustration = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
            </pattern>
        </defs>

        <rect width="800" height="400" fill="url(#grid)" />

        {/* Interconnected Nodes */}
        <g stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4">
            <line x1="200" y1="100" x2="400" y2="200" />
            <line x1="400" y1="200" x2="600" y2="100" />
            <line x1="200" y1="300" x2="400" y2="200" />
            <line x1="400" y1="200" x2="600" y2="300" />
        </g>

        {/* Central Intelligence Node */}
        <circle cx="400" cy="200" r="60" fill="white" stroke="#2563eb" strokeWidth="4" />
        <path d="M380 190 L400 210 L430 170" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

        {/* Peripheral Protection Nodes */}
        <circle cx="200" cy="100" r="30" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="600" cy="100" r="30" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="200" cy="300" r="30" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" />
        <circle cx="600" cy="300" r="30" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" />

        {/* Small data pulses */}
        <circle cx="300" cy="150" r="4" fill="#3b82f6">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </circle>
    </svg>
);
