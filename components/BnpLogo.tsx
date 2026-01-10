
import React from 'react';

interface BnpLogoProps {
  className?: string;
  size?: number;
}

const BnpLogo: React.FC<BnpLogoProps> = ({ className = "", size = 120 }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`} style={{ width: size }}>
      {/* Sheaf of Paddy (Dhaner Shish) SVG */}
      <svg 
        viewBox="0 0 200 240" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Main stalks */}
        <path d="M100 220C100 220 95 180 85 140" stroke="#1B5E20" strokeWidth="4" strokeLinecap="round"/>
        <path d="M100 220C100 220 105 180 115 140" stroke="#1B5E20" strokeWidth="4" strokeLinecap="round"/>
        <path d="M100 220V120" stroke="#1B5E20" strokeWidth="4" strokeLinecap="round"/>
        
        {/* Left Grain Branch */}
        <path d="M85 140C60 110 50 80 55 40" stroke="#757575" strokeWidth="3" fill="none"/>
        {[0, 15, 30, 45, 60].map((offset) => (
          <ellipse key={`l-${offset}`} cx={55 - offset/4} cy={40 + offset} rx="4" ry="8" transform={`rotate(-25, ${55 - offset/4}, ${40 + offset})`} fill="#E0E0E0" stroke="#9E9E9E" strokeWidth="0.5"/>
        ))}

        {/* Center Grain Branch */}
        <path d="M100 120C100 80 100 50 100 20" stroke="#757575" strokeWidth="3" fill="none"/>
        {[0, 15, 30, 45, 60, 75].map((offset) => (
          <ellipse key={`c-${offset}`} cx="100" cy={20 + offset} rx="4" ry="8" fill="#E0E0E0" stroke="#9E9E9E" strokeWidth="0.5"/>
        ))}

        {/* Right Grain Branch */}
        <path d="M115 140C140 110 150 80 145 40" stroke="#757575" strokeWidth="3" fill="none"/>
        {[0, 15, 30, 45, 60].map((offset) => (
          <ellipse key={`r-${offset}`} cx={145 + offset/4} cy={40 + offset} rx="4" ry="8" transform={`rotate(25, ${145 + offset/4}, ${40 + offset})`} fill="#E0E0E0" stroke="#9E9E9E" strokeWidth="0.5"/>
        ))}

        {/* Slogan Text representation as stylized paths/shapes to match the logo artwork */}
        <g transform="translate(45, 145) scale(0.6)">
          {/* Red portion "ধানের শীষে" stylized block */}
          <path d="M10 20H150V80H10Z" fill="#D32F2F" rx="4"/>
          <text x="80" y="60" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="24" fill="white" textAnchor="middle">ধানের শীষে</text>
          
          {/* Green portion "ভোট দিন" stylized block */}
          <path d="M10 85H150V145H10Z" fill="#1B5E20" rx="4"/>
          <text x="80" y="125" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="24" fill="white" textAnchor="middle">ভোট দিন</text>
        </g>
      </svg>
      
      {/* High-fidelity fallback/overlay text for better accessibility and crispness */}
      <div className="mt-[-15%] flex flex-col items-center leading-tight">
        <span className="text-[#D32F2F] font-black text-center" style={{ fontSize: size * 0.18 }}>ধানের</span>
        <span className="text-[#D32F2F] font-black text-center" style={{ fontSize: size * 0.18, marginTop: '-5%' }}>শীষে</span>
        <span className="text-[#1B5E20] font-black text-center" style={{ fontSize: size * 0.18, marginTop: '2%' }}>ভোট</span>
        <span className="text-[#1B5E20] font-black text-center" style={{ fontSize: size * 0.18, marginTop: '-5%' }}>দিন</span>
      </div>
    </div>
  );
};

export default BnpLogo;
