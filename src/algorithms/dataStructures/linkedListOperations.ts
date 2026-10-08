import type { LinkedListStep, LinkedListNode, AlgorithmMetadata } from '../types';

export const linkedListMetadata: AlgorithmMetadata = {
  id: 'linked-list-ds',
  name: 'Singly Linked List',
  category: 'data-structures',
  visualizationType: 'linked-list',
  difficulty: 'Beginner',
  prerequisites: ['Pointers', 'Dynamic Memory (malloc/free)', 'Node References'],
  timeComplexity: {
    best: 'O(1) [Insert/Delete at Head]',
    average: 'O(n) [Search / Insert at Index]',
    worst: 'O(n) [Traverse / Delete at Tail]',
  },
  spaceComplexity: 'O(n)',
  description:
    'A linear collection of nodes where each node contains data and a pointer pointing to the next node in sequence. Unlike arrays, nodes are stored anywhere in memory.',
  keyIdea:
    'Non-contiguous nodes connected by pointer links. Inserting at head takes O(1) time without shifting any other nodes, but finding elements requires traversing pointer by pointer.',
  whenToUse: [
    'Frequent insertions and deletions at the head without memory shift overhead.',
    'When the total size is unknown and dynamic growth is required without reallocating whole arrays.',
    'Implementing Stacks, Queues, and Graph adjacency lists.',
  ],
  limitations: [
    'No O(1) random indexing access (must traverse from head, O(n)).',
    'Extra memory overhead for pointer storage in every node.',
    'Poor cache locality compared to contiguous arrays.',
  ],
  sourceCode: {
    c: `// Singly Linked List in C
typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* insertHead(Node* head, int val) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = val;
    newNode->next = head;
    return newNode;
}

Node* deleteVal(Node* head, int val) {
    if (!head) return NULL;
    if (head->data == val) {
        Node* temp = head->next;
        free(head);
        return temp;
    }
    Node* curr = head;
    while (curr->next && curr->next->data != val) curr = curr->next;
    if (curr->next) {
        Node* temp = curr->next;
        curr->next = curr->next->next;
        free(temp);
    }
    return head;
}`,
    typescript: `// Singly Linked List in TypeScript
class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val: number) { this.val = val; }
}

function insertHead(head: ListNode | null, val: number): ListNode {
  const node = new ListNode(val);
  node.next = head;
  return node;
}`,
  },
};

export interface LinkedListSimulationInput {
  initialValues?: number[];
}

export function simulateLinkedList(input?: LinkedListSimulationInput): LinkedListStep[] {
  const values = input?.initialValues ? [...input.initialValues] : [10, 20, 30];
  const steps: LinkedListStep[] = [];

  let nodes: LinkedListNode[] = values.map((v, i) => ({ id: `node-${i}`, value: v }));

  steps.push({
    kind: 'linked-list',
    nodes: [...nodes],
    action: 'idle',
    pointers: { head: nodes[0]?.id },
    description: `Initialized Linked List with ${nodes.length} nodes: ${nodes.map((n) => n.value).join(' -> ')} -> NULL.`,
    stats: { length: nodes.length, head: nodes[0]?.value ?? 'NULL' },
    codeLine: 8,
  });

  // Action 1: Insert 5 at Head
  const newHeadNode: LinkedListNode = { id: `node-${Date.now()}-1`, value: 5 };
  nodes = [newHeadNode, ...nodes];
  steps.push({
    kind: 'linked-list',
    nodes: [...nodes],
    activeNodeId: newHeadNode.id,
    pointers: { head: newHeadNode.id },
    action: 'insert-head',
    description: `INSERT_HEAD(5): Allocated new node(5), pointed next -> old head (${nodes[1]?.value}). O(1) operation!`,
    stats: { length: nodes.length, head: 5 },
    codeLine: 11,
  });

  // Action 2: Traverse / Search for 20
  for (let i = 0; i < nodes.length; i++) {
    const isTarget = nodes[i].value === 20;
    steps.push({
      kind: 'linked-list',
      nodes: [...nodes],
      activeNodeId: nodes[i].id,
      pointers: { head: nodes[0].id, current: nodes[i].id },
      action: 'search',
      description: `SEARCH(20): Inspecting current node (value: ${nodes[i].value}). ${isTarget ? 'Match found!' : 'Continuing to next pointer.'}`,
      stats: { length: nodes.length, current: nodes[i].value },
      codeLine: 24,
    });
    if (isTarget) break;
  }

  // Action 3: Insert 40 at Tail
  const newTailNode: LinkedListNode = { id: `node-${Date.now()}-2`, value: 40 };
  nodes = [...nodes, newTailNode];
  steps.push({
    kind: 'linked-list',
    nodes: [...nodes],
    activeNodeId: newTailNode.id,
    pointers: { head: nodes[0].id, current: newTailNode.id },
    action: 'insert-tail',
    description: `INSERT_TAIL(40): Traversed to end, set last node next pointer -> new node(40) -> NULL.`,
    stats: { length: nodes.length, tail: 40 },
    codeLine: 14,
  });

  // Action 4: Delete node with value 20
  const deletedVal = 20;
  const deleteIdx = nodes.findIndex((n) => n.value === deletedVal);
  if (deleteIdx !== -1) {
    const prevNode = nodes[deleteIdx - 1];
    const targetNode = nodes[deleteIdx];
    const nextNode = nodes[deleteIdx + 1];

    steps.push({
      kind: 'linked-list',
      nodes: [...nodes],
      activeNodeId: targetNode.id,
      pointers: { head: nodes[0].id, prev: prevNode?.id, current: targetNode.id },
      action: 'delete',
      description: `DELETE(20): Rewiring pointer: prev node (${prevNode?.value}) now points directly to (${nextNode?.value ?? 'NULL'}), bypassing (${targetNode.value}).`,
      stats: { length: nodes.length, deleting: 20 },
      codeLine: 26,
    });

    nodes = nodes.filter((n) => n.value !== deletedVal);

    steps.push({
      kind: 'linked-list',
      nodes: [...nodes],
      action: 'delete',
      pointers: { head: nodes[0].id },
      description: `DELETE(20) complete: freed memory for node(20). New list: ${nodes.map((n) => n.value).join(' -> ')} -> NULL.`,
      stats: { length: nodes.length, head: nodes[0]?.value ?? 'NULL' },
      codeLine: 28,
    });
  }

  return steps;
}
