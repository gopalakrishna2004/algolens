import type { StackQueueStep, AlgorithmMetadata } from '../types';

export const stackMetadata: AlgorithmMetadata = {
  id: 'stack-ds',
  name: 'Stack (LIFO)',
  category: 'data-structures',
  visualizationType: 'stack-queue',
  difficulty: 'Beginner',
  prerequisites: ['Arrays', 'Pointers', 'LIFO Principle'],
  timeComplexity: {
    best: 'O(1) [Push/Pop/Peek]',
    average: 'O(1)',
    worst: 'O(1)',
  },
  spaceComplexity: 'O(n)',
  description:
    'A linear data structure following the Last-In, First-Out (LIFO) principle. Elements can only be added (pushed) or removed (popped) from the top.',
  keyIdea:
    'Last In, First Out. The most recently pushed item is always the first one popped, like a physical stack of plates or the function call stack.',
  whenToUse: [
    'Function call recursion management (Call Stack).',
    'Expression parsing, syntax bracket matching (e.g. valid parentheses).',
    'Undo/Redo operations in editors and back button history in web browsers.',
  ],
  limitations: [
    'No random access to elements in the middle or bottom without popping all elements above them.',
    'Risk of Stack Overflow if capacity is fixed and exceeded.',
  ],
  sourceCode: {
    c: `// Stack Implementation in C
#define MAX 100
typedef struct {
    int items[MAX];
    int top;
} Stack;

void push(Stack *s, int val) {
    if (s->top == MAX - 1) return; // Overflow
    s->items[++(s->top)] = val;
}

int pop(Stack *s) {
    if (s->top == -1) return -1; // Underflow
    return s->items[(s->top)--];
}

int peek(Stack *s) {
    if (s->top == -1) return -1;
    return s->items[s->top];
}`,
    typescript: `// Stack in TypeScript
class Stack {
  private items: number[] = [];
  push(val: number) { this.items.push(val); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
}`,
  },
};

export interface StackSimulationInput {
  initialItems?: number[];
  actions?: ('push' | 'pop' | 'peek')[];
  pushValues?: number[];
}

export function simulateStack(input?: StackSimulationInput): StackQueueStep[] {
  const items = input?.initialItems ? [...input.initialItems] : [10, 25, 40];
  const steps: StackQueueStep[] = [];

  steps.push({
    kind: 'stack-queue',
    structureType: 'stack',
    items: [...items],
    action: 'idle',
    description: `Initialized Stack with ${items.length} items. Top element is ${items[items.length - 1] ?? 'None'}.`,
    stats: { size: items.length, top: items[items.length - 1] ?? 'Empty' },
    codeLine: 8,
  });

  // Action 1: Push 55
  items.push(55);
  steps.push({
    kind: 'stack-queue',
    structureType: 'stack',
    items: [...items],
    action: 'push',
    activeItem: 55,
    highlightedIndex: items.length - 1,
    description: 'PUSH(55): Placed 55 onto the top of the stack. Incremented top pointer.',
    stats: { size: items.length, top: 55 },
    codeLine: 10,
  });

  // Action 2: Push 70
  items.push(70);
  steps.push({
    kind: 'stack-queue',
    structureType: 'stack',
    items: [...items],
    action: 'push',
    activeItem: 70,
    highlightedIndex: items.length - 1,
    description: 'PUSH(70): Placed 70 onto the top of the stack. Incremented top pointer.',
    stats: { size: items.length, top: 70 },
    codeLine: 10,
  });

  // Action 3: Peek
  steps.push({
    kind: 'stack-queue',
    structureType: 'stack',
    items: [...items],
    action: 'peek',
    activeItem: items[items.length - 1],
    highlightedIndex: items.length - 1,
    description: `PEEK(): Inspected top element (${items[items.length - 1]}) without removing it.`,
    stats: { size: items.length, top: items[items.length - 1] },
    codeLine: 20,
  });

  // Action 4: Pop
  const popped1 = items.pop();
  steps.push({
    kind: 'stack-queue',
    structureType: 'stack',
    items: [...items],
    action: 'pop',
    activeItem: popped1,
    description: `POP(): Removed top element (${popped1}). Decremented top pointer.`,
    stats: { size: items.length, top: items[items.length - 1] ?? 'Empty' },
    codeLine: 15,
  });

  // Action 5: Pop
  const popped2 = items.pop();
  steps.push({
    kind: 'stack-queue',
    structureType: 'stack',
    items: [...items],
    action: 'pop',
    activeItem: popped2,
    description: `POP(): Removed top element (${popped2}). New top is ${items[items.length - 1] ?? 'Empty'}.`,
    stats: { size: items.length, top: items[items.length - 1] ?? 'Empty' },
    codeLine: 15,
  });

  return steps;
}
