import React, { useState } from 'react';
import './SearchingComparison.css';

export const SearchingComparison: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="comparison-section">
      <div className="comparison-header">
        <div className="comparison-title">
          <span>⚖️</span>
          <span>Linear Search vs. Binary Search: Key Comparison</span>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="comparison-toggle-btn"
        >
          {isExpanded ? 'Collapse ▲' : 'Compare Algorithms ▼'}
        </button>
      </div>

      {isExpanded && (
        <div className="comparison-body">
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="feature-col">Feature</th>
                  <th className="algo-col">Linear Search</th>
                  <th className="algo-col">Binary Search</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-col">How It Works</td>
                  <td>
                    Checks each element sequentially from index <code>0</code> to <code>n-1</code> until a match is found.
                  </td>
                  <td>
                    Calculates <code>mid</code>, tests for equality, and eliminates half the search range at each step.
                  </td>
                </tr>

                <tr>
                  <td className="feature-col">Sorted Input Required?</td>
                  <td>
                    <strong>No.</strong> Works on completely unsorted, arbitrary arrays.
                  </td>
                  <td>
                    <strong>Yes.</strong> The array <em>must</em> be sorted in ascending order.
                  </td>
                </tr>

                <tr>
                  <td className="feature-col">Time Complexity</td>
                  <td>
                    Best: <span className="code-badge">O(1)</span><br />
                    Average: <span className="code-badge">O(n)</span><br />
                    Worst: <span className="code-badge">O(n)</span>
                  </td>
                  <td>
                    Best: <span className="code-badge">O(1)</span><br />
                    Average: <span className="code-badge">O(log n)</span><br />
                    Worst: <span className="code-badge">O(log n)</span>
                  </td>
                </tr>

                <tr>
                  <td className="feature-col">Space Complexity</td>
                  <td>
                    <span className="code-badge">O(1)</span> auxiliary memory.
                  </td>
                  <td>
                    <span className="code-badge">O(1)</span> auxiliary memory (iterative).
                  </td>
                </tr>

                <tr>
                  <td className="feature-col">Supported Data Structures</td>
                  <td>
                    Arrays, Linked Lists, streaming data without index lookups.
                  </td>
                  <td>
                    Arrays and data structures with <span className="code-badge">O(1)</span> random index access.
                  </td>
                </tr>

                <tr>
                  <td className="feature-col">When to Choose</td>
                  <td>
                    • Small datasets (e.g. &lt; 50 items).<br />
                    • Unsorted data when you only need to search once.<br />
                    • Singly linked lists.
                  </td>
                  <td>
                    • Data is already sorted.<br />
                    • Repeated lookup queries on the same dataset.<br />
                    • Large datasets (1,000,000 items takes at most ~20 steps!).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="takeaway-box">
            💡 <strong>Beginner Takeaway:</strong> If an array is unsorted and you only need to search it once, use <strong>Linear Search</strong>! Sorting first takes <code>O(n log n)</code>, which is slower than checking elements once (<code>O(n)</code>). But if the array is already sorted or queried many times, <strong>Binary Search</strong> is drastically faster.
          </div>
        </div>
      )}
    </section>
  );
};
