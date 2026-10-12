import React, { useState } from 'react';
import './CodeViewer.css';

interface CodeViewerProps {
  sourceCode: {
    c: string;
    typescript: string;
  };
  highlightLine?: number;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  sourceCode,
  highlightLine,
}) => {
  const [selectedLang, setSelectedLang] = useState<'c' | 'typescript'>('c');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activeCode = selectedLang === 'c' ? sourceCode.c : sourceCode.typescript;
  const lines = activeCode.split('\n');

  // Safe syntax token highlighter with full-line & inline comment support
  const renderHighlightedCode = (text: string) => {
    if (!text.trim()) return <span>&nbsp;</span>;

    // Check for full-line comment
    if (text.trim().startsWith('//')) {
      return <span className="syntax-comment">{text}</span>;
    }

    // Check for inline comment outside double quotes
    let codePart = text;
    let commentPart = '';
    const commentIdx = text.indexOf('//');
    if (commentIdx !== -1) {
      const beforeComment = text.slice(0, commentIdx);
      const quoteCount = (beforeComment.match(/"/g) || []).length;
      if (quoteCount % 2 === 0) {
        codePart = beforeComment;
        commentPart = text.slice(commentIdx);
      }
    }

    // Tokenizer regex for C / TS keywords, preprocessor, built-ins, numbers, strings
    const parts = codePart.split(
      /(\b(?:int|void|return|if|else|while|for|struct|typedef|bool|true|false|NULL|malloc|free|sizeof|#define|#include|class|private|public|new|function|let|const|var|number|string|printf|console)\b|\d+|"[^"]*"|<[^>]+>)/g
    );

    return (
      <span>
        {parts.map((part, i) => {
          if (
            /^(?:int|void|return|if|else|while|for|struct|typedef|bool|true|false|NULL|malloc|free|sizeof|#define|#include|class|private|public|new|function|let|const|var|number|string)$/.test(
              part
            )
          ) {
            return (
              <span key={i} className="syntax-keyword">
                {part}
              </span>
            );
          }
          if (/^(?:printf|console)$/.test(part)) {
            return (
              <span key={i} className="syntax-keyword" style={{ fontWeight: 600 }}>
                {part}
              </span>
            );
          }
          if (/^\d+$/.test(part)) {
            return (
              <span key={i} className="syntax-number">
                {part}
              </span>
            );
          }
          if (part.startsWith('"') || (part.startsWith('<') && part.endsWith('>'))) {
            return (
              <span key={i} className="syntax-string">
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
        {commentPart && <span className="syntax-comment">{commentPart}</span>}
      </span>
    );
  };

  return (
    <div className="editor-console">
      {/* Editor Top Bar */}
      <div className="editor-header">
        <div className="editor-tabs" role="tablist" aria-label="Programming language selector">
          <button
            type="button"
            role="tab"
            aria-selected={selectedLang === 'c'}
            className={`editor-tab-btn ${selectedLang === 'c' ? 'is-active' : ''}`}
            onClick={() => setSelectedLang('c')}
          >
            <span className="lang-icon">C</span>
            <span>C Source</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={selectedLang === 'typescript'}
            className={`editor-tab-btn ${selectedLang === 'typescript' ? 'is-active' : ''}`}
            onClick={() => setSelectedLang('typescript')}
          >
            <span className="lang-icon ts-icon">TS</span>
            <span>TypeScript</span>
          </button>
        </div>

        <div className="editor-header-right">
          {highlightLine && (
            <span className="active-line-badge">
              Active: Line {highlightLine}
            </span>
          )}
          <button
            type="button"
            className="editor-toggle-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? 'Expand ▾' : 'Collapse ▴'}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {!isCollapsed && (
        <div className="editor-gutter-stage">
          <table className="editor-lines-table">
            <tbody>
              {lines.map((line, idx) => {
                const lineNum = idx + 1;
                const isHighlighted = highlightLine === lineNum;

                return (
                  <tr
                    key={lineNum}
                    className={`editor-line-row ${
                      isHighlighted ? 'row-active-execution' : ''
                    }`}
                  >
                    <td className="line-number-cell">{lineNum}</td>
                    <td className="line-gutter-marker">
                      {isHighlighted ? <span className="execution-arrow">▶</span> : null}
                    </td>
                    <td className="line-content-cell">
                      <code>{renderHighlightedCode(line)}</code>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
