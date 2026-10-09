'use client';

import { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';

const CopyEmail = ({ email }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="card group w-full sm:w-auto inline-flex items-center justify-between gap-4 px-4 py-3 rounded-xl text-left"
      aria-label={`Copy email address ${email}`}
    >
      <span className="flex items-center gap-3 min-w-0">
        <Mail className="w-4 h-4 text-accent shrink-0" />
        <span className="font-mono text-sm text-gray-100 truncate">{email}</span>
      </span>
      <span className="flex items-center gap-1.5 text-xs text-gray-400 group-hover:text-white shrink-0" aria-live="polite">
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied' : 'Copy'}
      </span>
    </button>
  );
};

export default CopyEmail;
