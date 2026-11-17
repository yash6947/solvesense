'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

/**
 * Parses and renders mixed text containing LaTeX formulas:
 * - Block math: `$$...$$` or `\[...\]`
 * - Inline math: `$..$` or `\(...\)`
 */
export const MathRenderer: React.FC<MathRendererProps> = ({
  content,
  className = '',
  inline = false,
}) => {
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    try {
      // If pure inline mode requested and no delimiters present
      if (inline && !content.includes('$')) {
        return katex.renderToString(content, {
          throwOnError: false,
          displayMode: false,
        });
      }

      // Tokenize mixed Markdown + LaTeX content
      let processed = content;

      // 1. Process block equations ($$...$$ or \[...\])
      processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (_match, math) => {
        try {
          return `<div class="my-2 overflow-x-auto text-center">${katex.renderToString(
            math.trim(),
            { throwOnError: false, displayMode: true }
          )}</div>`;
        } catch (e) {
          return `<div class="text-amber-400 font-mono text-sm">[Math Error: ${math}]</div>`;
        }
      });

      // 2. Process inline equations ($...$ or \(...\))
      processed = processed.replace(/\$(.*?)\$/g, (_match, math) => {
        try {
          return katex.renderToString(math.trim(), {
            throwOnError: false,
            displayMode: false,
          });
        } catch (e) {
          return `<span class="text-amber-400 font-mono text-xs">[Math: ${math}]</span>`;
        }
      });

      // 3. Convert basic linebreaks into <br />
      processed = processed.replace(/\n\n/g, '<div class="h-3"></div>');

      return processed;
    } catch (err) {
      console.error('MathRenderer parsing error:', err);
      return content;
    }
  }, [content, inline]);

  return (
    <div
      className={`prose prose-invert max-w-none text-slate-200 leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

export default MathRenderer;
