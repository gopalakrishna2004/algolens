# Changelog

All notable changes to the AlgoLens project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Topic Mastery System:** Interactive assessment modality accessible through the instrument navigation bar across all registered algorithm topics.
- **288-Question Curriculum Question Bank:** Complete question bank covering all 32 registered algorithms across 6 curriculum chapters (9 questions per topic: 3 Easy, 3 Medium, and 3 Hard):
  - **Searching (Chapter 01):** 18 questions across Linear Search and Binary Search.
  - **Sorting (Chapter 02):** 54 questions across Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and Heap Sort.
  - **Data Structures (Chapter 03):** 63 questions across Dynamic Array, Stack, Queue, Singly Linked List, Hash Table, Binary Heap, and Trie.
  - **Trees (Chapter 04):** 45 questions across Binary Tree, Binary Search Tree, In-order Traversal, Pre-order Traversal, and Post-order Traversal.
  - **Graphs (Chapter 05):** 45 questions across Breadth-First Search, Depth-First Search, Dijkstra's Algorithm, Prim's Algorithm, and Kruskal's Algorithm.
  - **Algorithmic Techniques (Chapter 06):** 63 questions across Recursion, Two Pointers, Sliding Window, Divide and Conquer, Greedy Algorithms, Backtracking, and Dynamic Programming.
- **Difficulty Stratification:** Assessment selector that dynamically samples exactly one Easy, one Medium, and one Hard question per 3-question session, with deterministic seed support.
- **Pedagogical Feedback Ledger:** Detailed post-assessment results breakdown providing option-level explanations, scoring summary, and earned mastery badges on 3/3 score.
- **Chapter Mastery Progression:** Gated milestone tracking that marks a chapter mastered only when all constituent topics are mastered.

### Improved
- **Active Assessment Persistence & Reload Invariance:** Active attempt state, question ordering, and selected answers are persisted to `localStorage` (`algolens_progress_v3`), preventing loss of in-flight attempts on page reload.
- **Mastery Non-Demotion Guarantee:** Once earned, topic mastery status is preserved permanently; subsequent re-attempts with scores below 3/3 record history without revoking earned mastery.
- **Modal Lifecycle State Cleanup:** Closing or cancelling an assessment after submission clears transient evaluation feedback, ensuring subsequent modal openings start cleanly.
- **Storage Migration Safeguards:** Automatic forward-migration from legacy V2 progress storage to V3 that preserves previously completed visualizer challenges and exploration history without falsely awarding mastery.

### Fixed
- **Landing Page Button Contrast:** Corrected the "Enter Laboratory" button background from light cream (`#F5F2EB`) to vermilion (`#C94B36`) in dark mode, elevating contrast with white text from a failing 1.12:1 to 4.62:1 (exceeding the WCAG AA 4.5:1 normal text threshold).
- **Navigation Progress Capsule Text Visibility:** Explicitly scoped text color on `.nav-progress-capsule` to `var(--text-primary)`, resolving dark-mode unstyled black text and improving contrast from 1.22:1 to 15.38:1.
- **Mastery Action Buttons Styling:** Calibrated dark-mode primary button styling to vermilion `#C94B36`, raising contrast with white text from 3.67:1 to 4.62:1.
- **Curriculum Question Precision:** Clarified edge-based height conventions in Binary Tree questions (`q-binary-tree-med-02`), non-negative weight preconditions and termination criteria in bidirectional Dijkstra (`q-dijkstra-hard-03`), and strictly second-best MST edge replacements in Kruskal's algorithm (`q-kruskal-hard-03`).

### Accessibility
- **Targeted Contrast Audit:** Audited 64 specific UI elements across the Landing Page, Laboratory Workspace, Mastery Modal, and Results Ledger in both Light and Dark themes, verifying each audited element meets WCAG 2.2 AA contrast requirements (normal text $\ge 4.5:1$, large text $\ge 3.0:1$, UI boundaries $\ge 3.0:1$).
- **Keyboard Navigation & Visible Focus:** High-contrast vermilion focus outlines (`outline: 2px solid var(--accent-vermilion); outline-offset: 2px/3px;`) across interactive controls, buttons, and radio option items, with `Escape` key modal dismissal.
- **Mobile Viewport Optimization:** Verified responsive behavior on a 375×667 mobile viewport with zero horizontal overflow, centered 335px modal presentation, and touch targets meeting or exceeding 44px height.
- **Multi-Cue State Indicators:** Semantic evaluation states pair color indicators with textual status badges, icons, and detailed explanations so feedback is not communicated through color alone.

### Testing and Quality
- **Unit and Invariant Test Suite:** Verified via `npm test` (`vitest run`), with 279 tests passing across 12 test files (0 failures, 0 skipped).
- **Automated Curriculum Invariant Checks:** Vitest test suite enforcing global question ID uniqueness, 3-option structure, valid answer keys, non-empty rationales, and exact 3E/3M/3H distributions across all 32 algorithms.
- **Production Build:** Verified via `npm run build` (`tsc -b && vite build`), compiling cleanly in under 1 second with 0 errors.
- **Linter Verification:** Verified via `npm run lint` (`oxlint`), executing across 94 files with 0 errors and 5 pre-existing React Compiler `setState-in-effect` warnings preserved in legacy components (`DataInput.tsx`, `App.tsx`, and `useAlgorithmPlayer.ts`).
