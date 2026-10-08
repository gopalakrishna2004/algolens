import type { StackQueueStep, AlgorithmMetadata } from '../types';

export const queueMetadata: AlgorithmMetadata = {
  id: 'queue-ds',
  name: 'Queue (FIFO)',
  category: 'data-structures',
  visualizationType: 'stack-queue',
  difficulty: 'Beginner',
  prerequisites: ['Arrays', 'Front & Rear Pointers', 'FIFO Principle'],
  timeComplexity: {
    best: 'O(1) [Enqueue/Dequeue/Front]',
    average: 'O(1)',
    worst: 'O(1)',
  },
  spaceComplexity: 'O(n)',
  description:
    'A linear collection following the First-In, First-Out (FIFO) principle. Elements are appended at the rear (enqueue) and removed from the front (dequeue).',
  keyIdea:
    'First In, First Out. The earliest added item is served first, exactly like waiting in line at a movie ticket counter.',
  whenToUse: [
    'Breadth-First Search (BFS) in trees and graphs.',
    'CPU task scheduling and printer print queues.',
    'Asynchronous message brokers and event loops.',
  ],
  limitations: [
    'No random access to elements in the middle of the queue.',
    'Linear array implementation requires circular wrapping (Circular Queue) to prevent wasted memory.',
  ],
  sourceCode: {
    c: `// Queue Implementation in C (Circular Array)
#define MAX 100
typedef struct {
    int items[MAX];
    int front, rear, size;
} Queue;

void enqueue(Queue *q, int val) {
    if (q->size == MAX) return; // Full
    q->rear = (q->rear + 1) % MAX;
    q->items[q->rear] = val;
    q->size++;
}

int dequeue(Queue *q) {
    if (q->size == 0) return -1; // Empty
    int val = q->items[q->front];
    q->front = (q->front + 1) % MAX;
    q->size--;
    return val;
}`,
    typescript: `// Queue in TypeScript
class Queue {
  private items: number[] = [];
  enqueue(val: number) { this.items.push(val); }
  dequeue() { return this.items.shift(); }
  front() { return this.items[0]; }
}`,
  },
};

export interface QueueSimulationInput {
  initialItems?: number[];
}

export function simulateQueue(input?: QueueSimulationInput): StackQueueStep[] {
  const items = input?.initialItems ? [...input.initialItems] : [15, 30, 45];
  const steps: StackQueueStep[] = [];

  steps.push({
    kind: 'stack-queue',
    structureType: 'queue',
    items: [...items],
    action: 'idle',
    description: `Initialized Queue with ${items.length} elements. Front is ${items[0]}, Rear is ${items[items.length - 1]}.`,
    stats: { size: items.length, front: items[0], rear: items[items.length - 1] },
    codeLine: 8,
  });

  // Action 1: Enqueue 60
  items.push(60);
  steps.push({
    kind: 'stack-queue',
    structureType: 'queue',
    items: [...items],
    action: 'enqueue',
    activeItem: 60,
    highlightedIndex: items.length - 1,
    description: 'ENQUEUE(60): Added 60 to the rear of the queue.',
    stats: { size: items.length, front: items[0], rear: 60 },
    codeLine: 11,
  });

  // Action 2: Front inspection
  steps.push({
    kind: 'stack-queue',
    structureType: 'queue',
    items: [...items],
    action: 'front',
    activeItem: items[0],
    highlightedIndex: 0,
    description: `FRONT(): Inspected element at the head of the line (${items[0]}).`,
    stats: { size: items.length, front: items[0], rear: items[items.length - 1] },
    codeLine: 17,
  });

  // Action 3: Dequeue
  const dequeued1 = items.shift();
  steps.push({
    kind: 'stack-queue',
    structureType: 'queue',
    items: [...items],
    action: 'dequeue',
    activeItem: dequeued1,
    description: `DEQUEUE(): Removed oldest element (${dequeued1}) from the front. Next in line: ${items[0]}.`,
    stats: { size: items.length, front: items[0] ?? 'Empty', rear: items[items.length - 1] ?? 'Empty' },
    codeLine: 17,
  });

  // Action 4: Enqueue 75
  items.push(75);
  steps.push({
    kind: 'stack-queue',
    structureType: 'queue',
    items: [...items],
    action: 'enqueue',
    activeItem: 75,
    highlightedIndex: items.length - 1,
    description: 'ENQUEUE(75): Added 75 to the rear of the queue.',
    stats: { size: items.length, front: items[0], rear: 75 },
    codeLine: 11,
  });

  // Action 5: Dequeue
  const dequeued2 = items.shift();
  steps.push({
    kind: 'stack-queue',
    structureType: 'queue',
    items: [...items],
    action: 'dequeue',
    activeItem: dequeued2,
    description: `DEQUEUE(): Removed (${dequeued2}) from the front. Front is now ${items[0]}.`,
    stats: { size: items.length, front: items[0] ?? 'Empty', rear: items[items.length - 1] ?? 'Empty' },
    codeLine: 17,
  });

  return steps;
}
