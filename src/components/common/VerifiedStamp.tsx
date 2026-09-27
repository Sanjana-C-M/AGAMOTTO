import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface VerifiedStampProps {
  hash?: string;
  timestamp?: string;
  verifier?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const VerifiedStamp: React.FC<VerifiedStampProps> = ({
  hash = '0x8f2a49c1',
  timestamp,
  verifier = 'AGAMOTTO INTEGRITY ENGINE',
  size = 'md'
}) => {
  return (
    <div className="inline-flex items-center gap-2 select-none transform -rotate-3 hover:rotate-0 transition-transform duration-200">
      <div className={`
        border-2 border-dashed border-[#2F5CFF] text-[#2F5CFF] bg-[#2F5CFF]/5
        dark:border-[#00F0FF] dark:text-[#00F0FF] dark:bg-[#00F0FF]/10
        px-3 py-1.5 rounded-md flex items-center gap-2 shadow-sm
      `}>
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <div className="flex flex-col text-left">
          <span className="font-stamp text-lg leading-tight tracking-wider font-bold uppercase">
            Verified & Audited
          </span>
          <span className="font-mono-tech text-[10px] tracking-widest opacity-80 uppercase">
            {verifier} · {hash.slice(0, 10)}
          </span>
        </div>
      </div>
    </div>
  );
};
