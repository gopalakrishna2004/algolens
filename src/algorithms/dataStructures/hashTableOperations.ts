import type { HashTableStep, HashBucketEntry, AlgorithmMetadata } from '../types';

export const hashTableMetadata: AlgorithmMetadata = {
  id: 'hash-table-ds',
  name: 'Hash Table (Chaining)',
  category: 'data-structures',
  visualizationType: 'hash-table',
  difficulty: 'Intermediate',
  prerequisites: ['Arrays', 'Linked Lists', 'Hash Functions', 'Modulo Arithmetic'],
  timeComplexity: {
    best: 'O(1) [Lookup/Insert/Delete]',
    average: 'O(1)',
    worst: 'O(n) [High Collision Cluster]',
  },
  spaceComplexity: 'O(n)',
  description:
    'A key-value store that maps keys to array buckets via a hash function: index = hash(key) % capacity. Collisions are resolved using Separate Chaining (linked lists in each bucket).',
  keyIdea:
    'Convert arbitrary string/integer keys into a bucket array index in O(1) time using a hash function. Fast constant-time lookups on average.',
  whenToUse: [
    'Fast key-value associations (dictionaries, associative maps, database indexes).',
    'Checking duplicates or frequency counts in arrays in O(n) total time.',
    'Caching and memoization in dynamic programming.',
  ],
  limitations: [
    'Unordered keys (no sorted iteration order).',
    'Degrades to O(n) if hash collisions cluster into a single bucket chain.',
    'Requires rehashing and resizing when load factor exceeds threshold.',
  ],
  sourceCode: {
    c: `// Hash Table with Separate Chaining in C
#define CAPACITY 5

typedef struct Node {
    char key[32];
    int val;
    struct Node* next;
} Node;

unsigned int hash(const char* key) {
    unsigned int h = 0;
    while (*key) h = (h * 31 + *key++) % CAPACITY;
    return h;
}

void put(Node* table[], const char* key, int val) {
    unsigned int idx = hash(key);
    Node* curr = table[idx];
    while (curr) {
        if (strcmp(curr->key, key) == 0) { curr->val = val; return; }
        curr = curr->next;
    }
    Node* newNode = (Node*)malloc(sizeof(Node));
    strcpy(newNode->key, key); newNode->val = val;
    newNode->next = table[idx]; table[idx] = newNode;
}`,
    typescript: `// Hash Table in TypeScript
class HashTable {
  private buckets: [string, number][][] = Array.from({ length: 5 }, () => []);
  hash(key: string) {
    return key.split('').reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) % 5, 0);
  }
  put(k: string, v: number) { this.buckets[this.hash(k)].push([k, v]); }
}`,
  },
};

export function simulateHashTable(): HashTableStep[] {
  const capacity = 5;
  const buckets: HashBucketEntry[][] = Array.from({ length: capacity }, () => []);
  const steps: HashTableStep[] = [];

  function simpleHash(key: string): number {
    let h = 0;
    for (let i = 0; i < key.length; i++) {
      h = (h * 31 + key.charCodeAt(i)) % capacity;
    }
    return h;
  }

  steps.push({
    kind: 'hash-table',
    capacity,
    buckets: buckets.map((b) => [...b]),
    action: 'idle',
    description: `Initialized Hash Table with ${capacity} buckets (0..${capacity - 1}) using Separate Chaining.`,
    stats: { capacity, totalKeys: 0 },
    codeLine: 10,
  });

  // Action 1: Insert "cat": 42
  const k1 = 'cat';
  const h1 = simpleHash(k1);
  steps.push({
    kind: 'hash-table',
    capacity,
    buckets: buckets.map((b) => [...b]),
    activeKey: k1,
    activeHash: h1,
    action: 'put',
    description: `PUT("${k1}", 42): Computed hash("${k1}") = ${h1}. Target bucket is [${h1}].`,
    stats: { capacity, totalKeys: 0, targetBucket: h1 },
    codeLine: 18,
  });

  buckets[h1].push({ key: k1, value: 42 });
  steps.push({
    kind: 'hash-table',
    capacity,
    buckets: buckets.map((b) => [...b]),
    activeKey: k1,
    activeHash: h1,
    action: 'put',
    description: `Inserted ("${k1}", 42) into Bucket [${h1}].`,
    stats: { capacity, totalKeys: 1 },
    codeLine: 25,
  });

  // Action 2: Insert "dog": 18
  const k2 = 'dog';
  const h2 = simpleHash(k2);
  steps.push({
    kind: 'hash-table',
    capacity,
    buckets: buckets.map((b) => [...b]),
    activeKey: k2,
    activeHash: h2,
    action: 'put',
    description: `PUT("${k2}", 18): Computed hash("${k2}") = ${h2}. Target bucket is [${h2}].`,
    stats: { capacity, totalKeys: 1, targetBucket: h2 },
    codeLine: 18,
  });

  buckets[h2].push({ key: k2, value: 18 });
  steps.push({
    kind: 'hash-table',
    capacity,
    buckets: buckets.map((b) => [...b]),
    activeKey: k2,
    activeHash: h2,
    action: 'put',
    description: `Inserted ("${k2}", 18) into Bucket [${h2}].`,
    stats: { capacity, totalKeys: 2 },
    codeLine: 25,
  });

  // Action 3: Collision insertion "act": 99
  const k3 = 'act';
  const h3 = simpleHash(k3);
  steps.push({
    kind: 'hash-table',
    capacity,
    buckets: buckets.map((b) => [...b]),
    activeKey: k3,
    activeHash: h3,
    action: 'put',
    description: `PUT("${k3}", 99): Computed hash("${k3}") = ${h3}. ${h3 === h1 ? 'COLLISION detected in Bucket [' + h3 + ']!' : 'Target bucket is [' + h3 + '].'}`,
    stats: { capacity, totalKeys: 2, targetBucket: h3 },
    codeLine: 18,
  });

  buckets[h3].push({ key: k3, value: 99 });
  steps.push({
    kind: 'hash-table',
    capacity,
    buckets: buckets.map((b) => [...b]),
    activeKey: k3,
    activeHash: h3,
    action: 'put',
    description: `Handled collision via Separate Chaining: appended ("${k3}", 99) to bucket [${h3}] list!`,
    stats: { capacity, totalKeys: 3 },
    codeLine: 26,
  });

  // Action 4: GET("cat")
  steps.push({
    kind: 'hash-table',
    capacity,
    buckets: buckets.map((b) => [...b]),
    activeKey: 'cat',
    activeHash: h1,
    action: 'get',
    description: `GET("cat"): Evaluated hash("cat") = ${h1}. Scanned Bucket [${h1}] chain -> Found value 42 in O(1) time!`,
    stats: { capacity, totalKeys: 3, foundVal: 42 },
    codeLine: 21,
  });

  return steps;
}
