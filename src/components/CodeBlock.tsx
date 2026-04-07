"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-hkm-border-light">
      {/* Title bar */}
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-hkm-code-bg/90 border-b border-white/10">
          <span className="text-xs font-medium text-hkm-gold">
            {title ?? language}
          </span>
          <CopyButton copied={copied} onClick={handleCopy} />
        </div>
      )}

      {/* Code area */}
      <div className="relative">
        {!title && !language && (
          <div className="absolute top-2 right-2">
            <CopyButton copied={copied} onClick={handleCopy} />
          </div>
        )}
        <pre className="!rounded-none !m-0">
          <code>{highlightSql(code)}</code>
        </pre>
      </div>
    </div>
  );
}

function CopyButton({
  copied,
  onClick,
}: {
  copied: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer text-hkm-blush/70 hover:text-hkm-blush hover:bg-white/10"
    >
      {copied ? (
        <>
          <Check size={12} />
          Copied
        </>
      ) : (
        <>
          <Copy size={12} />
          Copy
        </>
      )}
    </button>
  );
}

/**
 * Minimal syntax highlighting for SQL-like code.
 * Returns an array of React elements with colored spans.
 */
function highlightSql(code: string): React.ReactNode[] {
  const lines = code.split("\n");
  return lines.map((line, i) => {
    let highlighted: React.ReactNode;

    if (line.trimStart().startsWith("--") || line.trimStart().startsWith("#")) {
      // Comment
      highlighted = <span style={{ color: "#7a5c6a" }}>{line}</span>;
    } else {
      // Simple keyword + string highlighting
      highlighted = line.split(/('[^']*')/g).map((part, j) => {
        if (part.startsWith("'") && part.endsWith("'")) {
          return (
            <span key={j} style={{ color: "#CCB497" }}>
              {part}
            </span>
          );
        }
        // Highlight SQL keywords
        return part.split(/\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|GROUP BY|ORDER BY|HAVING|AS|CASE|WHEN|THEN|ELSE|END|COUNT|SUM|AVG|MAX|MIN|DISTINCT|NULL|NOT|IN|LIKE|BETWEEN|IS|UNION|ALL|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TABLE|VIEW|INDEX|WITH|LIMIT|OFFSET|TRUE|FALSE)\b/gi).map((word, k) => {
          if (/^(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|GROUP BY|ORDER BY|HAVING|AS|CASE|WHEN|THEN|ELSE|END|COUNT|SUM|AVG|MAX|MIN|DISTINCT|NULL|NOT|IN|LIKE|BETWEEN|IS|UNION|ALL|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TABLE|VIEW|INDEX|WITH|LIMIT|OFFSET|TRUE|FALSE)$/i.test(word)) {
            return (
              <span key={k} style={{ color: "#B0798E" }}>
                {word}
              </span>
            );
          }
          return word;
        });
      });
    }

    return (
      <span key={i}>
        {highlighted}
        {i < lines.length - 1 ? "\n" : ""}
      </span>
    );
  });
}
