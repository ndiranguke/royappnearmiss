import React, { useState } from 'react';

export interface RoyLogoProps {
  /**
   * Overall height style or preset.
   * 'xs': mobile compact (h-6)
   * 'sm': header / mobile navbar (h-8 to h-9)
   * 'md': standard sidebar (h-9 to h-11)
   * 'lg': auth hero / card header (h-12 to h-16)
   * 'xl': splash / desktop hero (h-16 to h-24)
   * 'responsive': dynamically adapts from mobile (h-8) to tablet (h-10) to desktop (h-12)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  /**
   * Additional custom class names for the image or container
   */
  className?: string;
  /**
   * Whether to wrap in a white pill/card container with border
   * Recommended for dark surfaces like sidebars and dark banners
   */
  withBadge?: boolean;
  /**
   * Force vector SVG mode instead of image asset
   */
  variant?: 'image' | 'vector';
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional accessible label
   */
  alt?: string;
}

export const RoyLogo: React.FC<RoyLogoProps> = ({
  size = 'responsive',
  className = '',
  withBadge = false,
  variant = 'image',
  onClick,
  alt = 'ROY Smart Safe Secure Logo',
}) => {
  const [imageError, setImageError] = useState(false);

  // Responsive height presets
  const sizeClasses: Record<string, string> = {
    xs: 'h-6 sm:h-7',
    sm: 'h-7 sm:h-8 md:h-9',
    md: 'h-8 sm:h-9 md:h-10 lg:h-11',
    lg: 'h-10 sm:h-12 md:h-14 lg:h-16',
    xl: 'h-14 sm:h-16 md:h-20 lg:h-24',
    responsive: 'h-7 sm:h-8 md:h-10 lg:h-11',
  };

  const currentSizeClass = sizeClasses[size] || sizeClasses.responsive;

  // Render SVG Vector Emblem
  const renderVectorLogo = () => (
    <svg
      viewBox="0 0 460 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${currentSizeClass} w-auto max-w-full object-contain ${className}`}
      aria-label={alt}
      role="img"
    >
      <title>{alt}</title>

      {/* SOARING EAGLE (Crimson Red) */}
      <g transform="translate(85, 2) scale(0.68)" fill="#7A1315">
        {/* Eagle Body & Head */}
        <path d="M72 70 C70 58, 64 46, 56 36 C54 33, 50 31, 48 33 C45 35, 46 39, 44 42 C40 38, 36 34, 30 36 C34 44, 36 50, 36 60 C32 64, 28 66, 22 64 C26 72, 32 78, 38 82 C44 86, 52 90, 60 92 C66 94, 70 88, 72 70 Z" />
        {/* Eagle Beak */}
        <path d="M30 36 L24 38 L28 42 Z" />
        {/* Left Wing (Spread High) */}
        <path d="M52 35 C48 20, 36 8, 20 2 C16 4, 18 10, 22 14 C14 10, 8 8, 2 10 C6 16, 12 22, 18 26 C10 24, 4 25, 0 30 C5 36, 14 40, 22 43 C14 43, 6 46, 3 52 C10 56, 20 58, 28 60 C36 62, 44 54, 52 35 Z" />
        {/* Right Wing (Spread Upward & Inward) */}
        <path d="M56 36 C64 22, 78 12, 94 6 C96 10, 92 16, 86 20 C94 18, 102 18, 108 22 C100 27, 92 32, 84 35 C92 36, 100 39, 104 46 C96 50, 86 51, 78 52 C84 57, 90 64, 88 70 C80 68, 74 62, 68 56 C62 50, 58 42, 56 36 Z" />
        {/* Tail Feathers */}
        <path d="M60 92 C56 100, 50 108, 44 114 C48 116, 54 115, 60 110 C62 116, 60 122, 56 128 C64 122, 70 114, 72 104 C74 112, 76 118, 80 124 C82 116, 80 108, 76 98 C72 94, 66 92, 60 92 Z" />
      </g>

      {/* LETTER 'R' (Serif, Crimson Red) */}
      <text
        x="10"
        y="192"
        fill="#7A1315"
        fontFamily="'Times New Roman', 'Playfair Display', Georgia, serif"
        fontWeight="bold"
        fontSize="175"
        letterSpacing="-3"
      >
        R
      </text>

      {/* CENTER 'O' (Globe + Cab-Over Semi Truck with Speed Streaks) */}
      <g transform="translate(122, 44)">
        {/* Globe Circular Outer Ring */}
        <circle
          cx="90"
          cy="90"
          r="78"
          stroke="#383c42"
          strokeWidth="3.5"
          fill="#fbfbfa"
        />

        {/* Continents (Dark Charcoal) */}
        <path
          d="M50 45 Q70 30, 100 32 Q130 35, 148 55 Q135 75, 120 70 Q105 60, 85 68 Q65 72, 50 45 Z"
          fill="#4b5563"
          opacity="0.85"
        />
        <path
          d="M130 90 Q150 95, 158 115 Q145 130, 130 125 Q125 110, 130 90 Z"
          fill="#4b5563"
          opacity="0.85"
        />
        <path
          d="M40 95 Q55 92, 65 105 Q55 125, 38 120 Q32 108, 40 95 Z"
          fill="#4b5563"
          opacity="0.85"
        />

        {/* Dynamic Speed Streaks (Motion trails behind truck cab) */}
        <g fill="#23262b">
          <polygon points="12,65 52,65 50,71 8,71" />
          <polygon points="18,77 56,77 54,83 14,83" />
          <polygon points="24,89 60,89 58,95 20,95" />
          <polygon points="30,101 64,101 62,107 26,107" />
          <polygon points="38,113 68,113 66,119 34,119" />
          <polygon points="46,125 72,125 70,131 42,131" />
        </g>

        {/* Commercial Transport Truck Cab (Modern Cab-over Semi) */}
        <g fill="#23262b">
          {/* Main Cab Body */}
          <path d="M68 62 L124 60 C128 60, 132 63, 133 67 L137 132 C137 136, 134 138, 130 138 L76 138 C70 138, 68 134, 68 128 L68 62 Z" />

          {/* Roof Fairing / Wind Deflector */}
          <path d="M72 52 Q98 48, 122 52 L120 60 L72 60 Z" fill="#383c42" />

          {/* Windshield Glass */}
          <path
            d="M74 68 L126 66 L124 90 L74 90 Z"
            fill="#ffffff"
            stroke="#23262b"
            strokeWidth="2.5"
          />
          {/* Windshield Center Divider & Glare */}
          <line x1="99" y1="67" x2="98" y2="90" stroke="#23262b" strokeWidth="2" />
          <path d="M80 72 L92 71 L88 86 L78 86 Z" fill="#e5e7eb" opacity="0.6" />

          {/* Grille Slats */}
          <rect x="76" y="96" width="46" height="4" rx="1" fill="#ffffff" />
          <rect x="76" y="103" width="46" height="4" rx="1" fill="#ffffff" />
          <rect x="78" y="110" width="42" height="4" rx="1" fill="#ffffff" />

          {/* Headlights */}
          <rect x="72" y="118" width="10" height="6" rx="1.5" fill="#fef08a" />
          <rect x="116" y="118" width="10" height="6" rx="1.5" fill="#fef08a" />

          {/* Front Bumper & Road Spoiler */}
          <rect x="66" y="126" width="66" height="8" rx="2" fill="#111827" />

          {/* Front Wheel & Rim */}
          <ellipse cx="64" cy="132" rx="11" ry="14" fill="#111827" />
          <ellipse cx="64" cy="132" rx="6" ry="8" fill="#9ca3af" />
          <circle cx="64" cy="132" r="3" fill="#374151" />
        </g>
      </g>

      {/* LETTER 'Y' (Serif, Crimson Red) */}
      <text
        x="292"
        y="192"
        fill="#7A1315"
        fontFamily="'Times New Roman', 'Playfair Display', Georgia, serif"
        fontWeight="bold"
        fontSize="175"
        letterSpacing="-3"
      >
        Y
      </text>

      {/* TAGLINE: SMART • SAFE • SECURE */}
      <g transform="translate(14, 230)">
        {/* SMART (Dark Charcoal / Black) */}
        <text
          x="0"
          y="0"
          fill="#1f2428"
          fontFamily="'Inter', -apple-system, sans-serif"
          fontWeight="bold"
          fontSize="17"
          letterSpacing="8"
        >
          SMART
        </text>

        {/* BULLET 1 (Red) */}
        <circle cx="130" cy="-6" r="3.5" fill="#7A1315" />

        {/* SAFE (Crimson Red) */}
        <text
          x="154"
          y="0"
          fill="#7A1315"
          fontFamily="'Inter', -apple-system, sans-serif"
          fontWeight="bold"
          fontSize="17"
          letterSpacing="8"
        >
          SAFE
        </text>

        {/* BULLET 2 (Forest Green) */}
        <circle cx="266" cy="-6" r="3.5" fill="#1b6b3e" />

        {/* SECURE (Forest Green) */}
        <text
          x="288"
          y="0"
          fill="#1b6b3e"
          fontFamily="'Inter', -apple-system, sans-serif"
          fontWeight="bold"
          fontSize="17"
          letterSpacing="8"
        >
          SECURE
        </text>
      </g>
    </svg>
  );

  // Default Image Asset rendering (with graceful fallback to vector)
  const renderImageLogo = () => {
    if (imageError) {
      return renderVectorLogo();
    }

    return (
      <img
        src="/roy-logo.png"
        alt={alt}
        onError={() => setImageError(true)}
        referrerPolicy="no-referrer"
        className={`${currentSizeClass} w-auto max-w-full object-contain ${className}`}
      />
    );
  };

  const content = variant === 'vector' ? renderVectorLogo() : renderImageLogo();

  if (withBadge) {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center bg-white rounded-lg p-1.5 sm:p-2 border border-[#e1ddd0]/80 shadow-2xs transition-transform duration-150 hover:scale-[1.02] ${
          onClick ? 'cursor-pointer' : ''
        }`}
      >
        {content}
      </div>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center focus:outline-hidden transition-transform duration-150 hover:scale-[1.02]"
      >
        {content}
      </button>
    );
  }

  return content;
};
