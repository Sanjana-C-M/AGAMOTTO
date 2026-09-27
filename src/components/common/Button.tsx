import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent-magenta' | 'accent-cyan';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
  };

  // Buttons are rounded corner rectangles (rounded-[6px]) per prompt
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-[6px] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus-visible:outline-2 focus-visible:outline-offset-2';

  // In Light mode: #00F0FF for primary with black text
  // In Dark mode: Neon lime #C6FF1A for primary with pitch dark text
  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses = `
        bg-[#00F0FF] text-black font-bold hover:bg-[#1cf2ff] active:bg-[#00d6e6] shadow-xs
        dark:bg-[#C6FF1A] dark:text-[#020204] dark:font-bold dark:hover:bg-[#d5ff45] dark:active:bg-[#b2eb12]
      `;
      break;
    case 'secondary':
      variantClasses = `
        bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-200
        dark:bg-[#0D0E16] dark:text-neutral-200 dark:hover:bg-[#151624] dark:border-[#1E2032]
      `;
      break;
    case 'outline':
      variantClasses = `
        border border-neutral-300 text-neutral-800 hover:bg-[#00F0FF]/10 hover:border-[#00F0FF]
        dark:border-[#222538] dark:text-neutral-300 dark:hover:bg-[#0E0F1A] dark:hover:border-[#C6FF1A]/50
      `;
      break;
    case 'ghost':
      variantClasses = `
        text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900
        dark:text-neutral-400 dark:hover:bg-[#0E0F1A] dark:hover:text-white
      `;
      break;
    case 'danger':
      variantClasses = `
        bg-red-600 text-white hover:bg-red-700
        dark:bg-red-500/20 dark:text-red-400 dark:border dark:border-red-500/30 dark:hover:bg-red-500/30
      `;
      break;
    case 'accent-magenta':
      variantClasses = `
        bg-[#FF2ED1] text-white hover:bg-[#e614b8] font-semibold shadow-xs
      `;
      break;
    case 'accent-cyan':
      variantClasses = `
        bg-[#00F0FF] text-black font-semibold hover:bg-[#3bf4ff] shadow-xs
      `;
      break;
  }

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
