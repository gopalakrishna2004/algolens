# AlgoLens 2.0 — A Living Computational Monograph

> *“Algorithms observed as living thought.”*

AlgoLens is an interactive computer science instrument and visual algorithm laboratory. It renders algorithmic execution not as simulated animations, but as frame-accurate mathematical snapshots in motion.

Designed for students, engineers, and educators, AlgoLens pairs deterministic execution tracing with an editorial aesthetic, an interactive prediction challenge mode, and a comprehensive topic mastery assessment engine. The core application runs client-side in the browser without requiring a backend service or external model APIs.

---

## Key Features

- **Living Computational Monograph**: An editorial design system featuring art-directed typography (`Newsreader` serif, `Plus Jakarta Sans`, and `JetBrains Mono`), warm ivory paper ground (`#fbf9f4`) in light mode, and deep sumi ink (`#20201D`) in dark mode.
- **32 Registered Algorithms Across 6 Chapters**: Full curriculum coverage spanning Searching, Sorting, Data Structures, Trees, Graphs, and Advanced Algorithmic Techniques.
- **Three Pedagogical Modalities**:
  - **Explore Mode**: Unconstrained playback controls, variable stepping speeds, manual scrubbing, and custom user dataset inputs.
  - **Guided Mode**: Frame-by-frame structural invariants, step-by-step telemetry, time and space complexity metrics, and synchronized C/TypeScript source code.
  - **Challenge Mode**: Context-grounded prediction challenges generated directly from upcoming execution snapshots before state mutations occur.
- **Topic Mastery Assessment System**:
  - Stratified 3-question evaluation sessions (1 Easy, 1 Medium, 1 Hard) sampled from a 288-question curriculum question bank.
  - Contextual code snippets, viva exam questions, and invariant rationales.
  - Earned mastery badges on 3/3 scores with permanent non-demotion logic.
- **Live Source Code Synchronization**: Visualizer stepping synchronizes in real time with line-by-line debugger highlighting across C and TypeScript representations.
- **Local Browser Persistence**: Progress, streaks, exploration history, and active assessment attempts persist in `localStorage` (`algolens_progress_v3`).
- **Keyboard-Driven Interaction**: Full hotkey support for timeline control, mode selection, drawer navigation, and dialogs.
- **Accessibility Enhancements**: High-contrast focus rings (`outline: 2px solid var(--accent-vermilion)`), targeted contrast enhancements on audited controls and progress badges documented in [CHANGELOG.md](CHANGELOG.md), and multi-cue status indicators.

---

## Visual Previews

Screenshots and visual regression artifacts are available locally in the `screenshots/` directory for development review, but are not published in the remote repository.

---

## Curriculum Coverage

AlgoLens 2.0 covers **32 algorithms and data structures** organized into six curriculum chapters in `src/algorithms/registry.ts`:

### Chapter 01: Searching
- **Linear Search** (`linear-search`) — Sequential scan with dynamic user array and target source generation.
- **Binary Search** (`binary-search`) — Logarithmic search with sorted-range invariant tracking and interval halving.

### Chapter 02: Sorting
- **Bubble Sort** (`bubble-sort`) — Adjacent swap choreography and early-exit termination.
- **Selection Sort** (`selection-sort`) — Minimum boundary discovery and sorted prefix partitioning.
- **Insertion Sort** (`insertion-sort`) — Key insertion into pre-sorted prefixes.
- **Merge Sort** (`merge-sort`) — Recursive divide-and-conquer auxiliary merge visualization.
- **Quick Sort** (`quick-sort`) — Lomuto partition scheme with pivot placement.
- **Heap Sort** (`heap-sort`) — Binary max-heap transformation and in-place extraction.

### Chapter 03: Data Structures
- **Dynamic Array** (`array-operations`) — Push, pop, insert, and delete with index rebalancing.
- **Stack** (`stack-operations`) — LIFO memory model with push/pop operations.
- **Queue** (`queue-operations`) — FIFO sequencing with enqueue/dequeue operations.
- **Singly Linked List** (`linked-list-operations`) — Pointer node chaining, traversal, insertion, and deletion.
- **Hash Table** (`hash-table-operations`) — Key hashing, bucket addressing, and collision chaining.
- **Binary Heap** (`heap-operations`) — Complete binary tree array representation and heapify percolations.
- **Trie** (`trie-operations`) — Prefix tree character branching and dictionary search.

### Chapter 04: Trees
- **Binary Tree** (`binary-tree`) — Hierarchical node insertion and tree balancing.
- **Binary Search Tree** (`bst`) — BST ordered property verification, search, and insertion.
- **In-order Traversal** (`inorder-traversal`) — Left-Root-Right recursive traversal path.
- **Pre-order Traversal** (`preorder-traversal`) — Root-Left-Right recursive traversal path.
- **Post-order Traversal** (`postorder-traversal`) — Left-Right-Root recursive traversal path.

### Chapter 05: Graphs
- **Breadth-First Search** (`bfs`) — Level-by-level queue frontier exploration.
- **Depth-First Search** (`dfs`) — Deep recursive path visitation and backtracking.
- **Dijkstra's Algorithm** (`dijkstra`) — Single-source shortest path with priority relaxation.
- **Prim's Algorithm** (`prim`) — Minimum spanning tree construction via growing tree frontier.
- **Kruskal's Algorithm** (`kruskal`) — Minimum spanning tree construction via greedy edge weight sorting and cycle avoidance.

### Chapter 06: Algorithmic Techniques
- **Recursion & Call Stack** (`recursion`) — Stack frame lifecycles, base cases, and return bubbling.
- **Two Pointers** (`two-pointers`) — Inward pointer traversal on sorted arrays.
- **Sliding Window** (`sliding-window`) — Dynamic sub-array window expansion and contraction.
- **Divide and Conquer** (`divide-and-conquer`) — Sub-problem decomposition and aggregate combination.
- **Greedy Algorithms** (`greedy`) — Locally optimal choice sequencing.
- **Backtracking** (`backtracking`) — Constraint satisfaction with candidate exploration and pruning.
- **Dynamic Programming** (`dynamic-programming`) — Overlapping sub-problems, memoization table, and state transitions.

---

## Keyboard Navigation

Keyboard shortcuts are handled globally in `src/App.tsx` and documented within the in-app modal (`src/components/Navigation/KeyboardShortcutsModal.tsx`):

| Key | Scope | Action |
| :--- | :--- | :--- |
| `Space` | Laboratory (`#lab`) | Toggle playback (Play / Pause) |
| `←` (`ArrowLeft`) | Laboratory (`#lab`) | Step backward by one execution snapshot |
| `→` (`ArrowRight`) | Laboratory (`#lab`) | Step forward by one execution snapshot |
| `Home` | Laboratory (`#lab`) | Rewind timeline to initial step (Step 0) |
| `C` | Laboratory (`#lab`) | Toggle the Curriculum Explorer sidebar drawer |
| `1` / `2` / `3` | Laboratory (`#lab`) | Switch learning mode (`1`: Explore, `2`: Guided, `3`: Challenge) |
| `?` or `Shift + /` | Global | Toggle Keyboard Shortcuts Guide modal |
| `Escape` | Global | Dismiss open modals (Shortcuts, Mastery) or close sidebar drawer |

*Note: Interactive text inputs and number fields naturally bypass timeline shortcuts.*

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) (`react: ^19.2.8`, `react-dom: ^19.2.8`)
- **Language**: [TypeScript 6](https://www.typescriptlang.org/) (`typescript: ~6.0.2`)
- **Build Tool**: [Vite 8](https://vite.dev/) (`vite: ^8.3.0`, `@vitejs/plugin-react: ^6.1.1`)
- **Styling Architecture**: Custom CSS Design Tokens via CSS variables (`src/index.css`)
- **Typography**: Google Fonts CDN (`Newsreader`, `Plus Jakarta Sans`, `JetBrains Mono`)
- **Testing**: [Vitest 5](https://vitest.dev/) (`vitest: ^5.0.3` — 279 tests across 12 suites)
- **Static Analysis**: [Oxlint](https://oxc.rs/docs/guide/usage/linter) (`oxlint: ^1.81.0`)
- **Hosting & Infrastructure**: [Cloudflare Workers](https://developers.cloudflare.com/workers/) Static Assets via [wrangler.jsonc](wrangler.jsonc)

---

## Project Structure

```text
algolens/
├── index.html                   # HTML entrypoint, Google Fonts, and inline theme initializer
├── package.json                 # Dependency definitions and lifecycle scripts
├── vite.config.ts               # Vite bundler configuration
├── wrangler.jsonc               # Cloudflare Workers Static Assets configuration
├── public/                      # Static assets (favicon.svg, icons.svg)
├── screenshots/                 # Local visual audit captures and contact sheets (untracked)
└── src/
    ├── main.tsx                 # Root application mount point and ThemeProvider wrapper
    ├── App.tsx                  # Hash route coordinator ('landing' vs 'lab') and keyboard handler
    ├── App.css                  # Master laboratory console styles
    ├── index.css                # Global design system tokens and light/dark theme variables
    ├── algorithms/              # 32 algorithm implementations, metadata, and invariant tests
    │   ├── registry.ts          # Central algorithm catalog and execution runners
    │   ├── searching/           # Linear Search, Binary Search
    │   ├── sorting/             # Bubble, Selection, Insertion, Merge, Quick, Heap
    │   ├── dataStructures/      # Array, Stack, Queue, LinkedList, HashTable, Heap, Trie
    │   ├── trees/               # Binary Tree, BST, Traversals (In/Pre/Post)
    │   ├── graphs/              # BFS, DFS, Dijkstra, Prim, Kruskal
    │   └── techniques/          # Recursion, Two Pointers, Sliding Window, DP, Greedy, Backtracking
    ├── components/              # Modular UI components
    │   ├── Landing/             # Monograph landing page, masthead, hero aperture preview
    │   ├── Navigation/          # InstrumentNavbar, Sidebar drawer, ShortcutsModal, ThemeToggle
    │   ├── Mastery/             # MasteryModal assessment dialog and results breakdown
    │   ├── InteractiveLearning/ # ChallengeView prediction runner
    │   ├── Workbench/           # WorkbenchDesk study tabs (code, telemetry, data inputs)
    │   ├── Controls/            # Play, pause, step forward/backward, speed slider
    │   ├── Metrics/             # Pointers, comparisons, access counts, and metrics plaque
    │   ├── Explanation/         # Step description callout and invariant notices
    │   ├── CodeViewer/          # Syntax highlighted C and TypeScript source viewer
    │   └── AITutor/             # Deterministic pedagogical advice and viva guidance
    ├── visualizers/             # Canvas rendering hosts for all 8 visualizer archetypes
    ├── learning/                # Pedagogical engines and question banks
    │   ├── challengeEngine.ts   # Snapshot-grounded prediction generator
    │   ├── progressStorage.ts   # LocalStorage persistence and schema migration
    │   ├── types.ts             # Learning modes, challenge types, and mastery models
    │   └── mastery/             # 288-question curriculum banks and assessment selector
    └── theme/                   # ThemeContext, ThemeProvider, and useTheme hook
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (`v20.x` or later; verified on `v24.19.x`)
- [npm](https://www.npmjs.com/) (`v10.x` or later)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gopalakrishna2004/algolens.git
   cd algolens
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development Server

Start the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

---

## Verification & Testing

### Run Tests
Execute the Vitest test suite covering algorithm execution, step invariances, storage migrations, and topic mastery question distributions:
```bash
npm run test
```
*(Executes `vitest run` — 279 tests across 12 test files)*

### Code Quality & Linting
Run static analysis via Oxlint:
```bash
npm run lint
```
*(Executes `oxlint` across 94 source files)*

### Production Build
Compile TypeScript declarations and generate the optimized client bundle in `./dist`:
```bash
npm run build
```
*(Executes `tsc -b && vite build`)*

### Preview Production Build
Serve the local `./dist` directory to test production behavior:
```bash
npm run preview
```

---

## Progress Persistence & Data Migration

- **Progress Storage Key**: `algolens_progress_v3`
- **Theme Preference Key**: `algolens-theme` (`light` | `dark`)
- **Local Storage Architecture**: All user progress, streaks, and active assessments are stored locally in the browser's `localStorage`.
- **Migration Logic**: `src/learning/progressStorage.ts` contains migration routines from legacy schemas (`algolens_progress_v2`) to version 3, with defensive parsing tested to preserve valid data if corrupt input is encountered.
- **Reset Option**: A progress reset control is available in the Curriculum Sidebar drawer.

---

## Deployment

AlgoLens is hosted using **Cloudflare Workers Static Assets**.

- **Configuration File**: [wrangler.jsonc](wrangler.jsonc)
- **Output Directory**: `./dist`
- **Compatibility Date**: `2026-10-11`

### Automatic CI/CD Deployment
The repository is integrated with **Cloudflare Workers Builds**:
- Pushes to branches generate preview builds via Cloudflare preview URLs.
- Merging pull requests into `main` automatically triggers a production build and deployment to:
  **[https://algolens.gopalakrishnavarna2004.workers.dev](https://algolens.gopalakrishnavarna2004.workers.dev)**

### Manual Deployment (Optional)
Deploying manually via the Wrangler CLI:
```bash
# Generate the production build
npm run build

# Deploy assets to Cloudflare Workers
npx wrangler deploy
```

---

## Build Considerations

- **Client Bundle Size**: Production compilation (`npm run build`) generates a client JavaScript bundle of approximately 840 kB uncompressed (~235 kB gzip) and emits an advisory notice (>500 kB). This occurs because all 32 algorithm visualizers, explanation telemetry, and the 288-question topic mastery question bank are compiled into a single synchronous entry chunk. Client-side execution remains fast and deterministic once loaded, but future releases can introduce dynamic `import()` code-splitting on a per-chapter basis.

---

## Documentation & Changelog

- Consult [CHANGELOG.md](CHANGELOG.md) for detailed release notes, contrast audits, and milestone history.

---

## License

The repository is designated as private (`"private": true` in `package.json`). No formal `LICENSE` file is currently provided. Please contact the repository owner regarding permission to reuse or distribute this project.
