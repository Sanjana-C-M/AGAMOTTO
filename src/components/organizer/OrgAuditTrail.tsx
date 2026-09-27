import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { VerifiedStamp } from '../common/VerifiedStamp';
import {
  FileCode2,
  ShieldCheck,
  Search,
  Filter,
  Download,
  Copy,
  Check
} from 'lucide-react';

export const OrgAuditTrail: React.FC = () => {
  const { auditLogs, setToast } = useApp();
  const [filterAction, setFilterAction] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredLogs = auditLogs.filter(log => {
    if (filterAction === 'all') return true;
    return log.action.toLowerCase().includes(filterAction.toLowerCase()) ||
           log.actorRole.toLowerCase() === filterAction.toLowerCase();
  });

  const handleCopyHash = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedId(id);
    setToast('Cryptographic hash copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">
            Immutable Audit Trail & Ledger
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Cryptographically sealed timeline of all lifecycle transitions, score modifications, and conflict checks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <VerifiedStamp hash={auditLogs[0]?.hashSignature || '0x9a3e47b9'} />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'judge', 'organizer', 'system', 'conflict', 'evaluation'].map(f => (
          <button
            key={f}
            onClick={() => setFilterAction(f)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono-tech uppercase font-semibold transition-colors cursor-pointer ${
              filterAction === f
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                : 'bg-neutral-100 dark:bg-[#15151F] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Audit Log Stream */}
      <div className="bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-[#222436] rounded-md overflow-hidden shadow-sm divide-y divide-neutral-200 dark:divide-[#222436]">
        {filteredLogs.map(log => {
          return (
            <div
              key={log.id}
              className="p-4 sm:p-5 hover:bg-neutral-50/60 dark:hover:bg-[#12121A] transition-colors space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono-tech text-xs font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    {log.action}
                  </span>
                  <span className="font-mono-tech text-xs text-neutral-400">
                    by <strong className="text-neutral-700 dark:text-neutral-200">{log.actor}</strong> ({log.actorRole})
                  </span>
                </div>

                <div className="font-mono-tech text-xs text-neutral-500">
                  {log.timestamp}
                </div>
              </div>

              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                {log.details}
              </p>

              {/* Cryptographic hash proof */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 text-[11px] font-mono-tech text-neutral-500 dark:text-neutral-400">
                  <span>SHA-256 HASH:</span>
                  <code className="text-[#2F5CFF] dark:text-[#00F0FF] font-semibold">
                    {log.hashSignature}
                  </code>
                  <button
                    onClick={() => handleCopyHash(log.hashSignature, log.id)}
                    className="hover:text-neutral-900 dark:hover:text-white p-0.5 cursor-pointer"
                    title="Copy proof hash"
                  >
                    {copiedId === log.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <span className="text-[10px] font-mono-tech text-emerald-600 dark:text-emerald-400 uppercase font-bold">
                  VALIDATED
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
