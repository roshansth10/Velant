'use client';

import React from 'react';

interface DXStudioLogoProps {
  className?: string;
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export function DXStudioLogo({
  className = '',
  theme = 'dark',
  size = 'md',
}: DXStudioLogoProps) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#0F0F0F';
  const subtextColor = isDark ? '#9CA3AF' : '#6B7280';
  const blueColor = '#0066FF';

  const heightClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-11',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 540 140"
        className={`w-auto ${heightClasses[size]}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="DX Studio - DIGITAL CREATIVE STUDIO"
      >
        {/* Monogram */}
        <g transform="translate(5, 5)">
          {/* D outline spine */}
          <rect x="0" y="0" width="22" height="130" rx="4" fill={textColor} />
          
          {/* D curve */}
          <path
            d="M22 0 H80 C114 0 135 24 135 65 C135 106 114 130 80 130 H22 V108 H80 C102 108 112 90 112 65 C112 40 102 22 80 22 H22 V0 Z"
            fill={textColor}
          />
          
          {/* Cross diagonal 1: black/white stroke going bottom-left to top-right */}
          <polygon points="22,108 44,130 120,34 98,12" fill={textColor} />
          
          {/* Cross diagonal 2: bright electric blue going top-left to bottom-right */}
          <polygon points="22,22 44,0 120,96 98,118" fill={blueColor} />
        </g>

        {/* Brand Name Text: DX Studio */}
        <text
          x="165"
          y="78"
          fill={textColor}
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="68"
          letterSpacing="-1"
        >
          DX Studio
        </text>

        {/* Subtitle: DIGITAL CREATIVE STUDIO */}
        <text
          x="167"
          y="118"
          fill={subtextColor}
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="18"
          letterSpacing="4"
        >
          DIGITAL CREATIVE STUDIO
        </text>
      </svg>
    </div>
  );
}
