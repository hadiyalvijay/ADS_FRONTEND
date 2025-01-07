import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTheme } from './ThemeContext';

const EnhancedLoading = ({ fullScreen = false }) => {
  const { isDarkMode } = useTheme();
  
  
  const containerClasses = fullScreen
    ? `fixed inset-0 ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#ffffff]'} backdrop-blur-sm flex items-center justify-center z-50`
    : 'flex items-center justify-center p-4';

  return (
    <div className={containerClasses}>
      <div className="relative">
       
        <div
          className={`h-16 w-16 rounded-full border-4 border-t-transparent border-b-transparent 
            ${isDarkMode ? 'border-white/20' : 'border-black/20'} 
            animate-[spin_3s_linear_infinite]`}
        />

       
        <div
          className={`absolute inset-1 rounded-full border-4 border-l-transparent border-r-transparent 
            ${isDarkMode ? 'border-white/40' : 'border-black/40'} 
            animate-[spin_2s_linear_infinite_reverse]`}
        />

       
        <Loader2
          className={`absolute inset-0 m-auto h-8 w-8 animate-[spin_1.5s_linear_infinite] 
            ${isDarkMode ? 'text-white' : 'text-black'}`}
        />
      </div>
    </div>
  );
};

export default EnhancedLoading;
