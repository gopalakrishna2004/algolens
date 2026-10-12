import type { MasteryQuestion } from '../types';

/**
 * 45 Reviewed Questions for Chapter 05: Graphs.
 * - Breadth-First Search (BFS) (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Depth-First Search (DFS) (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Dijkstra's Shortest Path (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Prim's Minimum Spanning Tree (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Kruskal's Minimum Spanning Tree (9 questions: 3 Easy, 3 Medium, 3 Hard)
 */
export const GRAPHS_QUESTION_BANK: MasteryQuestion[] = [
  // ==========================================
  // TOPIC 1: BREADTH-FIRST SEARCH (BFS)
  // ==========================================

  // --- BFS: Easy ---
  {
    id: 'q-bfs-easy-01',
    algoId: 'bfs',
    tier: 'easy',
    concept: 'FIFO Queue & Level-Order Frontier',
    prompt: 'Why does standard Breadth-First Search (BFS) use a FIFO Queue rather than a LIFO Stack to manage the exploration frontier?',
    options: [
      {
        id: 'opt-a',
        label: 'A FIFO queue processes vertices in the exact order they are discovered, guaranteeing that all vertices at distance k are visited before any vertex at distance k + 1.',
        explanation: 'Correct! FIFO ordering ensures concentric layer-by-layer expansion, exhausting all vertices at graph distance k before moving to distance k + 1.',
      },
      {
        id: 'opt-b',
        label: 'A FIFO queue automatically sorts neighbor vertices by their edge weight in O(1) time.',
        explanation: 'Incorrect. A FIFO queue preserves insertion order, not priority ordering by weight. Sorting by weight requires a priority queue.',
      },
      {
        id: 'opt-c',
        label: 'A FIFO queue eliminates the need for a visited array by discarding duplicate vertices upon insertion.',
        explanation: 'Incorrect. A visited array or set remains mandatory in BFS to prevent cycles and duplicate queuing.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The core invariant of BFS is level-synchronous expansion. A FIFO (First-In, First-Out) queue ensures that the earliest-discovered frontier is always processed first, creating concentric waves radiating from the source.',
  },
  {
    id: 'q-bfs-easy-02',
    algoId: 'bfs',
    tier: 'easy',
    concept: 'Shortest Path in Unweighted Graphs',
    prompt: 'Under what specific condition does Breadth-First Search guarantee the shortest path between two vertices in terms of cumulative cost?',
    options: [
      {
        id: 'opt-a',
        label: 'On any directed graph, as long as all edge weights are strictly positive and non-zero.',
        explanation: 'Incorrect. Positive varying edge weights require Dijkstra\'s algorithm. BFS assumes every edge has uniform cost.',
      },
      {
        id: 'opt-b',
        label: 'On unweighted graphs, or graphs where every edge has identical uniform positive weight.',
        explanation: 'Correct! When all edge weights are identical (uniform), the number of edges traversed directly equals cumulative path weight.',
      },
      {
        id: 'opt-c',
        label: 'Only on acyclic graphs (trees and DAGs), because cycles cause BFS to calculate incorrect path lengths.',
        explanation: 'Incorrect. BFS operates correctly on cyclic graphs as long as edges are unweighted and visited flags prevent cycles.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'BFS guarantees minimum hop count. In unweighted graphs (or graphs with uniform edge cost c), hop count maps monotonically to cumulative path weight, providing optimal shortest paths.',
  },
  {
    id: 'q-bfs-easy-03',
    algoId: 'bfs',
    tier: 'easy',
    concept: 'Visited Array Purpose & Cycle Prevention',
    prompt: 'What fatal consequence occurs if Breadth-First Search is executed on a graph with cycles without maintaining a `visited` array or status flag?',
    options: [
      {
        id: 'opt-a',
        label: 'The algorithm aborts immediately with a C segmentation fault on the first iteration.',
        explanation: 'Incorrect. The algorithm enters a logical infinite loop rather than an immediate pointer segmentation fault.',
      },
      {
        id: 'opt-b',
        label: 'The algorithm terminates normally, but returns paths longer than the longest simple path.',
        explanation: 'Incorrect. Without marking visited nodes, the algorithm never terminates on cyclic graphs.',
      },
      {
        id: 'opt-c',
        label: 'Vertices in cycles are repeatedly re-enqueued, causing an infinite loop and eventually exhausting queue memory.',
        explanation: 'Correct! Without visited tracking, adjacent vertices repeatedly push each other back into the queue indefinitely.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Graph traversals differ from tree traversals because graphs can contain back-edges and cross-edges forming cycles. The `visited` boolean array ensures each vertex enters the queue at most once.',
  },

  // --- BFS: Medium ---
  {
    id: 'q-bfs-med-01',
    algoId: 'bfs',
    tier: 'medium',
    concept: 'Frontier Level Delimitation & Hop Counting',
    prompt: 'When finding the minimum hop count from a source vertex using BFS in C, how can the algorithm delineate when one concentric level ends and the next begins?',
    options: [
      {
        id: 'opt-a',
        label: 'By reading the queue count `levelSize = rear - front` at the start of each level and processing exactly that many nodes in an inner loop.',
        explanation: 'Correct! Capturing the snapshot size of the current frontier allows processing all level-k nodes before processing newly added level-(k+1) nodes.',
      },
      {
        id: 'opt-b',
        label: 'By sorting the queue elements in descending order after every single neighbor dequeue.',
        explanation: 'Incorrect. Sorting the queue would destroy FIFO layer ordering and degrade time complexity to O(V log V) per step.',
      },
      {
        id: 'opt-c',
        label: 'By allocating a completely new physical queue array of size MAX for every individual vertex expanded.',
        explanation: 'Incorrect. Layer boundaries are tracked via count snapshots or a distance array, not allocating new arrays per vertex.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The classic queue size snapshot pattern (`int levelSize = q.size()`) processes the frontier in discrete rounds. Alternatively, an explicit `dist[v] = dist[u] + 1` array records levels directly.',
  },
  {
    id: 'q-bfs-med-02',
    algoId: 'bfs',
    tier: 'medium',
    concept: 'BFS Adjacency List Complexity',
    prompt: 'When representing a graph with V vertices and E edges using an adjacency list, what are the time and auxiliary space complexities of Breadth-First Search?',
    options: [
      {
        id: 'opt-a',
        label: 'Time: O(V^2), Auxiliary Space: O(E).',
        explanation: 'Incorrect. O(V^2) time occurs when using an adjacency matrix, because scanning all cells takes V steps per vertex.',
      },
      {
        id: 'opt-b',
        label: 'Time: O(V + E), Auxiliary Space: O(V) for the queue and visited array.',
        explanation: 'Correct! Each vertex is enqueued/dequeued once (O(V)), and each edge list is traversed once (O(E)), requiring O(V) auxiliary memory.',
      },
      {
        id: 'opt-c',
        label: 'Time: O(E log V), Auxiliary Space: O(V + E).',
        explanation: 'Incorrect. O(E log V) is characteristic of priority-queue algorithms like Dijkstra or Prim, not unweighted BFS.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'With an adjacency list, BFS examines only existing edges: sum of degrees is 2E (undirected) or E (directed). Together with visiting V nodes, total time is strictly O(V + E) with O(V) auxiliary queue memory.',
  },
  {
    id: 'q-bfs-med-03',
    algoId: 'bfs',
    tier: 'medium',
    concept: 'Bipartite Graph 2-Coloring Validation',
    prompt: 'How can standard Breadth-First Search be augmented to determine whether an undirected connected graph is bipartite (2-colorable)?',
    options: [
      {
        id: 'opt-a',
        label: 'By counting the total number of edges and verifying that E <= 2*V - 4.',
        explanation: 'Incorrect. Planarity and sparsity inequalities do not determine bipartiteness.',
      },
      {
        id: 'opt-b',
        label: 'By assigning alternating colors (e.g., 0 and 1) to each layer; if an edge connects two vertices of the same color, the graph contains an odd-length cycle and is not bipartite.',
        explanation: 'Correct! Bipartite graphs cannot contain odd-length cycles. If an edge exists between two nodes in the same BFS layer, an odd cycle is detected.',
      },
      {
        id: 'opt-c',
        label: 'By checking if the degree of every vertex in the graph is an even integer.',
        explanation: 'Incorrect. Even vertex degrees define an Eulerian circuit, not a bipartite graph.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'A graph is bipartite if and only if it contains no odd-length cycles. In BFS, tree levels alternate colors (0, 1, 0, 1...). A cross-edge between nodes at the same level proves an odd cycle exists.',
  },

  // --- BFS: Hard ---
  {
    id: 'q-bfs-hard-01',
    algoId: 'bfs',
    tier: 'hard',
    concept: 'Multi-Source BFS Initialization',
    prompt: 'In a multi-source shortest path problem (e.g., calculating distance from every grid cell to the nearest of k obstacles), how should BFS be initialized?',
    options: [
      {
        id: 'opt-a',
        label: 'Run k separate single-source BFS passes sequentially, each from one obstacle, and compute the minimum in O(k * (V + E)).',
        explanation: 'Incorrect. Running k separate passes is computationally wasteful when a single unified multi-source pass solves it in O(V + E).',
      },
      {
        id: 'opt-b',
        label: 'Enqueue all k source vertices simultaneously into the queue with distance 0 and mark them all visited before starting the search loop.',
        explanation: 'Correct! Initializing the queue with all sources at distance 0 expands all frontiers in lockstep, achieving O(V + E) total runtime.',
      },
      {
        id: 'opt-c',
        label: 'Add a dummy vertex connected to all obstacles with negative edge weights and run Dijkstra.',
        explanation: 'Incorrect. Negative edge weights invalidate Dijkstra\'s greedy invariants.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Multi-source BFS conceptualizes an imaginary "super-source" connected to all k sources via 0-weight edges. Enqueuing all k sources at step 0 propagates wavefronts simultaneously in a single O(V + E) pass.',
  },
  {
    id: 'q-bfs-hard-02',
    algoId: 'bfs',
    tier: 'hard',
    concept: 'BFS Undirected Edge Classification',
    prompt: 'In a BFS spanning tree of an undirected graph, which edge classifications are mathematically possible?',
    options: [
      {
        id: 'opt-a',
        label: 'Only Tree edges and Cross edges connecting vertices in the same layer or adjacent layers (|depth(u) - depth(v)| <= 1); back edges spanning >= 2 levels cannot exist.',
        explanation: 'Correct! If an edge spanned more than one level difference, BFS would have explored and traversed it at depth k + 1, making large jumps impossible.',
      },
      {
        id: 'opt-b',
        label: 'Tree edges, Back edges, Forward edges, and Cross edges across arbitrary layer differences.',
        explanation: 'Incorrect. Forward edges and multi-level back edges cannot exist in undirected BFS trees.',
      },
      {
        id: 'opt-c',
        label: 'Only Tree edges and Back edges pointing directly back to the root vertex.',
        explanation: 'Incorrect. Cross edges between vertices in the same layer or adjacent layers frequently occur in undirected BFS.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Because BFS explores layer by layer, any undirected edge (u, v) must connect nodes whose layer indices differ by at most 1. Hence, only tree edges and intra/inter-layer cross edges (|L(u) - L(v)| <= 1) exist.',
  },
  {
    id: 'q-bfs-hard-03',
    algoId: 'bfs',
    tier: 'hard',
    concept: '0-1 BFS with Double-Ended Queue (Deque)',
    prompt: 'When edge weights in a graph are strictly restricted to 0 or 1, how can the single-source shortest path be computed in O(V + E) time without a priority queue?',
    options: [
      {
        id: 'opt-a',
        label: 'Run standard BFS, but multiply all 0-weight edges by a scaling factor epsilon.',
        explanation: 'Incorrect. Arbitrary queue insertions with 0-weight edges violate monotonic distance ordering.',
      },
      {
        id: 'opt-b',
        label: 'Sort the vertices using topological sorting and relax each vertex once in linear time.',
        explanation: 'Incorrect. Graphs with 0 and 1 weights may contain cycles, making topological sorting impossible.',
      },
      {
        id: 'opt-c',
        label: 'Use a double-ended queue (deque): push relaxed neighbors across 0-weight edges to the front, and 1-weight edges to the back.',
        explanation: 'Correct! 0-1 BFS pushes 0-weight transitions to the front (`push_front`) and 1-weight transitions to the back (`push_back`), maintaining strict monotonic distance order in O(V + E).',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'In 0-1 BFS, distance values in the deque never span more than 2 consecutive integers (d and d+1). Pushing 0-weight edges to the front maintains sorted order without the O(log V) overhead of a heap.',
  },

  // ==========================================
  // TOPIC 2: DEPTH-FIRST SEARCH (DFS)
  // ==========================================

  // --- DFS: Easy ---
  {
    id: 'q-dfs-easy-01',
    algoId: 'dfs',
    tier: 'easy',
    concept: 'LIFO Call Stack & Deep Exploration Discipline',
    prompt: 'What fundamental traversal discipline distinguishes Depth-First Search (DFS) from Breadth-First Search (BFS)?',
    options: [
      {
        id: 'opt-a',
        label: 'DFS visits all direct neighbors of the source vertex before descending to any grandchild vertices.',
        explanation: 'Incorrect. Visiting all direct neighbors first describes BFS.',
      },
      {
        id: 'opt-b',
        label: 'DFS guarantees finding the shortest path with the minimum number of edges on unweighted graphs.',
        explanation: 'Incorrect. DFS does not guarantee shortest paths on unweighted graphs.',
      },
      {
        id: 'opt-c',
        label: 'DFS plunges as deeply as possible along each branch until a dead end or visited vertex is reached, then backtracks to resume exploration.',
        explanation: 'Correct! DFS follows a path down until it cannot proceed further, then backtracks (LIFO discipline via call stack or explicit stack).',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'DFS embodies recursive backtracking: "go deep before going wide". It explores an entire branch down to its leaves/dead ends before returning to explore sibling branches.',
  },
  {
    id: 'q-dfs-easy-02',
    algoId: 'dfs',
    tier: 'easy',
    concept: 'Connected Components Discovery',
    prompt: 'How does Depth-First Search count the number of connected components in an undirected disconnected graph of V vertices?',
    options: [
      {
        id: 'opt-a',
        label: 'By iterating a loop from vertex 0 to V - 1, launching a DFS traversal and incrementing a counter whenever an unvisited vertex is encountered.',
        explanation: 'Correct! Each DFS call from the outer loop visits and marks all vertices in that entire connected component, so the counter increments once per component.',
      },
      {
        id: 'opt-b',
        label: 'By computing the sum of degrees of all vertices and dividing by 2.',
        explanation: 'Incorrect. The sum of degrees divided by 2 gives the total number of edges (Handshaking Lemma), not connected components.',
      },
      {
        id: 'opt-c',
        label: 'By subtracting the number of back edges from the total number of vertices.',
        explanation: 'Incorrect. This formula does not calculate connected components.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'An outer driver loop checks `if (!visited[i]) { count++; dfs(i); }`. Each top-level DFS invocation paints all reachable vertices in that component.',
  },
  {
    id: 'q-dfs-easy-03',
    algoId: 'dfs',
    tier: 'easy',
    concept: 'Call Stack Depth & Worst-Case Memory',
    prompt: 'In a graph of V vertices, what graph topology induces the maximum recursion stack depth during Depth-First Search?',
    options: [
      {
        id: 'opt-a',
        label: 'A star graph where the center vertex connects to all V - 1 other vertices.',
        explanation: 'Incorrect. In a star graph, each leaf branch has depth 1, so the call stack depth is only 2.',
      },
      {
        id: 'opt-b',
        label: 'A linear chain (path graph) where each vertex connects only to the next (0 -> 1 -> 2 ... -> V - 1), resulting in a call stack depth of O(V).',
        explanation: 'Correct! A single linear chain forces DFS to descend through all V vertices sequentially before any frame can return, requiring O(V) stack frames.',
      },
      {
        id: 'opt-c',
        label: 'A complete graph K_V where every vertex connects to every other vertex, causing stack depth O(V^2).',
        explanation: 'Incorrect. The recursion depth can never exceed V because each vertex is visited at most once.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'A path graph of length V creates an activation record chain of depth V. In C systems with default 1MB/8MB stack limits, deep graphs can trigger stack overflows unless rewritten iteratively or with an increased stack.',
  },

  // --- DFS: Medium ---
  {
    id: 'q-dfs-med-01',
    algoId: 'dfs',
    tier: 'medium',
    concept: 'Directed Cycle Detection (Three-Color State)',
    prompt: 'In directed graph cycle detection using DFS, what vertex states (White, Gray, Black) signify the presence of a directed cycle?',
    options: [
      {
        id: 'opt-a',
        label: 'Encountering an edge pointing to a White (unvisited) vertex.',
        explanation: 'Incorrect. An edge to a White vertex is a standard tree edge leading to unexplored subgraphs.',
      },
      {
        id: 'opt-b',
        label: 'Encountering an edge pointing to a Black (fully processed and popped from recursion stack) vertex.',
        explanation: 'Incorrect. An edge to a Black vertex is a cross edge or forward edge and does not create a directed cycle.',
      },
      {
        id: 'opt-c',
        label: 'Encountering an edge pointing to a Gray (currently being visited / on active recursion stack) vertex.',
        explanation: 'Correct! A Gray vertex is an active ancestor on the recursion call stack; an edge pointing to it is a back-edge, proving a directed cycle exists.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Three-color DFS uses: White (0 = unvisited), Gray (1 = in-progress on stack), Black (2 = completed). A back-edge to a Gray node indicates that the current path loops back to an active ancestor.',
  },
  {
    id: 'q-dfs-med-02',
    algoId: 'dfs',
    tier: 'medium',
    concept: 'Undirected Cycle Detection & Parent Invariant',
    prompt: 'When detecting cycles in an undirected graph using DFS, why must the algorithm explicitly ignore the immediate caller (parent vertex)?',
    options: [
      {
        id: 'opt-a',
        label: 'Because undirected edges are bidirectional; traversing u -> v makes v -> u an immediate trivial reflection rather than a genuine cycle.',
        explanation: 'Correct! Every undirected edge {u, v} can be traversed in both directions. Without checking `v != parent`, every single edge would be misidentified as a 2-cycle.',
      },
      {
        id: 'opt-b',
        label: 'Because the parent vertex is always deallocated from memory when entering a child function call in C.',
        explanation: 'Incorrect. The parent frame remains live and allocated on the C call stack.',
      },
      {
        id: 'opt-c',
        label: 'Because undirected graphs cannot have cycles containing fewer than 5 vertices.',
        explanation: 'Incorrect. Undirected graphs can have cycles of length 3 (triangles) or more.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In undirected graphs, an edge between u and v appears in both adjacency lists: adj[u] contains v, and adj[v] contains u. When moving from u to v, we must pass `u` as parent so v does not treat the edge back to u as a cycle.',
  },
  {
    id: 'q-dfs-med-03',
    algoId: 'dfs',
    tier: 'medium',
    concept: 'Topological Sort & DAG Prerequisite',
    prompt: 'How is a valid Topological Sort obtained from DFS on a Directed Acyclic Graph (DAG)?',
    options: [
      {
        id: 'opt-a',
        label: 'By ordering vertices by their initial discovery times in ascending order.',
        explanation: 'Incorrect. Ordering by discovery time (preorder) does not guarantee that dependencies precede dependents.',
      },
      {
        id: 'opt-b',
        label: 'By prepending each vertex to an ordered list upon completing its postorder backtrack (descending finish times).',
        explanation: 'Correct! A vertex can only finish when all its descendants have finished. Ordering by reverse finish time ensures all directed edges go from left to right.',
      },
      {
        id: 'opt-c',
        label: 'By executing BFS from the sink vertex backwards along reversed edges.',
        explanation: 'Incorrect. We are evaluating DFS topological sort via postorder backtrack finish times.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'In a DAG, if there is a directed edge u -> v, then v finishes before u in DFS (finish[v] < finish[u]). Reversing the finish order (or prepending upon backtrack) yields a valid topological order.',
  },

  // --- DFS: Hard ---
  {
    id: 'q-dfs-hard-01',
    algoId: 'dfs',
    tier: 'hard',
    concept: 'Parenthesis Theorem & Interval Nesting',
    prompt: 'According to the DFS Parenthesis Theorem, what relationship holds between the discovery/finish intervals [d[u], f[u]] and [d[v], f[v]] for any two vertices u and v?',
    options: [
      {
        id: 'opt-a',
        label: 'The intervals are either completely disjoint, or one interval is entirely nested inside the other (indicating an ancestor-descendant relationship).',
        explanation: 'Correct! Because recursive calls operate as a strict LIFO stack, intervals can never partially overlap: [d[u], f[u]] and [d[v], f[v]] are strictly disjoint or nested.',
      },
      {
        id: 'opt-b',
        label: 'The intervals always partially overlap such that d[u] < d[v] < f[u] < f[v].',
        explanation: 'Incorrect. Partial overlap is mathematically impossible due to the LIFO structure of the activation call stack.',
      },
      {
        id: 'opt-c',
        label: 'All intervals must have identical length equal to the out-degree of the respective vertex.',
        explanation: 'Incorrect. Interval length equals 2 * (1 + number of descendants in DFS subtree), not out-degree.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The Parenthesis Theorem formalizes call-stack lifecycles: entering a function opens a parenthesis `(u`, and returning closes it `u)`. Parentheses must either nest properly or sit side-by-side.',
  },
  {
    id: 'q-dfs-hard-02',
    algoId: 'dfs',
    tier: 'hard',
    concept: 'Bridges & Articulation Points (Tarjan\'s Low-Link)',
    prompt: 'In Tarjan\'s bridge-finding algorithm using DFS, what condition on discovery time `tin[u]` and low-link value `low[v]` identifies edge (u, v) as a bridge in an undirected graph?',
    options: [
      {
        id: 'opt-a',
        label: 'low[v] <= tin[u]',
        explanation: 'Incorrect. If low[v] <= tin[u], then v (or a descendant) can reach u or an ancestor of u via a back-edge, so an alternative path exists and (u, v) is not a bridge.',
      },
      {
        id: 'opt-b',
        label: 'low[v] > tin[u]',
        explanation: 'Correct! If low[v] > tin[u], there is no back-edge from the subtree rooted at v to u or any ancestor of u. Removing (u, v) disconnects v\'s subtree.',
      },
      {
        id: 'opt-c',
        label: 'low[v] == 0',
        explanation: 'Incorrect. low[v] represents a timestamp index, not a fixed zero state.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: '`low[v]` is the earliest discovery time reachable from v\'s subtree via at most one back-edge. If `low[v] > tin[u]`, the subtree under v has no alternative route back to u or above, making (u, v) a critical bridge.',
  },
  {
    id: 'q-dfs-hard-03',
    algoId: 'dfs',
    tier: 'hard',
    concept: 'Strongly Connected Components (Kosaraju\'s Algorithm)',
    prompt: 'What is the key mechanism behind Kosaraju\'s two-pass algorithm for finding Strongly Connected Components (SCCs) in O(V + E) time?',
    options: [
      {
        id: 'opt-a',
        label: 'Sort all edges by weight, run Kruskal\'s algorithm, and group vertices by DSU sets.',
        explanation: 'Incorrect. Kruskal finds MSTs on undirected graphs, not SCCs on directed graphs.',
      },
      {
        id: 'opt-b',
        label: 'Pass 1: Run DFS on G to record vertices in decreasing order of finish time. Pass 2: Run DFS on the transposed graph G^T processing vertices in that finish order.',
        explanation: 'Correct! The vertex with the highest finish time in G belongs to a source component in the component DAG. Transposing G turns source components into sinks, isolating each SCC in Pass 2.',
      },
      {
        id: 'opt-c',
        label: 'Run BFS from every sink node simultaneously and intersect their visited sets.',
        explanation: 'Incorrect. Running BFS from every node takes O(V * (V + E)), which is not linear.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Kosaraju\'s algorithm leverages graph transposition (reversing all directed edges). In G^T, components cannot leak edges into other components when traversed in decreasing finish order from Pass 1, isolating each SCC cleanly in O(V + E).',
  },

  // ==========================================
  // TOPIC 3: DIJKSTRA'S SHORTEST PATH
  // ==========================================

  // --- Dijkstra: Easy ---
  {
    id: 'q-dijkstra-easy-01',
    algoId: 'dijkstra',
    tier: 'easy',
    concept: 'Greedy Finalization & Non-Negative Weights',
    prompt: 'What fundamental mathematical invariant underpins Dijkstra\'s greedy algorithm for single-source shortest paths?',
    options: [
      {
        id: 'opt-a',
        label: 'All edge weights must be non-negative (w(u, v) >= 0) so that path lengths are monotonically non-decreasing as more edges are traversed.',
        explanation: 'Correct! Non-negative weights guarantee that adding edges cannot decrease path distance, ensuring that the closest unvisited vertex has already found its optimal shortest path.',
      },
      {
        id: 'opt-b',
        label: 'The graph must be a Directed Acyclic Graph (DAG) with no cycles of any kind.',
        explanation: 'Incorrect. Dijkstra works correctly on cyclic graphs as long as all edge weights are non-negative.',
      },
      {
        id: 'opt-c',
        label: 'Every vertex must have an out-degree of at most 2, mimicking a binary tree.',
        explanation: 'Incorrect. Dijkstra imposes no restrictions on vertex degree.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Dijkstra\'s greedy choice property relies on: if all weights are >= 0, any alternative path to the current minimum-distance unvisited vertex must pass through another unvisited vertex and therefore be at least as long.',
  },
  {
    id: 'q-dijkstra-easy-02',
    algoId: 'dijkstra',
    tier: 'easy',
    concept: 'Edge Relaxation Invariant',
    prompt: 'In Dijkstra\'s algorithm, what exact condition triggers the relaxation of an edge (u, v) with non-negative weight w?',
    options: [
      {
        id: 'opt-a',
        label: 'dist[u] + w < dist[v]',
        explanation: 'Correct! If traversing through u offers a strictly shorter path to v than the current tentative distance `dist[v]`, we relax the edge by updating `dist[v] = dist[u] + w`.',
      },
      {
        id: 'opt-b',
        label: 'dist[u] + w > dist[v]',
        explanation: 'Incorrect. If the new path is longer, we discard it and keep the existing shorter distance.',
      },
      {
        id: 'opt-c',
        label: 'dist[u] == dist[v] + w',
        explanation: 'Incorrect. Equality indicates an alternative path of identical length, not a strictly shorter improvement.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Relaxing an edge means testing whether going through u provides a "shortcut" to v. The code update is: `if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; parent[v] = u; }`.',
  },
  {
    id: 'q-dijkstra-easy-03',
    algoId: 'dijkstra',
    tier: 'easy',
    concept: 'Single-Source Shortest Path Definition',
    prompt: 'What does Dijkstra\'s algorithm output when executed from a designated source vertex s?',
    options: [
      {
        id: 'opt-a',
        label: 'The shortest path between all pairs of vertices in O(V^3) time.',
        explanation: 'Incorrect. All-pairs shortest path is typically computed by Floyd-Warshall in O(V^3).',
      },
      {
        id: 'opt-b',
        label: 'The minimum weight spanning tree connecting all vertices in the graph.',
        explanation: 'Incorrect. An MST connects all vertices with minimum total edge sum (Prim/Kruskal), whereas Dijkstra minimizes distance from source s.',
      },
      {
        id: 'opt-c',
        label: 'The shortest distance (and predecessor tree) from the single source s to every reachable vertex in the graph.',
        explanation: 'Correct! Dijkstra solves the Single-Source Shortest Path (SSSP) problem, finding minimal paths radiating from a single starting vertex.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Dijkstra is a Single-Source Shortest Path (SSSP) algorithm. It produces an array `dist[]` where `dist[v]` is the shortest path cost from s to v, along with `parent[]` pointers for path reconstruction.',
  },

  // --- Dijkstra: Medium ---
  {
    id: 'q-dijkstra-med-01',
    algoId: 'dijkstra',
    tier: 'medium',
    concept: 'Binary Min-Heap Complexity',
    prompt: 'When implementing Dijkstra\'s algorithm using an adjacency list and a binary min-heap (priority queue), what is the time complexity?',
    options: [
      {
        id: 'opt-a',
        label: 'O(V^2)',
        explanation: 'Incorrect. O(V^2) is the complexity of the unindexed flat-array implementation.',
      },
      {
        id: 'opt-b',
        label: 'O((V + E) log V)',
        explanation: 'Correct! Each vertex extraction takes O(log V) across V vertices, and each edge relaxation pushes or updates keys in O(log V) across E edges.',
      },
      {
        id: 'opt-c',
        label: 'O(V * E)',
        explanation: 'Incorrect. O(V * E) is the time complexity of the Bellman-Ford algorithm.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'With a binary heap, V `extractMin` operations take O(V log V), and up to E edge relaxations take O(E log V). Summing gives O((V + E) log V).',
  },
  {
    id: 'q-dijkstra-med-02',
    algoId: 'dijkstra',
    tier: 'medium',
    concept: 'Flat Array vs Min-Heap for Dense Graphs',
    prompt: 'Why is the simpler O(V^2) flat-array implementation of Dijkstra preferable to a binary heap on dense graphs where E = Theta(V^2)?',
    options: [
      {
        id: 'opt-a',
        label: 'Because finding the minimum in a flat array takes O(V) per vertex (total O(V^2)), whereas a binary heap would perform O(V^2 log V) operations with higher constant factors.',
        explanation: 'Correct! On dense graphs, E ≈ V^2. A flat array performs V linear scans (O(V^2)) and O(1) distance updates (O(E) = O(V^2)), beating heap\'s O(V^2 log V).',
      },
      {
        id: 'opt-b',
        label: 'Because binary min-heaps cannot store graphs with more than 100 vertices in C.',
        explanation: 'Incorrect. Heaps scale to any size allowed by memory; this is purely an algorithmic complexity and cache efficiency trade-off.',
      },
      {
        id: 'opt-c',
        label: 'Because a flat array allows negative edge weights to be handled correctly without error.',
        explanation: 'Incorrect. Negative edge weights invalidate Dijkstra\'s greedy invariants regardless of data structure.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Array-based Dijkstra does V `minDistance` scans (V * V = V^2) and relaxes E edges in O(1) time each (E <= V^2). Total time is strictly O(V^2), whereas a heap does E log V = V^2 log V with pointer overhead.',
  },
  {
    id: 'q-dijkstra-med-03',
    algoId: 'dijkstra',
    tier: 'medium',
    concept: 'Failure Mode with Negative Edge Weights',
    prompt: 'Why does Dijkstra\'s algorithm fail to produce correct shortest paths on graphs with negative edge weights, even without negative cycles?',
    options: [
      {
        id: 'opt-a',
        label: 'Because Dijkstra assumes that once a vertex u is marked visited with the minimum tentative distance, its shortest distance is finalized and cannot be reduced later.',
        explanation: 'Correct! A later negative edge could offer a shorter route to an already "visited" vertex, but Dijkstra never revisits finalized nodes, producing incorrect results.',
      },
      {
        id: 'opt-b',
        label: 'Because negative numbers cannot be represented in C integer arrays without causing undefined behavior.',
        explanation: 'Incorrect. C signed integers handle negative numbers normally; this is an algorithmic correctness breakdown.',
      },
      {
        id: 'opt-c',
        label: 'Because min-heaps invert their sorting order when negative keys are inserted.',
        explanation: 'Incorrect. Min-heaps handle negative numbers properly; it is the greedy finalization premise itself that fails.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Dijkstra permanently finalizes each vertex upon extraction: `visited[u] = 1`. If an edge (x, y) has weight -10, passing through x could reduce a previously finalized distance, violating Dijkstra\'s one-pass finality guarantee.',
  },

  // --- Dijkstra: Hard ---
  {
    id: 'q-dijkstra-hard-01',
    algoId: 'dijkstra',
    tier: 'hard',
    concept: 'Predecessor Tracking & Shortest Path DAG',
    prompt: 'How are the actual shortest paths reconstructed in Dijkstra\'s algorithm, and what structure is formed when multiple shortest paths exist?',
    options: [
      {
        id: 'opt-a',
        label: 'By storing each complete path as a dynamically concatenated string in a hash table of size O(V^2).',
        explanation: 'Incorrect. Storing full paths as strings causes memory bloat and quadratic copying overhead.',
      },
      {
        id: 'opt-b',
        label: 'By updating a `parent[v] = u` pointer during relaxation to yield a shortest-path tree; all valid shortest paths together form a Directed Acyclic Graph (DAG).',
        explanation: 'Correct! Tracking `parent[v] = u` allows tracing back from target to source in O(path length). The union of all shortest paths forms a DAG rooted at source s.',
      },
      {
        id: 'opt-c',
        label: 'By running BFS backwards from the target vertex to the source.',
        explanation: 'Incorrect. BFS ignores edge weights and would not retrace Dijkstra\'s weighted shortest path.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Predecessor pointers `parent[v]` represent the shortest-path tree in O(V) space. If multiple ties exist, retaining all relaxing predecessors yields the Shortest Path DAG, useful for path counting.',
  },
  {
    id: 'q-dijkstra-hard-02',
    algoId: 'dijkstra',
    tier: 'hard',
    concept: 'Lazy Deletion in Practical C Priority Queues',
    prompt: 'In C/C++ without a complex indexed priority queue supporting `decreaseKey`, how is edge relaxation efficiently handled with a standard min-heap?',
    options: [
      {
        id: 'opt-a',
        label: 'Allocate a completely new heap of size V every time an edge is relaxed.',
        explanation: 'Incorrect. Allocating a new heap per relaxation would yield terrible O(E * V) runtime.',
      },
      {
        id: 'opt-b',
        label: 'Push new `(dist[v], v)` pairs into the heap, and upon extraction, check `if (d > dist[u]) continue;` to discard stale entries (lazy deletion).',
        explanation: 'Correct! Lazy deletion avoids complex heap indexing by pushing duplicate pairs; stale entries with larger distances are simply skipped upon popping.',
      },
      {
        id: 'opt-c',
        label: 'Linearly scan the entire heap array to find and rewrite the existing key in O(V) time.',
        explanation: 'Incorrect. A linear scan inside the heap degrades each relaxation to O(V), losing heap efficiency.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Standard C heaps lack node-to-index back-pointers for `decreaseKey`. Pushing new `(new_dist, v)` pairs and ignoring stale popped pairs (`if (d > dist[u]) continue;`) maintains O(E log V) runtime cleanly.',
  },
  {
    id: 'q-dijkstra-hard-03',
    algoId: 'dijkstra',
    tier: 'hard',
    concept: 'Bidirectional Dijkstra Search Preconditions & Termination',
    prompt: 'Under what algorithmic preconditions does Bidirectional Dijkstra accelerate point-to-point shortest path queries between source s and target t, and how is termination correctly determined?',
    options: [
      {
        id: 'opt-a',
        label: 'Assuming non-negative edge weights (and reversing directed edges for the backward search from t), it expands forward and reverse frontiers simultaneously; it terminates when the sum of minimum keys across both priority queues meets or exceeds the best path seen so far (dist_s(top_s) + dist_t(top_t) >= mu), reducing inspected state space from O(b^d) down to O(b^(d/2)).',
        explanation: 'Correct! On non-negative graphs, simultaneously advancing two search frontiers from s and t cuts the search radius in half, reducing inspected states from roughly O(b^d) to O(b^(d/2)); termination requires dist_s(top_s) + dist_t(top_t) >= mu rather than stopping at the first shared node.',
      },
      {
        id: 'opt-b',
        label: 'It eliminates all edge relaxations by computing the Euclidean straight-line distance directly.',
        explanation: 'Incorrect. That describes an A* geometric heuristic, not bidirectional graph search.',
      },
      {
        id: 'opt-c',
        label: 'It reverses the direction of all negative edges so they become positive.',
        explanation: 'Incorrect. Reversing edges does not turn negative weights into positive weights.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Bidirectional Dijkstra requires non-negative edge weights (and traversing the reverse graph G^R for backward search from target t). In exponential or geometric graphs with branching factor b, searching two balls of radius d/2 explores 2 * b^(d/2) states instead of b^d. A common pitfall is stopping as soon as frontiers intersect; correctness strictly requires maintaining candidate path cost mu and halting when dist_s(top_s) + dist_t(top_t) >= mu.',
  },

  // ==========================================
  // TOPIC 4: PRIM'S MINIMUM SPANNING TREE
  // ==========================================

  // --- Prim: Easy ---
  {
    id: 'q-prim-easy-01',
    algoId: 'prim',
    tier: 'easy',
    concept: 'Cut Property & Growing a Single Tree',
    prompt: 'What core greedy mechanism defines Prim\'s algorithm for finding a Minimum Spanning Tree (MST)?',
    options: [
      {
        id: 'opt-a',
        label: 'It sorts all edges in the entire graph globally and inserts them one by one.',
        explanation: 'Incorrect. Sorting edges globally is Kruskal\'s algorithm.',
      },
      {
        id: 'opt-b',
        label: 'It grows a single tree from an arbitrary starting vertex by repeatedly selecting the cheapest edge connecting the tree to an unvisited vertex across the cut.',
        explanation: 'Correct! Prim partitions vertices into in-MST and out-of-MST, picking the minimum-weight cut-crossing edge at every step.',
      },
      {
        id: 'opt-c',
        label: 'It iteratively removes the heaviest edge from every detected cycle until no cycles remain.',
        explanation: 'Incorrect. Removing edges from cycles describes the Reverse-Delete algorithm.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Prim\'s algorithm operates via the Cut Property: divide vertices into S (in current tree) and V \\ S (outside tree). The lightest edge crossing this cut is guaranteed to belong to an MST.',
  },
  {
    id: 'q-prim-easy-02',
    algoId: 'prim',
    tier: 'easy',
    concept: 'MST Properties & Edge Count',
    prompt: 'In a connected, undirected graph with V vertices, how many edges does an MST produced by Prim\'s algorithm contain?',
    options: [
      {
        id: 'opt-a',
        label: 'V * (V - 1) / 2 edges.',
        explanation: 'Incorrect. That is the edge count of a complete undirected graph K_V, not a tree.',
      },
      {
        id: 'opt-b',
        label: 'Exactly V edges.',
        explanation: 'Incorrect. A graph with V vertices and V edges must contain at least one cycle.',
      },
      {
        id: 'opt-c',
        label: 'Exactly V - 1 edges.',
        explanation: 'Correct! Any spanning tree on V vertices has exactly V - 1 edges with no cycles.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'A tree is defined as a connected acyclic graph. Any tree with V vertices contains strictly V - 1 edges. Adding any edge creates a cycle; removing any edge disconnects the tree.',
  },
  {
    id: 'q-prim-easy-03',
    algoId: 'prim',
    tier: 'easy',
    concept: 'Undirected Graph Requirement',
    prompt: 'Why is Prim\'s algorithm designed specifically for undirected graphs rather than arbitrary directed graphs?',
    options: [
      {
        id: 'opt-a',
        label: 'Because spanning all vertices in an undirected graph requires bidirectional connectivity; in directed graphs, finding an optimal rooted branching is a different problem (Edmonds\' algorithm).',
        explanation: 'Correct! Minimum Spanning Trees are defined on undirected graphs. For directed graphs, the analogous problem is finding an Optimum Branching (Arborescence).',
      },
      {
        id: 'opt-b',
        label: 'Because directed graphs cannot be represented as adjacency matrices in C.',
        explanation: 'Incorrect. Directed graphs are easily represented by non-symmetric adjacency matrices.',
      },
      {
        id: 'opt-c',
        label: 'Because directed edges always have negative weights by convention.',
        explanation: 'Incorrect. Edge direction and weight values are entirely independent.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'MST requires connectivity between all vertex pairs without orientation constraints. In directed graphs, reaching all vertices from a root requires finding a directed arborescence via Edmonds\' / Chu-Liu algorithm.',
  },

  // --- Prim: Medium ---
  {
    id: 'q-prim-med-01',
    algoId: 'prim',
    tier: 'medium',
    concept: 'Prim vs Dijkstra Key Distinction',
    prompt: 'Although Prim\'s and Dijkstra\'s algorithms share a nearly identical priority-first loop structure, what is the crucial difference in their relaxation update formulas?',
    options: [
      {
        id: 'opt-a',
        label: 'Dijkstra minimizes cumulative path distance from source (`dist[u] + weight < dist[v]`); Prim minimizes connection cost to tree (`weight < key[v]`).',
        explanation: 'Correct! Dijkstra accumulates total distance from the start node, whereas Prim only cares about the single edge weight connecting v to the growing tree.',
      },
      {
        id: 'opt-b',
        label: 'Dijkstra works on unweighted graphs while Prim requires strictly non-zero weights.',
        explanation: 'Incorrect. Both algorithms operate on weighted graphs; their objective functions differ fundamentally.',
      },
      {
        id: 'opt-c',
        label: 'Dijkstra uses a LIFO stack while Prim uses a FIFO queue.',
        explanation: 'Incorrect. Both algorithms use a priority queue (or min-distance table) to pick the next greedy minimum.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Dijkstra\'s key is path length from source: `dist[u] + w`. Prim\'s key is the cheapest single edge from any in-tree vertex to v: `w`. This distinction separates shortest paths from minimum spanning trees.',
  },
  {
    id: 'q-prim-med-02',
    algoId: 'prim',
    tier: 'medium',
    concept: 'Prim\'s Algorithm Time Complexity',
    prompt: 'What are the time complexities of Prim\'s algorithm using an adjacency matrix with a flat array versus an adjacency list with a binary min-heap?',
    options: [
      {
        id: 'opt-a',
        label: 'Flat array: O(V^2); Binary min-heap: O((V + E) log V).',
        explanation: 'Correct! The flat array performs V linear scans of size V (O(V^2)). The binary min-heap performs V extractions and E key updates (O((V + E) log V)).',
      },
      {
        id: 'opt-b',
        label: 'Flat array: O(V log V); Binary min-heap: O(V^2).',
        explanation: 'Incorrect. A flat array cannot extract minimums in O(log V) without a heap.',
      },
      {
        id: 'opt-c',
        label: 'Flat array: O(E log E); Binary min-heap: O(E * V).',
        explanation: 'Incorrect. O(E log E) is Kruskal\'s edge-sorting complexity.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'On dense graphs (E ≈ V^2), matrix-based Prim in O(V^2) is faster than binary heaps. On sparse graphs (E << V^2), heap-based Prim in O(E log V) is vastly superior.',
  },
  {
    id: 'q-prim-med-03',
    algoId: 'prim',
    tier: 'medium',
    concept: 'Disconnected Graph Behavior',
    prompt: 'What occurs if Prim\'s algorithm is run without modification on a disconnected undirected graph containing two separate components?',
    options: [
      {
        id: 'opt-a',
        label: 'It inserts synthetic edges of weight 0 between the components to force connectivity.',
        explanation: 'Incorrect. Prim\'s algorithm never creates synthetic edges.',
      },
      {
        id: 'opt-b',
        label: 'The algorithm crashes with a null pointer exception.',
        explanation: 'Incorrect. The algorithm simply runs out of reachable edges and halts gracefully.',
      },
      {
        id: 'opt-c',
        label: 'It produces an MST for the component containing the starting vertex, leaving the other component unvisited.',
        explanation: 'Correct! Because Prim grows outward via reachable cut-edges, it cannot cross disconnected components. To span the whole graph, it must be restarted as a Minimum Spanning Forest.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'An MST only exists if the graph is connected. On disconnected graphs, running Prim produces a single spanning tree of the reachable component. Outer looping across unvisited vertices yields a Minimum Spanning Forest.',
  },

  // --- Prim: Hard ---
  {
    id: 'q-prim-hard-01',
    algoId: 'prim',
    tier: 'hard',
    concept: 'MST Uniqueness Condition',
    prompt: 'Under what condition is the Minimum Spanning Tree of a connected weighted graph guaranteed to be unique?',
    options: [
      {
        id: 'opt-a',
        label: 'When all edge weights in the graph are strictly distinct (no two edges share the same weight).',
        explanation: 'Correct! If all edge weights are distinct, every cut has a unique strictly minimum-weight crossing edge, guaranteeing a unique MST.',
      },
      {
        id: 'opt-b',
        label: 'Only when the graph is a complete graph K_V.',
        explanation: 'Incorrect. Completeness does not guarantee uniqueness if edge weights have ties.',
      },
      {
        id: 'opt-c',
        label: 'When the number of edges E equals V.',
        explanation: 'Incorrect. If E = V, the graph has a cycle, and duplicate weights on the cycle could create multiple MSTs.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Distinct edge weights eliminate arbitrary tie-breaking. By the Cut Property, the unique minimum edge across every cut must belong to the MST, ensuring only one valid MST can exist.',
  },
  {
    id: 'q-prim-hard-02',
    algoId: 'prim',
    tier: 'hard',
    concept: 'The Cycle Property in MSTs',
    prompt: 'What does the fundamental Cycle Property state regarding Minimum Spanning Trees?',
    options: [
      {
        id: 'opt-a',
        label: 'For any cycle C in a graph, the strictly heaviest edge in C cannot belong to any Minimum Spanning Tree.',
        explanation: 'Correct! If an MST contained the strictly heaviest edge e of cycle C, replacing e with any other edge in C would yield a spanning tree of strictly smaller weight.',
      },
      {
        id: 'opt-b',
        label: 'Every MST must contain at least one fundamental cycle to ensure structural rigidity.',
        explanation: 'Incorrect. A tree contains zero cycles by definition.',
      },
      {
        id: 'opt-c',
        label: 'The lightest edge in any cycle must always be excluded from the MST.',
        explanation: 'Incorrect. Lightest edges are preferred and typically included in an MST.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The Cycle Property is the dual of the Cut Property: in any simple cycle, the heaviest edge is redundant and can be substituted with a lighter edge from the cycle without disconnecting the tree.',
  },
  {
    id: 'q-prim-hard-03',
    algoId: 'prim',
    tier: 'hard',
    concept: 'Asymptotic Comparison on Dense Graphs',
    prompt: 'Why is Prim\'s algorithm with an adjacency matrix O(V^2) asymptotically faster than Kruskal\'s algorithm O(E log E) on dense graphs where E = Theta(V^2)?',
    options: [
      {
        id: 'opt-a',
        label: 'Because on dense graphs E = V^2, so Kruskal\'s sorting step takes O(V^2 log(V^2)) = O(V^2 log V), which is slower by a log V factor than Prim\'s O(V^2).',
        explanation: 'Correct! When E = Theta(V^2), Kruskal must sort V^2 edges, taking O(V^2 log V) time. Matrix Prim runs in O(V^2) with zero sorting overhead.',
      },
      {
        id: 'opt-b',
        label: 'Because Kruskal\'s algorithm cannot detect cycles when E > V.',
        explanation: 'Incorrect. Kruskal detects cycles via Union-Find regardless of edge density.',
      },
      {
        id: 'opt-c',
        label: 'Because sorting an array in C requires O(N!) comparisons.',
        explanation: 'Incorrect. Comparison sorting requires O(N log N), not O(N!).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'On dense graphs where E is close to V^2, sorting dominates Kruskal: O(V^2 log V). Flat-array Prim skips sorting entirely and processes the adjacency matrix in O(V^2), winning on dense topologies.',
  },

  // ==========================================
  // TOPIC 5: KRUSKAL'S MINIMUM SPANNING TREE
  // ==========================================

  // --- Kruskal: Easy ---
  {
    id: 'q-kruskal-easy-01',
    algoId: 'kruskal',
    tier: 'easy',
    concept: 'Global Edge Sorting Greedy Strategy',
    prompt: 'What is the initial step of Kruskal\'s algorithm before any edges are selected for the Minimum Spanning Tree?',
    options: [
      {
        id: 'opt-a',
        label: 'Choose an arbitrary root vertex and initialize a priority queue.',
        explanation: 'Incorrect. Growing from a root vertex is Prim\'s algorithm.',
      },
      {
        id: 'opt-b',
        label: 'Execute a full BFS traversal to determine vertex hop distances.',
        explanation: 'Incorrect. BFS is not used in Kruskal\'s algorithm.',
      },
      {
        id: 'opt-c',
        label: 'Sort all edges in the entire graph in non-decreasing order of their weights.',
        explanation: 'Correct! Kruskal begins by sorting all E edges globally from lowest to highest weight before greedily selecting safe edges.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Kruskal is an edge-centric greedy algorithm. Sorting all edges globally in O(E log E) guarantees that edges are inspected in strictly non-decreasing order of weight.',
  },
  {
    id: 'q-kruskal-easy-02',
    algoId: 'kruskal',
    tier: 'easy',
    concept: 'Forest Merging Invariant',
    prompt: 'How does Kruskal\'s algorithm construct the Minimum Spanning Tree from an architectural perspective?',
    options: [
      {
        id: 'opt-a',
        label: 'It starts with a forest of V isolated single-node trees and progressively merges them by adding safe minimum-weight edges.',
        explanation: 'Correct! Kruskal maintains a spanning forest where each vertex begins in its own component. Safe edges bridge disjoint trees until a single MST remains.',
      },
      {
        id: 'opt-b',
        label: 'It grows a single connected tree outward from node 0 one vertex at a time.',
        explanation: 'Incorrect. Growing a single tree vertex-by-vertex describes Prim\'s algorithm.',
      },
      {
        id: 'opt-c',
        label: 'It begins with the complete graph and deletes the lightest edges.',
        explanation: 'Incorrect. That would destroy connectivity rather than minimize tree weight.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Unlike Prim (which always maintains a single growing tree), Kruskal maintains a spanning forest of multiple trees, merging them into fewer, larger trees until exactly one tree of V - 1 edges remains.',
  },
  {
    id: 'q-kruskal-easy-03',
    algoId: 'kruskal',
    tier: 'easy',
    concept: 'Cycle Prevention via Component Check',
    prompt: 'During Kruskal\'s edge selection loop, under what condition is a candidate edge (u, v) accepted into the MST?',
    options: [
      {
        id: 'opt-a',
        label: 'If u and v currently belong to different connected components (their component roots are distinct: `find(u) != find(v)`).',
        explanation: 'Correct! If the endpoints belong to different components, adding the edge cannot form a cycle, so it safely merges the two components.',
      },
      {
        id: 'opt-b',
        label: 'If both u and v already belong to the same component (`find(u) == find(v)`).',
        explanation: 'Incorrect. If both endpoints are already in the same component, adding the edge forms a cycle and must be discarded.',
      },
      {
        id: 'opt-c',
        label: 'Only if the edge weight is less than the average edge weight of the graph.',
        explanation: 'Incorrect. Edge acceptance is determined strictly by non-cyclicity and non-decreasing weight order, not average thresholds.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'If `find(u) == find(v)`, a path already connects u and v in the forest; adding (u, v) would introduce a cycle. Hence, the edge is discarded if roots match and accepted if roots differ.',
  },

  // --- Kruskal: Medium ---
  {
    id: 'q-kruskal-med-01',
    algoId: 'kruskal',
    tier: 'medium',
    concept: 'Disjoint Set Union (DSU) Role',
    prompt: 'What critical role does the Disjoint Set Union (Union-Find) data structure play in Kruskal\'s algorithm?',
    options: [
      {
        id: 'opt-a',
        label: 'It sorts the edges in O(E) time using a non-comparative bucket sort.',
        explanation: 'Incorrect. Edge sorting is done separately (e.g., via C standard library `qsort`).',
      },
      {
        id: 'opt-b',
        label: 'It enables near-constant time O(alpha(V)) cycle detection and component merging for each examined edge.',
        explanation: 'Correct! DSU tracks connected components with `find` and merges them with `union`, preventing cycle formation in near-constant time.',
      },
      {
        id: 'opt-c',
        label: 'It stores the adjacency matrix to ensure O(1) edge lookup.',
        explanation: 'Incorrect. DSU stores parent and rank arrays of vertices, not edge adjacency matrices.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Without DSU, checking whether adding edge (u, v) forms a cycle would require running DFS in O(V) time per edge (O(E * V) total). DSU slashes this check to O(alpha(V)) amortized time.',
  },
  {
    id: 'q-kruskal-med-02',
    algoId: 'kruskal',
    tier: 'medium',
    concept: 'Time Complexity Bottleneck',
    prompt: 'What operation constitutes the primary asymptotic time bottleneck in standard Kruskal\'s algorithm on a general graph?',
    options: [
      {
        id: 'opt-a',
        label: 'Initializing the parent array in O(V^2) time.',
        explanation: 'Incorrect. Initializing the parent array takes O(V) time.',
      },
      {
        id: 'opt-b',
        label: 'Performing the V - 1 union operations, which takes O(V^3) time.',
        explanation: 'Incorrect. With path compression, all union operations together take O(V * alpha(V)).',
      },
      {
        id: 'opt-c',
        label: 'Sorting the E edges in O(E log E) time.',
        explanation: 'Correct! Sorting E edges takes O(E log E). The subsequent DSU operations take O(E * alpha(V)), making edge sorting the dominant asymptotic step.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Because alpha(V) <= 4 for all practical values, DSU operations run in near-linear time O(E). The O(E log E) comparison sort is the true asymptotic bottleneck.',
  },
  {
    id: 'q-kruskal-med-03',
    algoId: 'kruskal',
    tier: 'medium',
    concept: 'Kruskal vs Prim on Sparse Graphs',
    prompt: 'Why is Kruskal\'s algorithm especially advantageous over adjacency-matrix Prim on sparse graphs where E = O(V)?',
    options: [
      {
        id: 'opt-a',
        label: 'Because sorting E = O(V) edges takes O(V log V) time and DSU takes O(V alpha(V)), making Kruskal O(V log V), far faster than matrix Prim\'s O(V^2).',
        explanation: 'Correct! On sparse graphs where E is linear in V, Kruskal takes O(V log V), dramatically outperforming matrix Prim which must inspect all V^2 matrix entries.',
      },
      {
        id: 'opt-b',
        label: 'Because Prim\'s algorithm cannot run on graphs where E < V^2.',
        explanation: 'Incorrect. Prim runs on any connected graph, but matrix Prim is bound to O(V^2) regardless of edge sparsity.',
      },
      {
        id: 'opt-c',
        label: 'Because Kruskal does not require edge weights to be numerical values.',
        explanation: 'Incorrect. Both algorithms require comparable numeric edge weights.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'When graphs are sparse (e.g. road maps or planar graphs with E <= 3V - 6), Kruskal runs in O(V log V). Matrix-based Prim spends O(V^2) time scanning non-existent edges in empty matrix cells.',
  },

  // --- Kruskal: Hard ---
  {
    id: 'q-kruskal-hard-01',
    algoId: 'kruskal',
    tier: 'hard',
    concept: 'Path Compression & Union by Rank Optimization',
    prompt: 'In the Disjoint Set Union (DSU) structure used by Kruskal, how do Path Compression and Union by Rank combine to achieve amortized O(alpha(V)) per operation?',
    options: [
      {
        id: 'opt-a',
        label: 'Path compression flattens the tree during `find` so nodes point directly to the root, while Union by Rank attaches the shallower tree to the deeper root, keeping tree depth at most O(alpha(V)).',
        explanation: 'Correct! Path compression flattens paths on every lookup, and union by rank prevents deep unbalanced trees. Combined, they achieve the inverse Ackermann bound alpha(V) <= 4.',
      },
      {
        id: 'opt-b',
        label: 'They convert the tree into a circular linked list that can be traversed in O(1) time.',
        explanation: 'Incorrect. Circular lists do not provide logarithmic or near-constant disjoint set partition queries.',
      },
      {
        id: 'opt-c',
        label: 'Path compression deletes all non-root nodes from memory after each find.',
        explanation: 'Incorrect. Nodes are never freed or deleted; their parent pointers are updated: `parent[i] = find(parent[i])`.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In C: `int find(int p[], int i) { if (p[i] == i) return i; return p[i] = find(p, p[i]); }`. This two-line path compression combined with union by rank guarantees near-constant O(alpha(V)) amortized time.',
  },
  {
    id: 'q-kruskal-hard-02',
    algoId: 'kruskal',
    tier: 'hard',
    concept: 'Duplicate Edge Weights & Multiple MSTs',
    prompt: 'If a connected graph contains multiple edges with identical weights, how does Kruskal\'s algorithm behave?',
    options: [
      {
        id: 'opt-a',
        label: 'Different tie-breaking orders during edge sorting may yield different valid MST edge sets, but all produced MSTs will have the exact same total minimum weight.',
        explanation: 'Correct! Tie-breaks among equal-weight edges may lead to different tree topologies, but every valid spanning tree produced is guaranteed to achieve the exact same minimum total weight.',
      },
      {
        id: 'opt-b',
        label: 'The algorithm enters an infinite loop because DSU cannot resolve duplicate weights.',
        explanation: 'Incorrect. DSU tracks vertex connectivity, completely unaffected by edge weight values.',
      },
      {
        id: 'opt-c',
        label: 'It fails to find a spanning tree and outputs a disconnected forest.',
        explanation: 'Incorrect. As long as the graph is connected, Kruskal always selects exactly V - 1 edges to form an MST.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'When weights are not strictly distinct, an MST is not necessarily unique. However, Kruskal is mathematically guaranteed to output an optimal MST whose sum of edge weights equals the true minimum.',
  },
  {
    id: 'q-kruskal-hard-03',
    algoId: 'kruskal',
    tier: 'hard',
    concept: 'Strictly Second-Best Minimum Spanning Tree',
    prompt: 'How can Kruskal\'s MST algorithm and tree path queries be extended to compute the strictly Second-Best Minimum Spanning Tree in O(E log V) time?',
    options: [
      {
        id: 'opt-a',
        label: 'Compute MST T via Kruskal; then for each non-tree edge e = (u, v), query T for the heaviest tree path edge strictly lighter than e (to avoid equal-weight alternative MSTs), and choose the swap yielding the minimum positive weight increase.',
        explanation: 'Correct! Adding non-tree edge e creates a cycle in T. To guarantee a strictly second-best tree (W(T\') > W(T)), e must swap with the heaviest edge on that cycle whose weight is strictly less than w(e), preventing duplicate equal-weight MSTs.',
      },
      {
        id: 'opt-b',
        label: 'Simply delete the lightest edge in the graph and re-run Kruskal from scratch.',
        explanation: 'Incorrect. Deleting the lightest edge might disconnect the graph or fail to find the true second-best tree.',
      },
      {
        id: 'opt-c',
        label: 'Sort edges in descending order and run Kruskal in reverse.',
        explanation: 'Incorrect. Sorting in descending order produces the Maximum Spanning Tree, not the second-best MST.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A strictly second-best MST has total weight strictly greater than W(T). For each of the E - V + 1 non-tree edges e = (u, v), querying the heaviest edge on the path in T via binary lifting / LCA might find an edge with weight equal to w(e), which would only yield an alternative MST of identical weight. The query must identify the maximum edge strictly lighter than w(e) to find the minimum positive weight delta w(e) - w(e\') > 0.',
  },
];
