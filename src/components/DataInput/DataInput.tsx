import React, { useState, useEffect } from 'react';
import './DataInput.css';

interface DataInputProps {
  initialArray: number[];
  initialTarget: number;
  disabled: boolean;
  showTarget?: boolean;
  requireSorted?: boolean;
  onUpdateData: (array: number[], target: number) => void;
  onSortArray: () => void;
}

export const DataInput: React.FC<DataInputProps> = ({
  initialArray,
  initialTarget,
  disabled,
  showTarget = true,
  requireSorted = false,
  onUpdateData,
  onSortArray,
}) => {
  const [arrayStr, setArrayStr] = useState(initialArray.join(', '));
  const [targetInput, setTargetInput] = useState(String(initialTarget));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync state whenever external initial values change
  useEffect(() => {
    setArrayStr(initialArray.join(', '));
    setErrorMessage(null);
  }, [initialArray]);

  useEffect(() => {
    setTargetInput(String(initialTarget));
    setErrorMessage(null);
  }, [initialTarget]);

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrayStr(e.target.value);
    setErrorMessage(null);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetInput(e.target.value);
    setErrorMessage(null);
  };

  const applyChanges = (arrString: string, targetValStr: string) => {
    const rawTokens = arrString.split(',').map((t) => t.trim()).filter(Boolean);

    if (rawTokens.length === 0) {
      setErrorMessage('Please enter at least one number in the array.');
      return;
    }

    const parsedArray: number[] = [];
    for (const token of rawTokens) {
      const num = parseInt(token, 10);
      if (isNaN(num)) {
        setErrorMessage(`"${token}" is not a valid number. Please use comma-separated integers.`);
        return;
      }
      parsedArray.push(num);
    }

    const parsedTarget = parseInt(targetValStr.trim(), 10);
    if (isNaN(parsedTarget)) {
      setErrorMessage('Please enter a valid number for the search target.');
      return;
    }

    setErrorMessage(null);
    onUpdateData(parsedArray, parsedTarget);
  };

  const handleBlur = () => {
    applyChanges(arrayStr, targetInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyChanges(arrayStr, targetInput);
    }
  };

  const handleGenerateRandom = () => {
    setErrorMessage(null);
    const length = 8;
    const randomArr = Array.from({ length }, () =>
      Math.floor(Math.random() * 90) + 10
    );

    // If binary search requires sorted input, sort the random values
    if (requireSorted) {
      randomArr.sort((a, b) => a - b);
    }

    // Pick either one of the array elements (to ensure found) or a random number
    const shouldExist = Math.random() > 0.3;
    const randomTarget = shouldExist
      ? randomArr[Math.floor(Math.random() * randomArr.length)]
      : Math.floor(Math.random() * 90) + 10;

    setArrayStr(randomArr.join(', '));
    setTargetInput(String(randomTarget));
    onUpdateData(randomArr, randomTarget);
  };

  return (
    <div className="data-input-panel">
      <div className="data-input-row">
        <div className="input-field-group">
          <label htmlFor="array-data">Array:</label>
          <input
            id="array-data"
            type="text"
            value={arrayStr}
            onChange={handleArrayChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="e.g. 5, 12, 19, 23, 35"
            className="text-input array-input"
          />
        </div>

        {showTarget && (
          <div className="input-field-group">
            <label htmlFor="target-data">Target:</label>
            <input
              id="target-data"
              type="number"
              value={targetInput}
              onChange={handleTargetChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className="text-input target-input"
            />
          </div>
        )}

        <div className="input-actions">
          <button
            type="button"
            onClick={handleGenerateRandom}
            disabled={disabled}
            className="action-btn"
          >
            🎲 Randomize
          </button>

          <button
            type="button"
            onClick={onSortArray}
            disabled={disabled}
            className="action-btn sort-btn"
            title="Sort the array in ascending order"
          >
            📶 Sort Array
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="input-error-msg">
          <span>⚠️ {errorMessage}</span>
        </div>
      )}
    </div>
  );
};
