import React from 'react';
import './KeyboardShortcutsModal.css';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUT_ITEMS = [
  { key: 'Space', desc: 'Toggle playback (Play / Pause)' },
  { key: '←', desc: 'Step backward by one snapshot' },
  { key: '→', desc: 'Step forward by one snapshot' },
  { key: 'Home', desc: 'Rewind timeline to step 0' },
  { key: 'C', desc: 'Toggle Curriculum Explorer drawer' },
  { key: '1 / 2 / 3', desc: 'Switch mode (Explore / Guided / Challenge)' },
  { key: 'Esc', desc: 'Close open drawers and modals' },
  { key: '?', desc: 'Toggle keyboard shortcuts guide' },
];

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="shortcuts-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Keyboard Shortcuts">
      <div className="shortcuts-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="shortcuts-modal-header">
          <div className="header-title-box">
            <span className="optic-dot" />
            <h2 className="shortcuts-modal-title">Keyboard Shortcuts</h2>
          </div>
          <button
            type="button"
            className="shortcuts-close-btn"
            onClick={onClose}
            aria-label="Close keyboard shortcuts dialog"
          >
            ✕
          </button>
        </div>

        <p className="shortcuts-modal-intro">
          AlgoLens is designed for keyboard-driven laboratory interaction. Use these hotkeys to navigate the timeline without reaching for the pointer.
        </p>

        <div className="shortcuts-list" role="list">
          {SHORTCUT_ITEMS.map((item, idx) => (
            <div key={idx} className="shortcut-row" role="listitem">
              <span className="shortcut-desc">{item.desc}</span>
              <kbd className="shortcut-key-badge">{item.key}</kbd>
            </div>
          ))}
        </div>

        <div className="shortcuts-modal-footer">
          <span>Inputs and text fields naturally bypass these hotkeys.</span>
          <button type="button" className="shortcuts-dismiss-btn" onClick={onClose}>
            Got it (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};
