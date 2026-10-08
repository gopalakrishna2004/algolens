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

  // Simple, safe syntax token highlighter
  const renderHighlightedCode = (text: string) => {
    if (!text.trim()) return <span>&nbsp;</span>;

    // Check for comment
    if (text.trim().startsWith('//')) {
      return <span className="syntax-comment">{text}</span>;
    }

    // Tokenizer regex for C / TS keywords, numbers, types
    const parts = text.split(/(\b(?:int|void|return|if|else|while|for|struct|typedef|bool|true|false|NULL|malloc|free|sizeof|#define|class|private|public|new|function|let|const|var|number|string)\b|\d+|"[^"]*")/g);

    return (
      <span>
        {parts.map((part, i) => {
          if (
            /^(?:int|void|return|if|else|while|for|struct|typedef|bool|true|false|NULL|malloc|free|sizeof|#define|class|private|public|new|function|let|const|var|number|string)$/.test(
              part
            )
          ) {
            return (
              <span key={i} className="syntax-keyword">
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
          if (part.startsWith('"')) {
            return (
              <span key={i} className="syntax-string">
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div className="editor-console">
      {/* Editor Top Bar */}
      <div className="editor-header">
        <div className="editor-tabs">
          <button
            type="button"
            className={`editor-tab-btn ${selectedLang === 'c' ? 'is-active' : ''}`}
            onClick={() => setSelectedLang('c')}
          >
            <span className="lang-icon">C</span>
            <span>C Source</span>
          </button>
          <button
            type="button"
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
