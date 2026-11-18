import React from 'react';

const BookCover = ({ book, size = 'md', className = '' }) => {
  const { title, author, coverStyle = {} } = book || {};
  const bg = coverStyle.bg || '#1e293b';
  const textColor = coverStyle.textColor || '#ffffff';
  const accentColor = coverStyle.accentColor || '#38bdf8';
  const iconType = coverStyle.iconType || 'generic';

  // Size configurations
  const sizeClasses = {
    sm: 'w-20 h-28 text-[9px]',
    md: 'w-32 h-44 text-[11px]',
    lg: 'w-48 h-64 text-sm',
    xl: 'w-64 h-88 text-base md:w-72 md:h-96',
  };

  const renderGraphic = () => {
    switch (iconType) {
      case 'minimal-arch':
        return (
          <div className="flex flex-col items-center justify-center my-auto py-2">
            <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" stroke={textColor} strokeWidth="12">
              <path d="M 25 85 L 25 50 C 25 25 75 25 75 50 L 75 85" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'target-circle':
        return (
          <div className="flex flex-col items-center justify-center my-auto py-2">
            <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
              <circle cx="50" cy="50" r="40" stroke={accentColor} strokeWidth="6" strokeDasharray="6 4" />
              <circle cx="50" cy="50" r="26" stroke={accentColor} strokeWidth="6" />
              <circle cx="50" cy="50" r="12" fill={accentColor} />
            </svg>
          </div>
        );
      case 'open-book-bulb':
        return (
          <div className="flex flex-col items-center justify-center my-auto py-2">
            <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" stroke={accentColor} strokeWidth="5">
              <path d="M 20 65 Q 50 55 50 40 Q 50 55 80 65 L 80 35 Q 50 25 50 15 Q 50 25 20 35 Z" fill={accentColor} fillOpacity="0.2" />
              <circle cx="50" cy="30" r="8" fill={accentColor} />
              <path d="M 50 10 L 50 5 M 35 15 L 30 10 M 65 15 L 70 10" stroke={textColor} strokeWidth="3" />
            </svg>
          </div>
        );
      case 'path-star':
        return (
          <div className="flex flex-col items-center justify-center my-auto py-2 relative">
            <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
              <path d="M 20 90 Q 50 60 50 30" stroke={accentColor} strokeWidth="6" strokeLinecap="round" />
              <polygon points="50,15 54,25 65,25 56,32 59,42 50,36 41,42 44,32 35,25 46,25" fill={accentColor} />
              {/* Silhouette figure */}
              <circle cx="28" cy="70" r="4" fill={textColor} />
              <path d="M 28 75 L 28 86 M 25 80 L 31 80" stroke={textColor} strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'foggy-silhouette':
        return (
          <div className="flex flex-col items-center justify-center my-auto py-2">
            <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
              <circle cx="50" cy="25" r="14" fill="#38bdf8" fillOpacity="0.4" />
              <circle cx="50" cy="25" r="6" fill="#f8fafc" />
              <path d="M 45 45 C 45 40 55 40 55 45 L 58 75 L 42 75 Z" fill="#0f172a" />
              <circle cx="50" cy="38" r="4" fill="#0f172a" />
              <line x1="15" y1="80" x2="85" y2="80" stroke="#334155" strokeWidth="3" />
            </svg>
          </div>
        );
      case 'stars-couple':
        return (
          <div className="flex flex-col items-center justify-center my-auto py-2">
            <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
              <circle cx="30" cy="20" r="1.5" fill="#fde047" />
              <circle cx="70" cy="15" r="2" fill="#fde047" />
              <circle cx="50" cy="35" r="1.5" fill="#fde047" />
              <circle cx="80" cy="40" r="1" fill="#fde047" />
              <path d="M 35 75 C 35 60 48 60 48 75 Z" fill="#18181b" />
              <circle cx="42" cy="56" r="4" fill="#18181b" />
              <path d="M 52 75 C 52 62 65 62 65 75 Z" fill="#18181b" />
              <circle cx="58" cy="58" r="4" fill="#18181b" />
            </svg>
          </div>
        );
      case 'space-rocket':
        return (
          <div className="flex flex-col items-center justify-center my-auto py-2">
            <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
              <path d="M 50 20 Q 65 40 60 65 L 40 65 Q 35 40 50 20 Z" fill={textColor} />
              <circle cx="50" cy="40" r="4" fill="#0284c7" />
              <path d="M 45 65 L 50 80 L 55 65 Z" fill="#f97316" />
              <path d="M 35 55 L 40 65 L 30 68 Z" fill="#ef4444" />
              <path d="M 65 55 L 60 65 L 70 68 Z" fill="#ef4444" />
            </svg>
          </div>
        );
      case 'spooky-mansion':
        return (
          <div className="flex flex-col items-center justify-center my-auto py-2">
            <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" stroke={textColor} strokeWidth="3">
              <path d="M 30 75 L 30 50 L 50 30 L 70 50 L 70 75 Z" fill="#022c22" />
              <polygon points="50,15 42,30 58,30" fill={accentColor} />
              <rect x="44" y="58" width="12" height="17" fill="#fef08a" />
              <rect x="36" y="48" width="6" height="6" fill="#fef08a" />
              <rect x="58" y="48" width="6" height="6" fill="#fef08a" />
            </svg>
          </div>
        );
      case 'cute-kitten':
        return (
          <div className="flex flex-col items-center justify-center my-auto py-2">
            <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
              <ellipse cx="50" cy="55" rx="24" ry="20" fill="#fed7aa" />
              <circle cx="50" cy="40" r="16" fill="#fed7aa" />
              <polygon points="36,32 32,18 44,26" fill="#fdba74" />
              <polygon points="64,32 68,18 56,26" fill="#fdba74" />
              <circle cx="44" cy="38" r="2.5" fill="#431407" />
              <circle cx="56" cy="38" r="2.5" fill="#431407" />
              <path d="M 47 43 Q 50 46 53 43" stroke="#431407" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center my-auto py-2">
            <svg viewBox="0 0 100 100" className="w-14 h-14" fill="none" stroke={textColor} strokeWidth="4">
              <rect x="25" y="20" width="50" height="60" rx="4" />
              <line x1="35" y1="35" x2="65" y2="35" strokeWidth="3" />
              <line x1="35" y1="50" x2="65" y2="50" strokeWidth="3" />
              <line x1="35" y1="65" x2="55" y2="65" strokeWidth="3" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative rounded-md shadow-lg overflow-hidden flex flex-col justify-between p-3 select-none transition-transform duration-200 hover:scale-[1.02] ${sizeClasses[size] || sizeClasses.md} ${className}`}
      style={{
        backgroundColor: bg,
        color: textColor,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 20px -4px rgba(0,0,0,0.5)',
      }}
    >
      {/* Subtle Book Spine crease effect */}
      <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/35 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />

      {/* Header / Title */}
      <div className="text-center font-extrabold uppercase tracking-wider leading-tight z-10 px-1">
        <span className="line-clamp-2 drop-shadow-sm font-serif">
          {title}
        </span>
      </div>

      {/* Visual / Graphic */}
      <div className="z-10 flex-1 flex items-center justify-center">
        {renderGraphic()}
      </div>

      {/* Author / Subtitle Footer */}
      <div className="text-center z-10 mt-auto border-t border-current/20 pt-1.5 px-1">
        <div className="text-[0.8em] font-semibold tracking-wide uppercase opacity-90 truncate">
          {author}
        </div>
      </div>
    </div>
  );
};

export default BookCover;
