'use client';
import { useEffect } from 'react';
import { useAppState } from '@/components/AppStateProvider';

const generatePatternSVG = (settings: any): string => {
  if (!settings || !settings.enabled || settings.type === 'none') return '';
  
  const { type, size, opacity, color, spacing, rotation } = settings;
  
  const patterns: Record<string, string> = {
    dots: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${spacing/2}" cy="${spacing/2}" r="${size/4}" fill="${color}" opacity="${opacity}"/>
      </svg>
    `,
    grid: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 0 L ${spacing} 0 M 0 0 L 0 ${spacing}" stroke="${color}" stroke-width="1" opacity="${opacity}" fill="none"/>
      </svg>
    `,
    waves: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 ${spacing/2} Q ${spacing/4} ${spacing/4} ${spacing/2} ${spacing/2} T ${spacing} ${spacing/2}" stroke="${color}" stroke-width="2" opacity="${opacity}" fill="none"/>
      </svg>
    `,
    'diagonal-lines': `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg" transform="rotate(${rotation})">
        <path d="M 0 0 L ${spacing} ${spacing} M 0 ${spacing} L ${spacing} 0" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
      </svg>
    `,
    hexagon: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <polygon points="${spacing/2},2 ${spacing-2},${spacing/4} ${spacing-2},${spacing-spacing/4} ${spacing/2},${spacing-2} 2,${spacing-spacing/4} 2,${spacing/4}" 
                 stroke="${color}" stroke-width="1" opacity="${opacity}" fill="none"/>
      </svg>
    `,
    circuit: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <g stroke="${color}" stroke-width="1" opacity="${opacity}" fill="none">
          <path d="M 0 ${spacing/2} L ${spacing/3} ${spacing/2} L ${spacing/3} ${spacing/4} L ${2*spacing/3} ${spacing/4} L ${2*spacing/3} ${3*spacing/4} L ${spacing} ${3*spacing/4}"/>
          <circle cx="${spacing/3}" cy="${spacing/2}" r="2"/>
          <circle cx="${2*spacing/3}" cy="${spacing/4}" r="2"/>
        </g>
      </svg>
    `,
    geometric: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <g opacity="${opacity}">
          <polygon points="${spacing/2},${size/4} ${spacing-size/4},${spacing/2} ${spacing/2},${spacing-size/4} ${size/4},${spacing/2}" stroke="${color}" stroke-width="1" fill="none"/>
          <circle cx="${spacing/2}" cy="${spacing/2}" r="${size/8}" fill="${color}"/>
        </g>
      </svg>
    `,
    stars: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <g opacity="${opacity}" fill="${color}">
          <polygon points="${spacing/2},${size/4} ${spacing/2+2},${spacing/2-2} ${spacing/2+size/4},${spacing/2} ${spacing/2+2},${spacing/2+2} ${spacing/2},${spacing-size/4} ${spacing/2-2},${spacing/2+2} ${spacing/2-size/4},${spacing/2} ${spacing/2-2},${spacing/2-2}"/>
        </g>
      </svg>
    `,
    crosses: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <g stroke="${color}" stroke-width="2" opacity="${opacity}">
          <line x1="${spacing/2-size/4}" y1="${spacing/2}" x2="${spacing/2+size/4}" y2="${spacing/2}"/>
          <line x1="${spacing/2}" y1="${spacing/2-size/4}" x2="${spacing/2}" y2="${spacing/2+size/4}"/>
        </g>
      </svg>
    `,
    mesh: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <g stroke="${color}" stroke-width="0.5" opacity="${opacity}" fill="none">
          <path d="M 0 0 L ${spacing} 0 M 0 0 L 0 ${spacing} M 0 ${spacing/2} L ${spacing} ${spacing/2} M ${spacing/2} 0 L ${spacing/2} ${spacing}"/>
          <circle cx="${spacing/4}" cy="${spacing/4}" r="1"/>
          <circle cx="${3*spacing/4}" cy="${3*spacing/4}" r="1"/>
        </g>
      </svg>
    `,
    bubbles: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <g opacity="${opacity}">
          <circle cx="${spacing/4}" cy="${spacing/4}" r="${size/6}" fill="${color}"/>
          <circle cx="${3*spacing/4}" cy="${spacing/2}" r="${size/8}" fill="${color}"/>
          <circle cx="${spacing/2}" cy="${3*spacing/4}" r="${size/10}" fill="${color}"/>
        </g>
      </svg>
    `
  };

  return patterns[type] || '';
};

// Pattern animation keyframes
const patternAnimations = `
@keyframes pattern-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes pattern-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pattern-float {
  0%, 100% { 
    transform: translateY(0px) translateX(0px);
  }
  25% { 
    transform: translateY(-10px) translateX(5px);
  }
  50% { 
    transform: translateY(-5px) translateX(-5px);
  }
  75% { 
    transform: translateY(10px) translateX(-10px);
  }
}

@keyframes pattern-scale {
  0%, 100% { 
    transform: scale(1);
  }
  50% { 
    transform: scale(1.05);
  }
}

.pattern-animated::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: -1;
}

.pattern-pulse::before {
  animation: pattern-pulse var(--pattern-animation-duration, 3s) ease-in-out infinite;
}

.pattern-rotate::before {
  animation: pattern-rotate var(--pattern-animation-duration, 3s) linear infinite;
}

.pattern-float::before {
  animation: pattern-float var(--pattern-animation-duration, 3s) ease-in-out infinite;
}

.pattern-scale::before {
  animation: pattern-scale var(--pattern-animation-duration, 3s) ease-in-out infinite;
}
`;

export default function BackgroundPatternStyles() {
  const { portfolioData } = useAppState();

  useEffect(() => {
    const settings = portfolioData.theme.backgroundPattern;
    
    // Remove existing pattern styles
    const existingStyle = document.getElementById('background-pattern-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    const existingBodyClass = document.body.className.replace(/pattern-\w+/g, '').trim();
    document.body.className = existingBodyClass;

    // Only apply patterns if enabled
    if (!settings?.enabled || settings.type === 'none') {
      return;
    }

    // Generate pattern SVG
    const patternSVG = generatePatternSVG(settings);
    if (!patternSVG) return;

    const patternDataUrl = `data:image/svg+xml;base64,${btoa(patternSVG)}`;
    
    // Create and inject styles
    const style = document.createElement('style');
    style.id = 'background-pattern-styles';
    
    const animationDuration = settings.animationSpeed ? `${10 - settings.animationSpeed}s` : '3s';
    
    style.textContent = `
      ${patternAnimations}
      
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(${patternDataUrl});
        background-repeat: repeat;
        background-attachment: fixed;
        pointer-events: none;
        z-index: -10;
        opacity: 1;
        transform: rotate(${settings.rotation || 0}deg);
        --pattern-animation-duration: ${animationDuration};
      }
      
      ${settings.animationType && settings.animationType !== 'none' ? `
        body::before {
          animation: pattern-${settings.animationType} ${animationDuration} infinite;
        }
      ` : ''}
      
      /* Ensure the pattern is visible but doesn't interfere with content */
      body {
        position: relative;
      }
      
      /* Optional: Add subtle overlay to ensure text readability */
      .pattern-overlay {
        background: rgba(var(--background), 0.02);
      }
    `;
    
    document.head.appendChild(style);

    // Add animation class to body if needed
    if (settings.animationType && settings.animationType !== 'none') {
      document.body.classList.add('pattern-animated', `pattern-${settings.animationType}`);
    }

    return () => {
      // Cleanup on unmount or settings change
      const styleElement = document.getElementById('background-pattern-styles');
      if (styleElement) {
        styleElement.remove();
      }
      
      const bodyClasses = document.body.className.replace(/pattern-\w+/g, '').trim();
      document.body.className = bodyClasses;
    };
  }, [portfolioData.theme.backgroundPattern]);

  return null; // This component doesn't render anything
}
