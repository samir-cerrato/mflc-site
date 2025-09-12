// src/app/visit/CopyAddressButton.tsx
"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyAddressButton({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    try {
      // ✅ use the prop (this should make `address` no longer dim)
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  }

  return (
    <button
      onClick={copyAddress}
      className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-base md:text-lg hover:bg-yellow-50"
      aria-label="Copiar dirección"
    >
      {copied ? (
        <>
          <Check className="h-5 w-5" /> Copiado
        </>
      ) : (
        <>
          <Copy className="h-5 w-5" /> Copiar dirección
        </>
      )}
    </button>
  );
}
